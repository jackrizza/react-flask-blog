# React Flask Blog

## About
RFBlog is a simple blog application that uses rethinkdb and flask as it's backend and reactjs as the front end. They are servered on two different servers http://localhost:3000 (React) and http://localhost:5000 (Flask) cors will have to be disabled to run this correctly


## RETHINKDB
### creating the database
Once you have rethinkdb running and the web ui open paste the following code in the data explorer
```js
r.dbCreate("blog");
r.db("blog").tableCreate("posts");
r.db("blog").tableCreate("comments");
r.db("blog").tableCreate("users");
```

## DATA STYLE
### post data
The majority of the post data will look something like this
```js
{
  "title" : "Blog Post Title",
  "content" : "Your content goes here",
  "author" : "Augustus Rizza",
  "date" : new Date()
}
```

### user data
The majority of the user data will look something like this
```js
{
  "email": "jackrizza@gmail.com",
  "id":  "ba63d35f-d5b6-4f4b-9cd2-fd78fc7f7500" ,
  "password":  "PASSWORD_WILL_BE_HERE" ,
  "salt":  "SALT_WILL_BE_HERE" ,
  "token":  "TOKEN_WILL_BE_HERE" ,
  "type":  "basic_user" ,
  "username":  "jackrizza"
}
```

### comments data
The majority of the comments data will look something like this
```js
{
  "comment":  "I like your functional questioning. Keep up the good work. :)" ,
  "date":  "2019-02-24T20:57:28.840Z" ,
  "id":  "8fd654d9-3291-43e4-8bbf-03adb9a8e3c1" ,
  "post_id":  "0039fc0f-f552-4184-a715-a8515f972764" ,
  "user":  "augustusdigby"
}
```

## TODO
- Create a readable stream for comments
  - this is because right now the python backend can only handle 3 users looking at a article for 5 minutes before crashing (this only started when we moved rethinkdb to docker).
- Smarter return for ```<backend/db.py>db.update_token()```
- Create a ```db.py``` for mongodb / mysql
