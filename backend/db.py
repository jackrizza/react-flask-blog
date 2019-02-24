import rethinkdb as r
import secrets
import time


class db:
    # private variables
    __conn = r.connect("192.168.99.100", 32769).repl()
    __rethink = r.db("blog")

    # private functions
    def __cursor_to_array(cursor) -> object:
        data = []
        for document in cursor:
            data.append(document)
        return data

    # analytics
    def insert_analytics(self, a) -> bool:
        db.__rethink.table("analytics").insert(a).run(db.__conn)
        return True

    def get_analytics(self) -> []:
        cursor = db.__rethink.table("analytics").run(db.__conn)
        return db.__cursor_to_array(cursor)

    # posts
    def db_get_posts(self) -> []:
        cursor = db.__rethink.table("posts").run(db.__conn)
        return db.__cursor_to_array(cursor)

    def db_get_post(self, post_id) -> []:
        cursor = db.__rethink.table("posts").get(post_id).run(db.__conn)
        return cursor

    def db_search(self, match) -> []:
        cursor = db.__rethink.table("posts").filter(lambda doc:
                                                    doc['title'].match(r'{0}'.format(match))
                                                    ).run(db.__conn)
        return db.__cursor_to_array(cursor)

    def db_get_comments(self, post_id) -> []:
        cursor = db.__rethink.table("comments").filter(lambda doc:
                                                       doc['post_id'].match(post_id)
                                                       ).run(db.__conn)
        return db.__cursor_to_array(cursor)

    def save_post(self, post) -> bool:
        # check if post exists
        post_id = post["id"]
        is_post = False
        done = False
        cursor = db.__rethink.table("posts").get(post_id).run(db.__conn)

        if cursor is None :
            cursor = []
        else :
            cursor = db.__cursor_to_array(cursor)

        if len(cursor) > 1:
            is_post = True
        else :
            is_post = False
        #if post exists then, update post
        if is_post :
            db.__rethink.table("posts").get(post_id).update({"content" : post['content']}).run(db.__conn)
            done = True

        # if post doesn't exit then, create post
        else :
            db.__rethink.table("posts").insert(post).run(db.__conn)
            done = True
        return done

    def new_comment(self, comment) -> bool:
        db.__rethink.table("comments").insert(comment).run(db.__conn)
        return True


    # auth
    def check_email(self, match) -> bool:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['email'].match(match)
                                                    ).run(db.__conn)
        if len(db.__cursor_to_array(cursor)) == 1:
            return True
        else:
            return False

    def check_username(self, match) -> bool:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['username'].match(match)
                                                    ).run(db.__conn)
        if len(db.__cursor_to_array(cursor)) == 1:
            return True
        else:
            return False

    def create_user(self, new_user) -> bool:
        db.__rethink.table("users").insert(new_user).run(db.__conn)
        db.__rethink.table("users").filter(lambda doc:
                                           doc['username'].match(new_user["username"])
                                           ).update({"type" : "basic_user"}).run(db.__conn)

        return True

    def update_token(self, match) -> bool:
        new_secret = secrets.token_hex(16)
        new_time = str(int(time.time()))
        new_token = new_time + "" + new_secret
        db.__rethink.table("users").get(match).update({"token": new_token}).run(db.__conn)
        # TODO: smarter return needed, confirm that token was updated then, return true or false
        return True

    def check_token_association(self, match) -> bool:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['token'].match(match)
                                                    ).run(db.__conn)
        if len(db.__cursor_to_array(cursor)) == 1 :
            return True
        else :
            return False

    def get_user(self, match) -> []:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['username'].match(match)
                                                    ).run(db.__conn)
        return db.__cursor_to_array(cursor)

    def get_user_general_info(self, match) -> []:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['username'].match(match)
                                                    ).pluck('username', 'firstname', 'lastname', 'email', 'type',
                                                            'token').run(db.__conn)
        return db.__cursor_to_array(cursor)

    def get_salt(self, match):
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['username'].match(match)
                                                    ).pluck('salt',).run(db.__conn)
        data = db.__cursor_to_array(cursor)
        if len(data) > 0 :
            return data[0]["salt"]
        else :
            return []



