package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"html/template"
	"net/http"
	"strconv"
	"encoding/csv"
	"os"
)

var db *sql.DB
var tpl *template.Template


 const (
    // Initialize connection constants.
	HOST     = "bookstoredemo.postgres.database.azure.com"
    DATABASE = "bookstore"
    USER     = "demouser@bookstoredemo"
    PASSWORD = "avengersA1"
) 


func init() {
	var err error

	var connectionString string = fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=require", HOST, USER, PASSWORD, DATABASE)
	db, err = sql.Open("postgres", connectionString)

	//db, err = sql.Open("postgres", "postgres://bond:password@localhost/bookstore?sslmode=disable")
	
	if err != nil {
		panic(err)
	}

	if err = db.Ping(); err != nil {
		panic(err)
	}
	fmt.Println("You connected to your Azure Postgres database.")

	tpl = template.Must(template.ParseGlob("templatesb/*.gohtml"))

	if err = createFile(); err != nil {
		return
}
}

// export fields to templates
// fields changed to uppercase
type Book struct {
	Isbn   string
	Title  string
	Author string
	Price  float32
}

func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/books", booksIndex)
	http.HandleFunc("/books/show", booksShow)
	http.HandleFunc("/books/create", booksCreateForm)
	http.HandleFunc("/books/create/process", booksCreateProcess)
	http.HandleFunc("/books/update", booksUpdateForm)
	http.HandleFunc("/books/update/process", booksUpdateProcess)
	http.HandleFunc("/books/delete/process", booksDeleteProcess)
	http.ListenAndServe(":8080", nil)

	select {}
}

func index(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/books", http.StatusSeeOther)
}

func booksIndex(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	rows, err := db.Query("SELECT * FROM books")
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	defer rows.Close()

	bks := make([]Book, 0)
	for rows.Next() {
		bk := Book{}
		err := rows.Scan(&bk.Isbn, &bk.Title, &bk.Author, &bk.Price) // order matters
		if err != nil {
			http.Error(w, http.StatusText(500), 500)
			return
		}

		go func() {
		bingDetail, err := setBingSearchData(bk.Title, bk.Author)
		if err != nil {
				fmt.Println(err)
				return
		}

		file, errF := os.OpenFile("results.csv", os.O_RDWR, 0644)
		if errF != nil {
				fmt.Println(errF)
				//return
		}
		defer file.Close()

		writer := csv.NewWriter(file)
		defer writer.Flush()

		for _, v := range bingDetail {
				_, err = db.Exec("INSERT INTO SearchInfo (isbn, title, country, hits) VALUES ($1, $2, $3, $4)", bk.Isbn, bk.Title, v.Country, v.Value)
				if err != nil {
						fmt.Println(err)
						return
				}

				s := strconv.FormatUint(v.Value, 16)

				value := []string{bk.Isbn, bk.Title, v.Country, s}
				err := writer.Write(value)
				if err != nil {
						fmt.Println(err)
						return
				}
		}
	}()

		bks = append(bks, bk)
	}
	if err = rows.Err(); err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	tpl.ExecuteTemplate(w, "books.gohtml", bks)
}

