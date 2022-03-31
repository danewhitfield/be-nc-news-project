![Shrelington_News (1)](https://user-images.githubusercontent.com/80724506/161143477-2ce7a84f-b957-4e8b-a363-b041c4449f1a.png)

### You Can Find My App Here: 
##### https://shrelington-news.herokuapp.com/api
----
### What Does This App Do?
The Shrelington-news app is a RESTFUL API and it is designed to respond to users with their desired endpoints & queries. The app consists of articles, comments, users and topics. You can use endpoints such as ```/api/articles``` to get all articles. Or more complex endpoints like ```/api/articles/:article_id/comments``` to get the comments from a specific article_id.
<br>
Another example - add users by doing a POST request to `/api/users` - there are a mandatory username and name field, and an optional avatar_url:
<br>
![carbon (1)](https://user-images.githubusercontent.com/80724506/161145402-0972aa45-6776-4268-b7c7-d4fb1dc5ca4e.svg)

_HINT: username and name fields must be of string type!_

If you would like to interact with the API for POST, PATCH and DELETE request I would recommend using [insomnia](https://insomnia.rest/download) or [postman](https://www.postman.com/downloads/)

----

### Get Started
To get started you can clone this repo by forking it and using your forked repo's clone url OR clone directly from this repo using:
```
https://github.com/danewhitfield/be-nc-news-project.git
```
----
### **Install Dependencies**
You can install all dependencies by running:
```
npm install
```
OR:

```
npm i
```
After, your terminal should look like one of the following:
```diff
+ if green - you're good to go!
- if red - you need to troubleshoot :(
! if yellow - ignore it ever happened and move on...
# disclaimer - I refuse liability for you ignoring the yellow.
```
_There will be a list of all dependencies and devDependencies at the bottom of this README - in case you're interested_

----
### SEED Your DATABASE
in the ```package.json``` file you'll see:
```
"seed": "node ./db/seeds/run-seed.js"
```
You can run this script by using:
```
npm run seed
```
----
### Running Your Tests
Of course - we need to check that our code is working and there's no better way to do that other than to run some tests! The ```npm i``` we ran earlier will have taken care of installing ```jest``` for us. We will be using jest for our TDD. To run these tests use:
```
npm test your-file-name
```
OR a nice shorthand is:
```
npm t your-file-name
```
If you want to just run all of your test suites at once then you don't have to specify the file name:
```
npm t
```
#### OPTIONAL...  _jest flags are not detrimental to the project working and are purely personal preference_
There's a bunch of flags for jest that are useful (find them here: [jest docs](https://jestjs.io/docs/getting-started)). But here's some I like to use:
```
jest --watchAll <<< this auto runs your tests every time you save a file.
jest --verbose <<< displays individual test results with the test suite hierarchy.
```
----
### **.ENV**

To setup your environments you need to create 2 files:

```
.env.test
```

```
.env.development
```
**These should contain the following**
<br>
_.env.test file:_
```
PGDATABSE=nc_news_test
```
_.env.development file:_
```
PGDATABSE=nc_news
```

These need to be added to your **_.gitignore_** if not already.

----
### Recommended Version Requirements For Node & Postgres
This app was made on Node Version:
```
node -v | v17.7.1
```
Postgres Version:
```
psql -V | 12.9
```
To find out what version you're running you can use ```node -v``` and ```psql -V```
