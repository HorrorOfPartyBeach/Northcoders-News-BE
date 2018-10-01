# **Northcoders News - Backend Project**

## **Welcome to Northcoders News!** 


A RESTful API made using MongoDB, Mongoose, Node.js and Express.js. 

Northcoders News is a news aggregator which has articles divided by topic; each article has comments which can be added to or deleted by the user who posts them and votes which can be incrememented or decremented.

The API has been deployed by Heroku and can be found at https://nc-news33.herokuapp.com/ (Doesn't fully work, only shows page with endpoints)

------------

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### **Prerequisites**

There are a few things you will need in order to install the API, these are listed below.

### General:

* A text editor e.g. VS Code, Sublime, Atom etc
* A Linux terminal e.g. Terminator
* npm package manager (comes with node.js) [Installation instructions](https://www.npmjs.com/)
* MongoDB v4.0 for the database [Docs and information](https://www.mongodb.com/)
* Postman for testing endpoints [Download information](https://www.getpostman.com/apps)
* An mLab account to host the production database [Signup information](https://mlab.com/)
* A Heroku account to deploy a live version of the API [Signup information](https://www.heroku.com/)

### Dependencies you will need:

* Mongoose v5.0.14 [Installation Instructions](https://www.npmjs.com/package/mongoose)
* body-parser v1.15.2 [Installation Instructions](https://www.npmjs.com/package/body-parser)
* Node.js v8.1.0 [Installation Instructions](https://nodejs.org/en/download/package-manager/)
* Express.js v4.16.3 [Installation Instructions](https://www.npmjs.com/package/express)


### Dev Dependencies you will need:

* Mocha v5.0.5 [Installation Instructions](https://www.npmjs.com/package/mocha)
* Chai v4.1.2 library [Installation Instructions](https://www.npmjs.com/package/chai)
* Nodemon v1.17.4 [Installation Instructions](https://www.npmjs.com/package/nodemon)
* Supertest v3.0.0 [Installation Instructions](https://www.npmjs.com/package/supertest)

----------

## **Installing**

A step by step series of examples that tell you how to get a development env running

### **Get this Repository**

* Fork this repository and clone it so you have your own local copy

* Run the git clone command in your terminal

```
$ git clone https://github.com/HorrorOfPartyBeach/BE2-northcoders-news
```

* `cd` into the northcoders news folder and run `npm install`

### **Install MongoDB**

* Install MongoDB, if you don't already have it installed, by running the following codes:
```
$ sudo apt -y install mongodb
```
* Open a new terminal window and run the command `mongod`, it should say `waiting for connections on port 27017...` at the bottom. If you encounter any issues, it may be because MongoDB is already running in the background. You can try running the Mongo shell in a new terminal window to see if it will work. If it doesn't, you can try finding and killing the current process by following the steps below:

* Find process by name:
```
$ pgrep mongo
e.g. 1350
```
* Kill mongod-process
```
$ kill 1350
```
If you get the following error `/data/db not found/does not exist` or `read/write issues to /data/db` or similar, run the below commands -
```
$ mkdir -p /data/db
$ sudo chown -R $USER /data/db
```
* You can run the Mongo shell separately in a new window by running `mongo` and leave the `mongod` window running in the background.

### **Install required dependencies**

* Open it in your text editor and check if you have node and npm installed by running the following codes in your terminal

```
$ node -v
$ npm -v
```

* If Node is not installed, run the following codes (for Debian/Ubuntu)

```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

* Install the various dependencies you need as per their instructions

```
e.g npm i express
```

* Remember to install Supertest and Nodemon as Dev dependencies

```
e.g. npm i -D Supertest
```

* Make a config folder in the root folder and within that, a config.js file by running the commands below

```
$ mkdir config
$ touch config.js
```

* In the root folder, make a .gitignore and list your config folder in it so it doesn't get pushed to github

```
$ touch .gitignore
```

* Use the below boilerplate config in your config.js

```js
const NODE_ENV = process.env.NODE_ENV || 'development'

config = {
  development: {
    'mongodb://localhost:27017/your_database_name'
  },
  test: {
    'mongodb://localhost:27017/your_test_database_name'
    },
  production: {
    'mongodb://<dbuser>:<dbpassword>@ds161710.mlab.com:61710/example-db'
  }
};

module.exports = config[NODE_ENV];
```

### **Include package.json Scripts**

Insure the following scripts are in your package.json so you can run the various npm commands.

```js
"scripts": {
    "test": "mocha ./spec",
    "start": "node index.js",
    "dev": "nodemon index.js",
    "seed:dev": "node ./seed/seed.dev.js"
  }
```

### **Seed the database**

You can seed the database by running `npm run seed:dev` in your terminal.

-----------------

## **Endpoints and Examples**

To test endpoints, follow the steps below: 

* Ensure `mongod` is running in one terminal

* Run `npm run dev` in another terminal, it should state:

  ```
  [nodemon] 1.17.4
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching: *.*
  [nodemon] starting `node index.js`
  listening on port 9090
  mongodb://localhost:27017/ncnews_name
  ```

* Open the Postman app and make a request as per the documentation; the request url will be `localhost:9090/` followed by an appropriate endpoint path e.g. `localhost:9090/api/articles`.

### The available endpoints are listed in the table below:

Endpoint | Path
------------ | -------------
HTML page listing available endpoints | **GET /api**
Get all the users | **GET /api/users**
Get user by ID | **GET /api/users/:username** --- e.g: `/api/users/mitch123`
Get all topics | **GET /api/topics**
Get all articles for a single topic | **GET /api/topics/:topic_slug/articles** --- e.g: `/api/topics/football/articles`
Add a new article to a topic | **POST /api/topics/:topic_slug/articles** --- e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
Get all articles | **GET /api/articles**
Get article by ID | **GET /api/articles/:article_id** --- e.g: `/api/articles/5b9ba40c8ed29146542ab7a4`
Get all comments for a single article | **GET /api/articles/:article_id/comments** --- e.g: `/api/articles/5b9ba40c8ed29146542ab7a4/comments`
Add a new comment to an article | **POST /api/articles/:article_id/comments** --- e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
Change the article votes - requires a vote up/down query | **PATCH /api/articles/:article_id** --- e.g: `/api/articles/5b9ba40c8ed29146542ab7a4?vote=up`
Change the comment votes - requires a vote up/down query | **PATCH /api/comments/:comment_id** --- e.g: `/api/comments/5b9ba40c8ed29146542ab7c8?vote=down`
Delete a comment | **DELETE /api/comments/:comment_id**


## **Running the tests**

To run the tests, ensure you have run the `mongod` command in a separate terminal window and Mongo is connected on `port 27017`. Then run `npm run test` in a new window or the integrated terminal of your text editor.

### **What the tests are for**

The tests use Supertest, Mocha and the Chai library to test the happy and unhappy paths for the various available endpoints. Some examples can by found below:

* *Test that the GET request returns an array of comments and a status 200 code*
```js
describe('/comments', () => {
        it('GET returns an array of comments and 200 status code', () => {
            return request.get('/api/comments')
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.have.length(comments.length);
                })
        })
    })
```

* *Test that a status 400 is returned if a required field is missing in a POST request*
```js
it('POST returns a 400 status and error message when a required field is missing', () => {
            return request.post(`/api/topics/cats/articles`)
                .send({
                    "title": "New title",
                    "body": "New article",
                    "belongs_to": "cats"
                })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('articles validation failed: created_by: Path `created_by` is required.');
                })
        })
```
----------------

## **Deployment**

To deploy a live version, follow the instructions on mLabs for seeding the production database and the instructions on Heroku for deploying the API.

--------------------

## **Built With**

* [MongoDB](https://docs.mongodb.com/?_ga=2.256921288.21644899.1537894067-60737958.1536577057) - NoSQL database program
* [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js
* [Node.js](https://maven.apache.org/) - Javascript run-time environment
* [Express.js](https://rometools.github.io/rome/) - Web Application framework
* [mLab](https://mlab.com/) - Database-as-a-service
* [Heroku](https://www.heroku.com/) - Cloud Application Platform

----------------

## **Authors**

**Emma Gilmour** - [HorrorOfPartyBeach](https://github.com/HorrorOfPartyBeach)

---------------

## **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

--------------

## **Acknowledgments**

* The great tutors and course at Northcoders
* A myriad of documentation
