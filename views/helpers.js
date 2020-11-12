


function generateRandomString() {
  return Math.random().toString(36).substring(7);
}


const checkEmail = (email)=> {
  for ( let user in users) {
    if (users[user].email === email)
    return true
  }
  return false
};


const urlsForUser  = (urlDatabase,userId)=> {
  let URLS ={};
for (KeyShorURL in urlDatabase) {
    if (urlDatabase[KeyShorURL].userID === userId) {
        URLS[KeyShorURL]= urlDatabase[KeyShorURL];
    }
}
return URLS;
};



const authenticateUser = (users, email, password) => {

  for ( let userId in users) {      
      if (users[userId].email === email && bcrypt.compareSync(password,users[userId].password) ) {      
        return userId;      
    }
  }
  return false
}


const addNewUser = (users ,name , email , hashedPassword) => {

if ( email === "" || hashedPassword === "" || checkEmail(email)=== true) {
  return false;
}
else {
  const userId= generateRandomString ();
  const NewUser ={ id :userId ,name ,email,password : hashedPassword };
  users[userId]= NewUser;
 return userId;
}
  }


  const createNewUrl = (urlDatabase ,longURL, userID) => {
  shortURL = generateRandomString();
  urlDatabase[shortURL]= { longURL,userID };
  return shortURL;
};

const updateUrl = (urlDatabase,shortURL,longURL) => {
  urlDatabase[shortURL].longURL= longURL;

  return true;
};






module.exports = { generateRandomString, urlsForUser,authenticateUser, checkEmail,addNewUser ,createNewUrl,updateUrl}
