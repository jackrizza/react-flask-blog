# React Flask Blog

#About
RFBlog is a simple blog application that uses rethinkdb and flask as it's backend and reactjs as the front end. They are servered on two different servers http://localhost:3000 (React) and http://localhost:5000 (Flask) cors will have to be disabled to run this correctly

## creating the database
Once you have rethinkdb running and the web ui open paste the following code in the data explorer
```js
r.dbCreate("blog);
r.db("blog").tableCreate("posts");
r.db("blog").tableCreate("comments");
r.db("blog").tableCreate("keys");
r.db("blog").tableCreate("users");
```
You should be up and running

## post data
The majority of the post data will look something like this
```json
{
  title : "Blog Post Title",
  content : "Your content goes here",
  author : "Augustus Rizza",
  date : new Date()
}
```

## TODO
- Create Sign In
- Create Editor
- Create add a comment
- Create Profile page