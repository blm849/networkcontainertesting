## Specifies the base image we're extending
FROM node:9

## Create base directory
RUN mkdir /src
RUN mkdir /src/views

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /src

# Install the main program
COPY ./app.js /src/app.js

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
RUN npm install --silent

## Add application code
COPY ./views /src/views

## Add the nodemon configuration file
#COPY ./nodemon.json /src/nodemon.json

## Set environment to "development" by default
#ENV NODE_ENV development

## Allows port 8080 to be publicly available
EXPOSE 8080

## The command uses nodemon to run the application
CMD node app.js

