#!/usr/bin/env bash

# Author: Andrew Jarombek
# Date: 12/27/2017
# Commands to set up this node project in order they occur

# Initialize Node
npm init

# Install express
npm install express --save

# Start the basic node express server
node app.js

# Install babel
npm install babel-preset-env --save

# Install gulp and its plugins
# Install gulp-cli globally so we can use the 'gulp' command in bash
npm i --global gulp-cli
npm install gulp --save
npm install gulp-nodemon --save
npm install gulp-babel --save
npm install gulp-sourcemaps --save
npm install gulp-concat --save
npm install babel-core --save
npm install gulp-livereload --save

# You can now run the project by simply calling 'gulp'
gulp

# Install mongoose for mapping the MongoDB database objects
npm install mongoose --save

# Install body-parser to parse HTTP POST bodies by their MIME type
npm install body-parser --save

# See all processes running on PORT 3000 and kill that process
sudo lsof -i tcp:3000
kill -9 51904

# Basic authentication for http requests
npm install express-basic-auth --save