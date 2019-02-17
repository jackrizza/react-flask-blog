from db import db
import time
import json

db = db()


class auth:

    def __check_password(user_inputed_password, db_password) -> bool:
        if user_inputed_password == db_password:
            return True
        else:
            return False

    def sign_in(self, user_data) -> object:
        # Get user by username or email
        print(user_data)
        final_return = ""
        user = db.get_user(user_data["username_or_email"])
        if len(user) == 1:
            # get first (hopefully only) user in array
            user = user[0]
            # Check if passwords are correct
            if auth.__check_password(user_data["password"], user["password"]):
                # create token
                new_token = db.update_token(user["id"])
                if new_token:
                    # return token + general user info
                    final_return = str(db.get_user_general_info(user_data["username_or_email"])[0])
                else:
                    final_return = '{"type" : "error","response" : "there was an error updating token"}'
            else:
                final_return = '{"type" : "error","response" : "username, email or password was incorrect"}'
        else:
            final_return = '{"type" : "error","response" : "no user with username or password"}'

        return final_return

    def check_token(self, token) -> bool:
        final_return = False
        # check if user is associated with token
        if db.check_token_association(token):
            # check if token is not older than 2 days
            if (int(time.time()) - int(token[0:10])) < 172800:
                final_return = True
            else:
                final_return = False
        else:
            final_return = False

        return final_return

    def sign_up(self) -> bool:
        pass
