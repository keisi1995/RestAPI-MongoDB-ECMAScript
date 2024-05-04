# RestAPI-MongoDB-ECMAScript:
RestAPI, using ECMAScript with connection to MongoDB, with jwt authentication.
## Configuration:
Enter a terminal and execute the following commands.

## Download the repository to your local machine:
git clone https://github.com/keisi1995/RestAPI-MongoDB-ECMAScript.git

## Enter the project:
cd RestAPI-MongoDB-ECMAScript

## init service mongodb in docker:
docker-compose up -d

## Install dependencies:
npm install

## Run the Node server prod:
npm start

## Run the Node server dev:
npm run dev

## EndPoint API:
    -POST / http://localhost:8080/api/v1/authenticate
    -POST / http://localhost:8080/api/v1/user/
    -GET / http://localhost:8080/api/v1/user/
    -GET / http://localhost:8080/api/v1/user/{id_user}
    -PUT / http://localhost:8080/api/v1/user/{id_user}
    -DEL / http://localhost:8080/api/v1/user/{id_user}