let pushsub = {
    subscribe_to_localstorage: (ls_object, callback) => {
        setInterval(() => {
            callback(localStorage.getItem(ls_object))

        }, 500)
    }
}

export default pushsub