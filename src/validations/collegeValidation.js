const isValid = function (name) {
    if (typeof name == undefined || typeof name == null) return false;
    if (typeof name == "string" && name.trim().length == 0) return false;
    else if (typeof name == "string") return true;
  };

const isValidUrl = function(url){
    let re = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
    if(re.test(url)){
        return true;
    }
    return false;
}
  module.exports = {isValid, isValidUrl}