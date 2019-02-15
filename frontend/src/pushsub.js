let pushsub = {
    subscribe_to_localstorage: (ls_object, callback) => {
        setInterval(() => {
            let old_version = ""
            if(old_version !== localStorage.getItem(ls_object)){
                old_version = localStorage.getItem(ls_object)
                callback(localStorage.getItem(ls_object))
            }
            
        }, 500)
    }
}

export default pushsub