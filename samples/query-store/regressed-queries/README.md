# Identifying Regressed Queries with Azure Database for PostgreSQL Intelligent Performance
 
## Introduction
One of the challenges associated with monitoring and alerting is to filter out noise from the signal. Nobody wants to receive a midnight call by an automated alert for an issue that turns out to be a false positive. Nor do we want to lose hours sorting through issues to locate a starting point from which to triage. At any point, if you suffer from a slowdown in your workload, one way to digest the overall problem space is to review your top regressed queries using a dash of statistics. Doing so gives you a chance to rule out differences that are more likely to be “coincidental” so that you can concentrate on issues that are statistically significant. 

In his blog post [Operationalizing your PostgreSQL database health checks using SQL Notebooks](https://azure.microsoft.com/en-us/blog/operationalizing-your-database-health-checks-using-sql-notebooks/), Parikshit Savjani describes a great way to [using notebooks in Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/sql-notebooks?view=sql-server-2017) to operationalize PostgreSQL health checks. If you have started with basic health checks in your notebook, the exercise of extending your setup with the regressed queries scenario will rather be easy for you.
 
## Getting started
* Install [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download?view=sql-server-2017)
* Clone this repo or simply copy the notebook and the requirements.txt file into a local folder of your choice
* Open the folder in Azure Data Studio [CTRL + K CTRL + O]
* [Configure](https://docs.microsoft.com/en-us/sql/azure-data-studio/sql-notebooks?view=sql-server-2017#manage-packages) local Python kernel for Notebooks by switching the kernel to Python 3.
* Have an Azure Database for PostgreSQL instance configured as needed below.
* Update required paramaters within the notebook per blow
* Run your notebook

## Configure your database
You need to ensure below server settings for data collection to start.
* go into Server parameters parameters blade on Azure portal
* set pg_qs.track_utility to on
* set pg_qs.query_capture_mode to top or all
* set pgms_wait_sampling.query_capture_mode to all
 
<b>Please note that the supported versions are 9.6 and above

## Install required libraries
* click on 'Install Packages' at the top of the notebook
* run '.\python.exe -m pip install -r full_path_to_the_requirements_file\requirements.txt in terminal window

## Update your parameters
You will need to update the parameters indicated by the following based on your needs before you run your notebook.

    #############
    # update here
    #############

### What do these parameters mean?
* > baseline_period_start & baseline_period_end identify a window of measurements where you think the performance can be baselined
* > current_period_start & current_period_end identify the window of measurements that you want to compare against your baseline
* > significance_level is also commonly known as alpha in hypothesis testing. [It](https://en.wikipedia.org/wiki/Statistical_significance) is a measure of probability rejecting the null hypothesis while it is true. The typical value is 0.05.
* > directional_preference is a parameter to indicate direction of interest. You should choose 1 for increase, -1 for decrease and 0 for any direction of change between baseline and current period.
* > percent_change_threshold is a constant that can help you single out only percent changes above this value
* > output_file_path is a local path to output your results if there is any significant changes
* > host is in format similar to "yourdb.postgres.database.azure.com" and can be located at the overview blade of your instance in Azure portal
* > user should be similar to "youruser@yourdb" format

### I ran the notebook, now what?
You can play with the parameters to adjust your sensitivity but the output should give you regressed query candidates, if your directional_preference is +1. Is your table stats old? Is autovacuum catching up properly to clean your bloat? Are you hitting catch querying your tables? Do you have proper indices? Is your datasize drastically changed? Has your locks been at steady state or has there been any changes? 

Well, there are quite a number of a follow-up questions. This is only one of the first steps in your detective work. Good luck and let us know how you improved this notebook!