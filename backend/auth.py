from db import db
import json

db = db()


class auth:

    def __check_password(user_inputed_password, db_password) -> bool:
        if user_inputed_password == db_password :
            return True
        else:
            return False

    def sign_in(self, user_data):
        # Get user by username or email
        final_return = ""
        user = db.get_user(user_data["username_or_email"])
        if len(user) == 1 :
            user = user[0]
            # Check if passwords are correct
            if auth.__check_password(user_data["password"], user["password"]) :
                # create token
                new_token = db.update_token(user["id"])
                if new_token :
                    # return token + general user info
                    final_return = str(db.get_user_general_info(user_data["username_or_email"]))
                else:
                    final_return = "there was an error updating token"
            else:
                final_return = "username, email or password was incorrect"
        else:
            final_return = "no user with username or password"

        return final_return

    def check_token(self) -> bool:
        pass

    def sign_up(self) -> []:
        pass
