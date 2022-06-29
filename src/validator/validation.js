//function for verfying the input

const isValidRequest = function(data){
  if(Object.keys(data).length == 0){
    return false
  }
  return true
}

//function for verifying the name using regex
const isValidName = function(name){
  let pattern = /^[a-zA-Z.]{2,10}$/
  if(pattern.test(name)){
    return true
  }
  return false
}

//function for verifying intern name
const isValidIntern= function(name){
  let pattern = /^[a-zA-Z ]{4,20}$/
  if(pattern.test(name)){
    return true
  }
  return false
}


//function for verifying string 
const isValid = function (name) {
    if (typeof name == undefined || typeof name == null) return false;
    if (typeof name == "string" && name.trim().length == 0) return false;
    else if (typeof name == "string"){
          
          return true;
    }
  };


  //function for verifying link
const isValidUrl = function(url){
    let re = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
    if(re.test(url)){
        return true;
    }
    return false;
}


//function for verifying email
const isValidMail = function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};


//function for verifying mobile number
const isValidMobile = function(mobile){
  return  /^[6-9]\d{9}$/.test(mobile);
};


module.exports = {isValid,
                  isValidUrl,
                  isValidName,
                  isValidRequest, 
                  isValidMail, 
                  isValidMobile,
                  isValidIntern}