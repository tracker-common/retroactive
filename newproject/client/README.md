# Pivot Skillz!

## About

This app takes in raw data from markdown files in the career-paths repo (must be checked out separately) and build a visual tool to do self assessments.

Here are the main features:
* Provides a nice experience for reading each skill on it's own and walking you through the assessment step by step
* A select all button at the bottom will highlight all the raw assessment data, making it easier to copy and paste it into the Feedback app
* Provides a nice print stylesheet so you can print it and see everything on one page
* Provides an input field for your name, so when printing you can have it there
* A reset button to completely clear all current progress, includes a warning
* "ALL DONE" indicator in the summary area at the bottom of the app

## Development

1. Clone the repo
2. From the console, run `npm install`
3. From the console, run `npm run dev` to start the local server
4. Visit <http://localhost:8080/webpack-dev-server/> to see the local version

## Updating the self assessment data

1. In the root directory of the pivotskillz app, clone https://github.com/pivotaltracker/career-paths
2. Make changes to the data as needed and commit from inside the `career-paths` folder

## Importing the data into the pivot skillz app

1. From the root directory of the pivotskillz app, run `npm run parse`.  **The career-paths repo MUST be checked out for this to work!**
2. Commit changes

## Deploying the app to production

1. From the root directory of the pivotskillz app, run `cf login` and login.
2. From the root directory of the pivotskillz app, run `npm run deploy`
3. Visit http://pivotskillz.cfapps.io/ to see it live (basic auth is the same credentials as Pivotal Tracker for beta)




