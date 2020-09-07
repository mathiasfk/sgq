function getUsername(){
    let username = "";
    if(localStorage.getItem('user')){
        username = JSON.parse(localStorage.getItem('user')).username;
    }
    return username;
}

function getGroup(){
    let group = "";
    let user;
    if(localStorage.getItem('user')){
        user = JSON.parse(localStorage.getItem('user')).username;
        group = user == "jose.augusto" ? "operario" : "admin";
    }
    return group;
}

module.exports = {
    getUsername,
    getGroup
};