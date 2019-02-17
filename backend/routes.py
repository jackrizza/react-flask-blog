from flask import *
import json
from db import db
from key import key
from auth import auth

sr: Blueprint = Blueprint("simple_page", __name__, template_folder='templates')
auth = auth()
db = db()
key = key()


@sr.route("/search/<match>", methods=['POST'])
def search(match):
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        post = db.db_search(match)
        return jsonify(post)
    else:
        return jsonify("{error : 'wrong api key'}")



@sr.route("/comments/<post_id>", methods=['POST'])
def comments(post_id):
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        comments = db.db_get_comments(post_id)
        return jsonify(comments)
    else:
        return jsonify("{error : 'wrong api key'}")


@sr.route("/post/<post_id>", methods=['POST'])
def get_post(post_id):
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        post = db.db_get_post(post_id)
        return jsonify(post)
    else:
        return jsonify("{error : 'wrong api key'}")


@sr.route("/posts", methods=['POST'])
def get_posts():
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        posts = db.db_get_posts()
        return jsonify(posts)
    else:
        return jsonify('{"type" : "error", "response" : ""wrong api token"}')

@sr.route("/checkemail/<email>", methods=['POST'])
def email_check(email):
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        email = db.check_email(email)
        if email:
            return jsonify('{"type" : "error","response" : "user with email already exists"}')
        else:
            return jsonify('{"type" : "sucsess"}')
    else:
        return jsonify('{"type" : "error", "response" : ""wrong api token"}')


@sr.route("/checkusername/<username>", methods=['POST'])
def username_check(username):
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        email = db.check_username(username)
        if email:
            return jsonify('{"type" : "error","response" : "user with username already exists"}')
        else:
            return jsonify('{"type" : "sucsess"}')
    else:
        return jsonify('{"type" : "error", "response" : ""wrong api token"}')

@sr.route("/signup", methods=['POST'])
def sign_up():
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
       new_user = db.create_user(request.json["new_user"])
       print(request.json["new_user"])
       if new_user:
           return jsonify('{"type" : "sucsess"}')

       else:
           return jsonify('{"type" : "error","response" : "there was a problem creating the user"}')

    else:
        return jsonify('{"type" : "error", "response" : ""wrong api token"}')


@sr.route("/salt", methods=['POST'])
def salt() :
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        salt = db.get_salt(request.json["username"])
        if len(salt) > 0:
            return jsonify('{"type" : "sucsess", "salt" : "' + salt + '"}')

        else:
            return jsonify('{"type" : "error","response" : "no user with that username"}')

    else:
        return jsonify('{"type" : "error", "response" : ""wrong api token"}')


@sr.route("/signin", methods=['POST'])
def sign_in() :
    client_api_key = request.json['client_api_key']
    if key.check_key(client_api_key):
        user = request.json["user"]
        auth_user = auth.sign_in(user)
        print(auth_user)
        return jsonify(auth_user)
    else:
        return jsonify('{"type" : "error", "response" : ""wrong api token"}')



@sr.route("/test", methods=['POST'])
def test():
    checked_token = auth.check_token("1549851788-fcfd36a9ea060de17539d3eed7ecda1a")
    if checked_token:
        return "Everthing is set"
    else:
        return "Not the right token"
