import rethinkdb as r


class db:
    conn = r.connect("localhost", 28015).repl()
    rethink = r.db("blog")

    def cursor_to_array(cursor) -> []:
        data = []
        for document in cursor:
            data.append(document)
        return data

    def db_get_posts(self) -> []:
        cursor = db.rethink.table("posts").run(db.conn)
        return db.cursor_to_array(cursor)

    def db_get_post(self, post_id) -> []:
        cursor = db.rethink.table("posts").get(post_id).run(db.conn)
        return cursor

    def db_search(self, match) -> []:
        cursor = db.rethink.table("posts").filter(lambda doc:
                                                  doc['title'].match(r'{0}'.format(match))
                                                  ).run(db.conn)
        return db.cursor_to_array(cursor)

    def db_get_comments(self, post_id) -> []:
        cursor = db.rethink.table("comments").filter(lambda doc:
                                                  doc['post_id'].match(post_id)
                                                  ).run(db.conn)
        return db.cursor_to_array(cursor)
