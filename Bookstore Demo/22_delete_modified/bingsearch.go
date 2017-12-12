package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"
)

var (
	httpc = &http.Client{
		Timeout: (30 * time.Second),
		Transport: &http.Transport{
			Proxy:                 http.ProxyFromEnvironment,
			TLSHandshakeTimeout:   (30 * time.Second),
			ResponseHeaderTimeout: (30 * time.Second),
		},
	}

	Loc = []string{
		"es-AR",
		"en-AU",
		"de-AT",
		"nl-BE",
		"fr-BE",
		"pt-BR",
		"en-CA",
		"fr-CA",
		"es-CL",
		"da-DK",
		"fi-FI",
		"fr-FR",
		"de-DE",
		"zh-HK",
		"en-IN",
		"en-ID",
		"en-IE",
		"it-IT",
		"ja-JP",
		"ko-KR",
		"en-MY",
		"es-MX",
		"nl-NL",
		"en-NZ",
		"no-NO",
		"zh-CN",
		"pl-PL",
		"pt-PT",
		"en-PH",
		"ru-RU",
		//"ar-SA",
		"en-ZA",
		"es-ES",
		"sv-SE",
		"fr-CH",
		"de-CH",
		"zh-TW",
		"tr-TR",
		"en-GB",
		"en-US",
		"es-US",
	}

	LocStr = map[string]string{
		"AR": "Argentina",
		"AU": "Australia",
		"AT": "Austria",
		"BE": "Belgium",
		"BR": "Brazil",
		"CA": "Canada",
		"CL": "Chile",
		"DK": "Denmark",
		"FI": "Finland",
		"FR": "France",
		"DE": "Germany",
		"HK": "Hong Kong",
		"IN": "India",
		"ID": "Indonesia",
		"IE": "Ireland",
		"IT": "Italy",
		"JP": "Japan",
		"KR": "South Korea",
		"MY": "Malaysia",
		"MX": "Mexico",
		"NL": "Netherlands",
		"NZ": "New Zealand",
		"NO": "Norway",
		"CN": "China",
		"PL": "Poland",
		"PT": "Portugal",
		"PH": "Philippines",
		"RU": "Russia",
		//"SA": "Saudi Arabia",
		"ZA": "South Africa",
		"ES": "Spain",
		"SE": "Sweden",
		"CH": "Switzerland",
		"TW": "Taiwan",
		"TR": "Turkey",
		"GB": "United Kingdom",
		"US": "United States",
	}
)

const (
	subscriptionKey = "1971507474b34f4cacc0b0026b1a19ad"
	host            = "api.cognitive.microsoft.com"
	path            = "/bing/v7.0/search"
)

type BingResp struct {
	WebPages WebPagesData `json:"webPages"`
}

type WebPagesData struct {
	NoOfMatch uint64 `json:"totalEstimatedMatches"`
}

type SearchWeight struct {
	Country string
	Value   uint64
}

type SearchWeightArr []SearchWeight

// Len is part of sort.Interface.
func (swa SearchWeightArr) Len() int {
	return len(swa)
}

// Swap is part of sort.Interface.
func (swa SearchWeightArr) Swap(i, j int) {
	swa[i], swa[j] = swa[j], swa[i]
}

// Less is part of sort.Interface. We use count as the value to sort by
func (swa SearchWeightArr) Less(i, j int) bool {
	return swa[i].Value < swa[j].Value
}

func readFromResp(rsp *http.Response) (uint64, error) {

	defer rsp.Body.Close()
	respData := BingResp{}

	if rsp.StatusCode == http.StatusUnauthorized {
		io.Copy(ioutil.Discard, rsp.Body)
	} else {

		err := json.NewDecoder(rsp.Body).Decode(&respData)
		if err != nil {
			fmt.Println(err)
			return 0, err
		}
	}

	return respData.WebPages.NoOfMatch, nil
}

func send(req *http.Request) (uint64, error) {

	var value uint64
	rsp, err := httpc.Do(req)
	if err != nil {
		fmt.Println("Failed to send request to %v: %v", req.URL, err)

		if rsp != nil {
			io.Copy(ioutil.Discard, rsp.Body)
			rsp.Body.Close()
		}

		return value, err
	} else {
		value, err = readFromResp(rsp)
		if err != nil {
			return value, err
		}
	}
	return value, nil
}

func bingSearch(bookName, author, country string) (uint64, error) {

	var value uint64

	u := &url.URL{}
	u.Scheme = "https"
	u.Host = host
	u.Path = path
	q := u.Query()

	qstr := fmt.Sprintf("book %s author %s", bookName, author)
	q.Set("q", qstr)
	q.Set("mkt", country)
	u.RawQuery = q.Encode()

	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		fmt.Println(err)
		return value, err
	}

	req.Header.Set("Ocp-Apim-Subscription-Key", subscriptionKey)

	value, err = send(req)
	if err != nil {
		fmt.Println(err)
		return value, err
	}

	return value, nil
}

func setBingSearchData(book, author string) ([]SearchWeight, error) {

	detail := make(map[string]uint64)
	allCountryDetail := []SearchWeight{}

	for _, v := range Loc {
		value, err := bingSearch(book, author, v)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		country := strings.Split(v, "-")[1]
		detail[country] += value
	}

	for key, value := range detail {
		obj := SearchWeight{}
		obj.Country = LocStr[key]
		obj.Value = value

		allCountryDetail = append(allCountryDetail, obj)
	}

	sort.Sort(sort.Reverse(SearchWeightArr(allCountryDetail)))

	return allCountryDetail[:11], nil
	
}
