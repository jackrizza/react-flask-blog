let env = {
    enviroment: {
        production: {
            api: "/api/"
        },
        development: {
            api: "http://localhost:5000/"
        }
    },
    getCurrent: _ => {
        return env.enviroment.development
    }
}

export default env;