from flask import *
from db import db
from key import key
from auth import auth
sr: Blueprint = Blueprint("simple_page", __name__, template_folder='templates')
auth = auth()
db = db()

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
        return jsonify("{\"error\":\"wrong api token\"}")


@sr.route("/test", methods=['POST'])
def test() :
    return auth.sign_in(request.json)
