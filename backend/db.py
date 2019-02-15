import rethinkdb as r
import secrets
import time


class db:
    # private variables
    __conn = r.connect("localhost", 28015).repl()
    __rethink = r.db("blog")

    # private functions
    def __cursor_to_array(cursor) -> object:
        data = []
        for document in cursor:
            data.append(document)
        return data

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
        return True

    def update_token(self, match) -> bool:
        new_secret = secrets.token_hex(16)
        new_time = str(int(time.time()))
        new_token = new_time + "" + new_secret
        db.__rethink.table("users").get(match).update({"token": new_token}).run(db.__conn)

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


