# Chinese Learning API

This is an API run on the localhost:3000 that provides users with the ability to create word lists, choose words to add to the wordsets and add labels to the wordsets. Users can also edit, update, delete wordsets,labels and wors if needed. 

## Table of content  
- [**Getting Started**](#getting-started)
   - [**Installing**](#installing)
   - [**Start the app in the dev mode**](#dev-mode)
   - [**Start the app without dev mode**](#no-dev-mode)
- [**Running the test**](#running-the-test)
  - [**Postman Testing Table**](#postman-testing-table)
     - [**User routes Table**](#user-routes-table)
     - [**Word routes Table**](#word-routes-table)
     - [**Label routes Table**](#label-routes-table)
     - [**Wordset routes Table**](#wordset-routes-table)
  - [**User routes**](#user-routes)
     - [**/users (get)**](#show-all-users)
     - [**/users/login**](#users-login)
     - [**/users/signup**](#users-signup)
     - [**/users/:id (get))**](#show-a-user)
     - [**/users/:id (put))**](#update-a-user)
     - [**/users/:id  (delete)**](#delete-a-user)
   - [**Word routes**](#word-routes)
     - [**/words (get)**](#show-all-words)
     - [**/words (post)**](#create-a-word)
     - [**/words/:id (get))**](#show-a-word)
     - [**/words/:id (put))**](#update-a-word)
     - [**/words/:id  (delete)**](#delete-a-word)
     - [**/words/level/:number (get)**](#show-all-words-in-level)
     - [**/words/topic/:theme (get)**](#show-all-words-in-topic)
  - [**Label routes**](#label-routes)
     - [**/labels (post)**](#create-a-label)
     - [**/labels/:id (get))**](#show-a-label)
     - [**/labels/:id (put))**](#update-a-label)
     - [**/labels/:id  (delete)**](#delete-a-label)
   - [**Wordset routes**](#wordset-routes)
     - [**/wordsets (get)**](#show-all-wordsets)
     - [**/wordsets (post)**](#create-a-wordset)
     - [**/wordsets/:id (get))**](#show-a-wordset)
     - [**/wordsets/:id (put))**](#update-a-wordset)
     - [**/wordsets/:id  (delete)**](#delete-a-wordset)
     - [**/wordsets/:wordsetId/words/:wordId**](#add-words)
     - [**/wordsets/:wordsetId/labels/:labelId**](#add-labels)
- [**User Story**](#user-story)
 
  
  
## Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing

1. copy the url: `git@github.com:EmmaQjf/Chinese-learning-4models.git` 
   <img width="715" alt="Screen Shot 2024-01-27 at 10 55 15 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/cb0e5e18-dcaa-42b5-8ea2-26540492dfab">
2. Open Terminal and change the current working directory to the location where you want the cloned directory.
3. clone the repo to the local directory: `git clone git@github.com:EmmaQjf/Chinese-learning-4models.git`
4. cd into the clone directionary.
5. Open the code in VS `code .`  
6. Install all the packages: express, mongoose, dotenv, nodemon, bcrypt, jsonwebtoken, mongodb-memory-server,morgan, jest, supertest:  `npm i`
7. Create a file .env and put in your MONGO_URI and SECRET
### [:arrow_up: Back to Top](#table-of-content)

### <a name="dev-mode"></a>Start the app in the dev mode 
`npm run dev`

### <a name="no-dev-mode"></a>Start the app without dev mode 
`npm run start`

### [:arrow_up: Back to Top](#table-of-content)

## Running the test
1. Check jest and supertest is installed, if not:`npm -i D jest supertest`.
2. Check jest and supertest is set up on the package.json.  
    ```diff
    "scripts": {
    "test": "jest --watchAll --detectOpenHandles",
    "start": "node server.js",
    "dev": "nodemon"
    },
    "jest": {
    "testEnvironment": "node"
    },
    ```
3. Run the test: `npm run test`

### [:arrow_up: Back to Top](#table-of-content)

### Postman Testing Table

#### User routes table
| method | url | purpose  & token | 
| :---         |     :---:      |          ---: |
| get | /users | show all the users, no token |
| post | /users/login | login in user , no token|
| post | /users | create a user, token needed |
| get | /users/:id | show a user info, no token |
| put | /users/:id | update a user, token needed|
| delete | /users/:id | delete a user, token needed|


#### word routes table
| method | url | purpose & token |
| :---         |     :---:      |          ---: |
| get | /words | show all the words & no token needed |
| post | /words | create a word & token needed for authorization|
| get | /words/:id | show a word info & no token needed |
| put | /words/:id | update a word & token needed for authorization |
| delete | /words/:id | delete a word & token needed for authorization|
| get | /words/level/:number | show all the words in the level   & no token needed|
| get | /words/topic/:theme | show all the words with the theme  & no token needed|



#### label routes table
| method | url | purpose & token |
| :---         |     :---:      |          ---: |
| post | /labels | create a label, token needed |
| get | /labels/:id | show a label info, no token|
| put | /labels/:id | update a label, token needed |
| delete | /labels/:id | delete a label, token needed|


#### wordset routes table
| method | url | purpose & token |
| :---         |     :---:      |          ---: |
| get | /wordsets | show all the wordsets, no token |
| post | /wordsets | create a wordset, token needed |
| get | /wordsets/:id | show a wordset info, no token|
| put | /wordsets/:id | update a wordset, token needed |
| delete | /wordsets/:id | delete a wordset, token needed|
| post | /wordsets/:wordsetid/words/:wordId | add words into wordset and wordsets into the word, no token|
| delete | /wordsets/:wordsetid/labels/:labelId | add labels into wordset and wordsets into the label, no token|


### User routes

#### <a name="show-all-users"></a>/users (get)
get request to show all the users and return an array. No need to send data in Body. No need Authorization Header With Bearer Token Bearer <token>
<img width="712" alt="Screen Shot 2024-01-27 at 11 26 11 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/11572724-b0be-474a-9db1-07f4a02bcd4b">

```diff
  [
 {
        "_id": "65b531cc3ae9f4dd742dbe1f",
        "username": "cai",
        "email": "cai@gmail.com",
        "password": "$2b$08$.GJsoLu.Xofqp51cspQWvu7dsuJFRweot1ryQ4IqqgikY2AYwAjn6",
        "wordsets": [
            "65b536603ae9f4dd742dbe46"
        ],
        "createdAt": "2024-01-27T16:39:40.780Z",
        "updatedAt": "2024-01-27T16:59:12.652Z",
        "__v": 1
    }
  ]
```
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="users-login"></a>/users/login  
Post request returns an object.  No need to send data in Body. Send in the data of user password and email address. 
<img width="830" alt="Screen Shot 2024-01-27 at 11 20 25 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/b668585f-5f5d-4f37-913c-44f9a393ba75">
 ```diff
    {
    "user": {
        "_id": "65b52c833ae9f4dd742dbe0c",
        "username": "cai",
        "email": "cai@gmail.com",
        "password": "$2b$08$mEJtg0uUXMCJ7L/aONEjTudpy0Q47VbyIf67Ie1i1HwXBV4UEzNIm",
        "wordsets": [],
        "createdAt": "2024-01-27T16:17:07.669Z",
        "updatedAt": "2024-01-27T16:17:07.669Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI1MmM4MzNhZTlmNGRkNzQyZGJlMGMiLCJpYXQiOjE3MDYzNzI0MTN9.SJQEvQvVblXVvQFHwn7szN8Q0oE4BEp8_Hn3_XS0DYA"
   }
 ```
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="users-signup"></a>/users/signup
Post request to create a user and return an object with user and token.  No token needed but need to send in the username, email and password. 
<img width="880" alt="Screen Shot 2024-01-27 at 11 18 04 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/f01a9398-a176-405c-8775-c8f233644ddf">

 ```diff
    {
    "user": {
        "username": "cai",
        "email": "cai@gmail.com",
        "password": "$2b$08$mEJtg0uUXMCJ7L/aONEjTudpy0Q47VbyIf67Ie1i1HwXBV4UEzNIm",
        "wordsets": [],
        "_id": "65b52c833ae9f4dd742dbe0c",
        "createdAt": "2024-01-27T16:17:07.669Z",
        "updatedAt": "2024-01-27T16:17:07.669Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI1MmM4MzNhZTlmNGRkNzQyZGJlMGMiLCJpYXQiOjE3MDYzNzIyMjd9.h-XuHqXT6F2pA1WZyDyLVS4gn5M859taJNqiU5I2Bv4"
    }
 ```
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="show-a-user"></a>/users/:id (get)
get request to show a detailed user info. Need Authorization Header With Bearer Token Bearer <token>
<img width="1072" alt="Screen Shot 2024-01-27 at 11 22 11 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/c07672da-2e50-435c-8a23-3cf891fd2092">
 ```diff
    {
    "_id": "65b52c833ae9f4dd742dbe0c",
    "username": "cai",
    "email": "cai@gmail.com",
    "password": "$2b$08$mEJtg0uUXMCJ7L/aONEjTudpy0Q47VbyIf67Ie1i1HwXBV4UEzNIm",
    "wordsets": [],
    "createdAt": "2024-01-27T16:17:07.669Z",
    "updatedAt": "2024-01-27T16:17:07.669Z",
    "__v": 0
    }
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI1MmM4MzNhZTlmNGRkNzQyZGJlMGMiLCJpYXQiOjE3MDYzNzIyMjd9.h-XuHqXT6F2pA1WZyDyLVS4gn5M859taJNqiU5I2Bv4"
    }
 ```

### [:arrow_up: Back to Top](#table-of-content)

#### <a name="update-a-user"></a>/users/:id  (put)
put request to update user info and return an object, Authorization Header With Bearer Token Bearer <token>  
<img width="774" alt="Screen Shot 2024-01-27 at 11 24 15 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/1ad86d94-cd0b-43c0-98a5-2fb0ed5a4346">


#### <a name="delete-a-user"></a>/users/:id  (delete)
delete request to delete a user and return an object,  Authorization Header With Bearer Token Bearer <token>
if the token is not provided, then it returns 'Not authorized' message.  
<img width="823" alt="Screen Shot 2024-01-27 at 11 28 29 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/d32e5d94-fa14-4efa-bfaa-73ad58ce3b1d">
```diff
  {
    "message": "deleted the user"
  }
```

### Word routes

#### <a name="show-all-words"></a>/words (get)
get request to show all the words and return an array.  No need Authorization Header With Bearer Token Bearer <token> 
<img width="825" alt="Screen Shot 2024-01-27 at 11 45 52 AM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/059622ac-2ccf-4a40-8f29-910778d567ca">


```diff
 [
    {
        "_id": "65b532e03ae9f4dd742dbe2c",
        "pinyin": "han bao",
        "hanzi": "汉堡",
        "meaning": "hamburger",
        "level": 2,
        "topic": "fastfood",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [],
        "createdAt": "2024-01-27T16:44:16.785Z",
        "updatedAt": "2024-01-27T16:44:16.785Z",
        "__v": 0
    }
]
```
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="create-a-word"></a>/words (post)
Post request to create a word and return an object.  Authorization Header With Bearer Token Bearer <token>  

#### <a name="show-a-word"></a>/words/:id  (get)
get request to show a detailed word info. No authorizaiton needed 

#### <a name="update-a-word"></a>/words/:id  (put)
put request to update word info and return an object, Authorization Header With Bearer Token Bearer <token>  

#### <a name="delete-a-word"></a>/words/:id (delete)
delete request to delete a wordset and return an object,  Authorization Header With Bearer Token Bearer <token>

### [:arrow_up: Back to Top](#table-of-content)

#### <a name="show-all-words-in-level"></a>/words/level/:number (get)
get request to show all the words with the level and return an array,  No need Authorization Header With Bearer Token Bearer <token>
<img width="687" alt="Screen Shot 2024-01-27 at 1 22 07 PM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/2bb5504d-2da9-4b68-8e8d-dfec94cccbe1">
```diff
  [
    {
        "_id": "65b535d33ae9f4dd742dbe3d",
        "pinyin": "pi sa",
        "hanzi": "披萨",
        "meaning": "pizza",
        "level": 1,
        "topic": "fastfood",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [],
        "createdAt": "2024-01-27T16:56:51.530Z",
        "updatedAt": "2024-01-27T16:56:51.530Z",
        "__v": 0
    },
    {
        "_id": "65b535e93ae9f4dd742dbe40",
        "pinyin": "ke le",
        "hanzi": "可乐",
        "meaning": "coke",
        "level": 1,
        "topic": "beverage",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [],
        "createdAt": "2024-01-27T16:57:13.165Z",
        "updatedAt": "2024-01-27T16:57:13.165Z",
        "__v": 0
    }
  ]
```
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="show-all-words-in-topic"></a>/words/topic/:theme (get)
get request to show all the words with the theme and return an array.  No need Authorization Header With Bearer Token Bearer <token>
<img width="710" alt="Screen Shot 2024-01-27 at 1 23 25 PM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/3e17df1b-2a8a-45b5-aff6-a3c12b60d317">
```diff
  [
    {
        "_id": "65b532e03ae9f4dd742dbe2c",
        "pinyin": "han bao",
        "hanzi": "汉堡",
        "meaning": "hamburger",
        "level": 2,
        "topic": "fastfood",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [
            "65b536603ae9f4dd742dbe46"
        ],
        "createdAt": "2024-01-27T16:44:16.785Z",
        "updatedAt": "2024-01-27T17:04:21.893Z",
        "__v": 1
    },
    {
        "_id": "65b535b13ae9f4dd742dbe3a",
        "pinyin": "shu tiao",
        "hanzi": "薯条",
        "meaning": "fries",
        "level": 2,
        "topic": "fastfood",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [
            "65b536603ae9f4dd742dbe46"
        ],
        "createdAt": "2024-01-27T16:56:17.138Z",
        "updatedAt": "2024-01-27T17:05:17.936Z",
        "__v": 1
    },
    {
        "_id": "65b535d33ae9f4dd742dbe3d",
        "pinyin": "pi sa",
        "hanzi": "披萨",
        "meaning": "pizza",
        "level": 1,
        "topic": "fastfood",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [],
        "createdAt": "2024-01-27T16:56:51.530Z",
        "updatedAt": "2024-01-27T16:56:51.530Z",
        "__v": 0
    }
  ]
```
### [:arrow_up: Back to Top](#table-of-content)


### label routes

#### <a name="create-a-label"></a>/labels  (post)
Post request to create a label and return an object. Send in data about labelPhrase in the Body.  Need Authorization Header With Bearer Token Bearer <token>  

#### <a name="show-a-label"></a>/labels/:id (show)
Post request to show a label and return an object. No data in Body.  No Authorization Header With Bearer Token Bearer <token>  

#### <a name="update-a-label"></a>/labels/:id (update)
put request to update a label info and return an object. Send in data about labelPhrase in the Body. Need Authorization Header With Bearer Token Bearer <token>  

#### <a name="delete-a-label"></a>/labels/:id 
Send the delete request and return an object. No data in Body.  Need Authorization Header With Bearer Token Bearer <token>  

### [:arrow_up: Back to Top](#table-of-content)


### WORDSET ROUTES

#### <a name="show-all-wordsets"></a>/wordsets (get)
get request to show all the wordsets and return an array. No data in Body. No Authorization Header With Bearer Token Bearer <token>  

#### <a name="create-a-wordset"></a>/wordsets (post)
Post request to create a wordset and return an object. Send in data about title and level in the Body. No Authorization Header With Bearer Token Bearer <token>

#### <a name="show-a-wordset"></a>/wordsets/:id (get)
get request to show a detailed wordset info. No data in Body. No need Authorization Header With Bearer Token Bearer <token>

#### <a name="update-a-wordset"></a>/wordsets/:id (put)
put request to update wordset info and return an object. Send in data about title or level in the Body. Need Authorization Header With Bearer Token Bearer <token>  

#### <a name="delete-a-wordset"></a>/wordsets/:id (delete)
delete request to delete a wordset and return an object. No data in Body.  Need Authorization Header With Bearer Token Bearer <token>
if the token is not provided, then it returns 'Not authorized' message.  
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="add-words"></a>/wordsets/:wordsetId/words/:wordId
post request to add a word to the wordsets model and add a wordsets to the word model.  Authorization Header With Bearer Token Bearer <token>
if the token is not provided, then it returns 'Not authorized' message.  
<img width="852" alt="Screen Shot 2024-01-27 at 12 04 32 PM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/c60bb117-567f-46cf-9105-62e91fac3004">

```diff
  {
    "msg": "Sucessfully associate words with id 65b532e03ae9f4dd742dbe2c with wordset with id 65b536603ae9f4dd742dbe46 ",
    "wordset": {
        "_id": "65b536603ae9f4dd742dbe46",
        "title": "startSet1",
        "level": 2,
        "words": [
            "65b532e03ae9f4dd742dbe2c"
        ],
        "labels": [],
        "user": "65b531cc3ae9f4dd742dbe1f",
        "createdAt": "2024-01-27T16:59:12.610Z",
        "updatedAt": "2024-01-27T17:04:21.855Z",
        "__v": 1
    },
    "word": {
        "_id": "65b532e03ae9f4dd742dbe2c",
        "pinyin": "han bao",
        "hanzi": "汉堡",
        "meaning": "hamburger",
        "level": 2,
        "topic": "fastfood",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [
            "65b536603ae9f4dd742dbe46"
        ],
        "createdAt": "2024-01-27T16:44:16.785Z",
        "updatedAt": "2024-01-27T17:04:21.893Z",
        "__v": 1
    }
}
```
### [:arrow_up: Back to Top](#table-of-content)

#### <a name="add-labels"></a>/wordsets/:wordsetId/labels/:labelId
post request to add a label to the wordsets model and add a wordset to the label model.  Authorization Header With Bearer Token Bearer <token>

<img width="807" alt="Screen Shot 2024-01-27 at 12 06 29 PM" src="https://github.com/EmmaQjf/Chinese-learning-4models/assets/122846366/27cf5f50-72bf-424e-adc5-0701d2584840">

```diff
  {
    "msg": "Sucessfully associate wordset with id 65b536603ae9f4dd742dbe46 with label with id 65b5360b3ae9f4dd742dbe43 ",
    "wordset": {
        "_id": "65b536603ae9f4dd742dbe46",
        "title": "startSet1",
        "level": 2,
        "words": [
            "65b532e03ae9f4dd742dbe2c",
            "65b535b13ae9f4dd742dbe3a"
        ],
        "labels": [
            "65b5360b3ae9f4dd742dbe43"
        ],
        "user": "65b531cc3ae9f4dd742dbe1f",
        "createdAt": "2024-01-27T16:59:12.610Z",
        "updatedAt": "2024-01-27T17:06:23.391Z",
        "__v": 3
    },
    "label": {
        "_id": "65b5360b3ae9f4dd742dbe43",
        "labelPhrase": "easy",
        "user": "65b531cc3ae9f4dd742dbe1f",
        "wordsets": [
            "65b536603ae9f4dd742dbe46"
        ],
        "__v": 1
    }
 }
```
### [:arrow_up: Back to Top](#table-of-content) 

## USER STORY

+ As a user, I can land on a page when I can clicks at the login or sign up buttons and be navigated to a page where I can log in or sign up.
+ As a user, I should be able to land on a page and see a Nav Bar with a navigation link to 'wordsets','words' and 'labels'
+ As a user, I can click a navagation link to see all the words and be navigated to a page where I see a list of words
+ As a user, I should be able to click a link to create/update/delete words and be navigated to a page where I create/update/delete words.
+ As a user, I should be able to click on an individual word and be navigated to a page where I see all the details for that particular word
+ as a user, I can click on a navigation link to see all the wordsets and be navigated to a page where I see a list of wordsets.
+ As a user, I should be able to click a link to create/update/delete wordsets and be navigated to a page where I create/update/delete wordsets.
+ As a user, I should be able to click on an individual wordset and be navigated to a page where I see all the details for that particular wordset"
+ As a user, I should be able to click on a workset and add all the words to the workset.
+ As a user, I should be able to click on a workset and add all the labels to the workset.
+ As a user, I should be able to click a link to create/update/delete labels and be navigated to a page where I create/update/delete labels.
+ As a user, I should be able to click on an individual movie and be navigated to a page where I see all the details for that particular movie"

### [:arrow_up: Back to Top](#table-of-content)
