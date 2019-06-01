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
* Go into Server parameters parameters blade on Azure portal
* Set pg_qs.track_utility to on
* Set pg_qs.query_capture_mode to top or all
* Set pgms_wait_sampling.query_capture_mode to all
 
<b>Please note that the supported versions are 9.6 and above

## Install required libraries
* Click on 'Install Packages' at the top of the notebook
* Run '.\python.exe -m pip install -r full_path_to_the_requirements_file\requirements.txt in terminal window

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
You can play with the parameters to adjust your sensitivity but the output should give you regressed query candidates, if your directional_preference is +1. Once you identified your regressed queries, your next step is to understand why your queries actually regressed. There can be a number of reasons why you would experience regression in PostgreSQL. Here are a few usual suspects for you:
* Is your table statistics current? Query optimizer leverages the statistics for your table deciding an optimal plan for your query. Perhaps it's time for you to run an ANALYZE to update the stats
* Is autovacuum catching up properly to clean your bloat? There are a number of settings that controls how and when a worker starts and stops working on reclaiming dead tuples on pages. Having excessive bloat might impact what can be fit into memory and reduce your workload's effectiveness.
* Are you hitting cache while querying your tables? If your queries are increasingly reading from disk, there sure is a missed opportunity for you to optimize performance.
* Do you have proper indices? Perhaps a deployment caused an index to unintentionally drop or maybe application users are interested in your tables with a brand new perspective. Make sure to use [Intelligent Performance Index Advisor](https://docs.microsoft.com/en-us/azure/postgresql/concepts-performance-recommendations) to see if there are indices you can benefit from.
* Has your datasize drastically changed? Perhaps your baseline expectations should adjust to your new data size. Nonetheless, it's great to keep track of this.
* Has your locks been at steady state or has there been any changes? Are there any significant differences? Locate the root cause for to get that performance win!
* What's the network latency? Have you run a 'select 1' to see what the network latency is? Perhapse it's not your database engine that is the issue?
* Could you be running this query elsewhere? Is this a read-only query? May be you should route this query to a replica to improve overall workload performance.

Well, there are quite a number of a follow-up questions that are not limited to above. This is only one of the first steps in your detective work. Good luck and let us know how you improved this notebook!