import env from "./env";
import keys from "./lib/key"

let auth = {
    user: _ => {
        return {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token"),
            type : localStorage.getItem("type")
        }
    },
    isSignedIn: (callback = null) => {
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
                    console.log(res)
                    if (res.type === "sucsess") {
                        auth.canBeHere()
                        if (callback) {
                            callback(true)
                        }
                    } else if (res.type === "error") {
                        auth.signOut();
                        if (callback) {
                            callback(false)
                        } else {
                            window.location = "/"
                        }


                    } else {
                        window.location = "/"
                    }
                })
        })
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
        let url = "/" + window.location.href.split("/")[3];

        let userTypes = {
            NOT_SIGNED_IN: ["/", `/post`],
            AUTHOR: ["/", `/post`, "/dashboard", "/createpost", "/editprofile"],
            BASIC_USER: ["/", `/post`, "/editprofile"]
        }
        console.log(userTypes.BASIC_USER)
        switch (auth.user().type) {
            case "author":
                if (!userTypes.AUTHOR.includes(url)) {
                    window.location = "/";
                } else {
                    return;
                }
                break;
            case "basic_user":
                if (!userTypes.BASIC_USER.includes(url)) {
                    window.location = "/";
                } else {
                    return;
                }
                break;
            case null:
                if (!userTypes.NOT_SIGNED_IN.includes(url)) {
                    window.location = "/";
                } else {
                    return;
                }
                break;
            default:
                if (!userTypes.NOT_SIGNED_IN.contains(url)) {
                    window.location = "/";
                } else {
                    return;
                }
                break;

        }
    }
};

export default auth;