func booksShow(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	isbn := r.FormValue("isbn")
	if isbn == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	row := db.QueryRow("SELECT * FROM books WHERE isbn = $1", isbn)

	bk := Book{}
	err := row.Scan(&bk.Isbn, &bk.Title, &bk.Author, &bk.Price)
	switch {
	case err == sql.ErrNoRows:
		http.NotFound(w, r)
		return
	case err != nil:
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	tpl.ExecuteTemplate(w, "show.gohtml", bk)
}

func booksCreateForm(w http.ResponseWriter, r *http.Request) {
	tpl.ExecuteTemplate(w, "create.gohtml", nil)
}

func booksCreateProcess(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	// get form values
	bk := Book{}
	bk.Isbn = r.FormValue("isbn")
	bk.Title = r.FormValue("title")
	bk.Author = r.FormValue("author")
	p := r.FormValue("price")

	// validate form values
	if bk.Isbn == "" || bk.Title == "" || bk.Author == "" || p == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	// convert form values
	f64, err := strconv.ParseFloat(p, 32)
	if err != nil {
		http.Error(w, http.StatusText(406)+"Please hit back and enter a number for the price", http.StatusNotAcceptable)
		return
	}
	bk.Price = float32(f64)

	// insert values
	_, err = db.Exec("INSERT INTO books (isbn, title, author, price) VALUES ($1, $2, $3, $4)", bk.Isbn, bk.Title, bk.Author, bk.Price)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	// confirm insertion
	tpl.ExecuteTemplate(w, "created.gohtml", bk)

	go func() {
		bingDetail, err := setBingSearchData(bk.Title, bk.Author)
		if err != nil {
				fmt.Println(err)
				return
		}

		file, errF := os.OpenFile("results.csv", os.O_RDWR, 0644)
		if errF != nil {
				fmt.Println(errF)
				//return
		}
		defer file.Close()

		writer := csv.NewWriter(file)
		defer writer.Flush()

		for _, v := range bingDetail {
				_, err = db.Exec("INSERT INTO SearchInfo (isbn, title, country, hits) VALUES ($1, $2, $3, $4)", bk.Isbn, bk.Title, v.Country, v.Value)
				if err != nil {
						fmt.Println(err)
						return
				}

				s := strconv.FormatUint(v.Value, 16)

				value := []string{bk.Isbn, bk.Title, v.Country, s}
				err := writer.Write(value)
				if err != nil {
						fmt.Println(err)
						return
				}
		}
	}()
	
}

func createFile() error {
	// detect if file exists
	var _, err = os.Stat("results.csv")

	// create file if not exists
	if os.IsNotExist(err) {
			var file, err = os.Create("results.csv")
			if err != nil {
					fmt.Println(err)
					return err
			}
			defer file.Close()

			writer := csv.NewWriter(file)
			defer writer.Flush()

			value := []string{"ISBN","Title","Country","Hits",}
			err = writer.Write(value)
			if err != nil {
					fmt.Println(err)
					return err
			}
	}

	return nil
}

func booksUpdateForm(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	isbn := r.FormValue("isbn")
	if isbn == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	row := db.QueryRow("SELECT * FROM books WHERE isbn = $1", isbn)

	bk := Book{}
	err := row.Scan(&bk.Isbn, &bk.Title, &bk.Author, &bk.Price)
	switch {
	case err == sql.ErrNoRows:
		http.NotFound(w, r)
		return
	case err != nil:
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}
	tpl.ExecuteTemplate(w, "update.gohtml", bk)
}

func booksUpdateProcess(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	// get form values
	bk := Book{}
	bk.Isbn = r.FormValue("isbn")
	bk.Title = r.FormValue("title")
	bk.Author = r.FormValue("author")
	p := r.FormValue("price")

	// validate form values
	if bk.Isbn == "" || bk.Title == "" || bk.Author == "" || p == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	// convert form values
	f64, err := strconv.ParseFloat(p, 32)
	if err != nil {
		http.Error(w, http.StatusText(406)+"Please hit back and enter a number for the price", http.StatusNotAcceptable)
		return
	}
	bk.Price = float32(f64)

	// insert values
	_, err = db.Exec("UPDATE books SET isbn = $1, title=$2, author=$3, price=$4 WHERE isbn=$1;", bk.Isbn, bk.Title, bk.Author, bk.Price)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}

	// confirm insertion
	tpl.ExecuteTemplate(w, "updated.gohtml", bk)
}

func booksDeleteProcess(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), http.StatusMethodNotAllowed)
		return
	}

	isbn := r.FormValue("isbn")
	if isbn == "" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
		return
	}

	// delete book
	_, err := db.Exec("DELETE FROM books WHERE isbn=$1;", isbn)
	if err != nil {
		http.Error(w, http.StatusText(500), http.StatusInternalServerError)
		return
	}
	_, err = db.Exec("DELETE FROM SearchInfo WHERE isbn=$1;", isbn)
	if err != nil {
			http.Error(w, http.StatusText(500), http.StatusInternalServerError)
			return
	}

	http.Redirect(w, r, "/books", http.StatusSeeOther)
}