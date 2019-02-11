import rethinkdb as r


class db:
    __conn = r.connect("localhost", 28015).repl()
    __rethink = r.db("blog")

    #private functions
    def __cursor_to_array(cursor) -> []:
        data = []
        for document in cursor:
            data.append(document)
        return data

    #posts
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

    #auth
    def update_token(self, user_id) -> bool:
        return True

    def get_user(self, match) -> []:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['username'].match(match)
                                                    ).run(db.__conn)
        return db.__cursor_to_array(cursor)

    def get_user_general_info(self, match) -> []:
        cursor = db.__rethink.table("users").filter(lambda doc:
                                                    doc['username'].match(match)
                                                    ).pluck('username', 'firstname', 'lastname', 'email', 'type', 'token').run(db.__conn)
        return db.__cursor_to_array(cursor)

    def create_user(self) -> bool:
        pass