import SHA256 from 'crypto-js/sha256'

let encrypt = {
    sha: (e) => {
        return SHA256(e).toString()
    },
    get_current_time: () => {
        return (new Date()).valueOf().toString();
    },
    get_random: () => {
        return Math.random().toString();
    },
    create_new_set: (e) => {
        let f = encrypt.sha((encrypt.get_current_time() + encrypt.get_random()));
        return {
            "salt": f,
            "password": encrypt.sha(f + e)
        }
    },
    reproduce_set: (e, f) => {
        return {
            "password": encrypt.sha(f + e)
        }
    }


}

export default encrypt;