import env from "./env";
import keys from "./lib/key"

let auth = {
    user: _ => {
        return {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        }
    },
    isSignedIn: () => {
        return new Promise((resolve, reject) => {
            fetch(`${env.getCurrent().api}checktoken`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cache: "force-cache",
                method: "POST",
                body: JSON.stringify({
                    "client_api_key": keys.blog_post_api_key,
                    "token": auth.user().token
                })

            }).then(res => {
                res.json()
                    .then(res => {
                        res = JSON.parse(res)
                        if (res.type === "sucsess") {
                            resolve({
                                isSignedIn: true
                            })
                        } else if (res.type === "error") {
                            resolve({
                                isSignedIn: false
                            })
                            auth.signOut();
                        } else {
                            reject("Error")
                        }
                    })
            })
        });
    },
    signOut: () => {
        if ((localStorage.getItem("user-signed-in") === "false" ? false : true)) {
            localStorage.clear()
            window.location.reload();
        }

    },
    isAValidUser: () => {

    },
    canBeHere: () => {
        let url = window.location;
        let userTypes = {
            "NOT_SIGNED_IN": ["/"],
            "AUTHOR": ["/", "/dashboard/*", "/createpost", "/editprofile"],
            "BASIC_USER": ["/", "/editprofile"]
        }

    }
};

export default auth;