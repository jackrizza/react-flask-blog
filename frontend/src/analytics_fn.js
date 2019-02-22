function getUserIP(callback) {
    fetch("https://geoip-db.com/json/")
        .then(res => res.json())
        .then((e) => {
            callback(e)
        })
}

export default getUserIP;