const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
const {  authenticateUser } = require('./helpers')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.set("view engine", "ejs");
const PORT = 8080; // default port 8080
/*
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}; */
const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "test" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "test" },
  kjG89r: { longURL: "https://www.lighthouse.ca", userID: "foufa" },
  ffffff: { longURL: "https://www.fayza.ca", userID: "fayza" }


  };

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  },
  "test": {
    id: "test", 
    email: "test@test.com", 
    password: "test"
  }
}

app.get("/urls", (req, res) => {
  const Userid = req.cookies['user_id']; 
  if (Userid) {
   const listUrls = urlsForUser (Userid);
   //console.log(listUrls);
  const templateVars = { urls: listUrls , user: users[Userid]};
  return res.render("urls_index", templateVars);
  }
  res.redirect("/login");
 
});

app.get("/urls/new", (req, res) => {
  const Userid = req.cookies['user_id']; 
  if (Userid) {
    const templateVars = { user: users[Userid] };
   return res.render("urls_new", templateVars);
  }
res.redirect("/login");

});

app.get("/u/:shortURL", (req, res) => {
  //console.log(req.params.shortURL);
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {

  shortURL = generateRandomString();
  longURL = req.body.longURL;
  const userID = req.cookies['user_id']; 
  urlDatabase[shortURL]= { longURL,userID };
  //console.log(urlDatabase);  // Log the POST request body to the console
  res.redirect(`/urls/${shortURL}`);         
});

app.get("/urls/:shortURL", (req, res) => {
  const Userid = req.cookies['user_id']; 

  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL].longURL, 
    user: users[Userid]
  };
  //console.log(templateVars);
  //console.log(req.params);
  res.render("urls_show", templateVars);
  });


  app.get("/register", (req, res) => {
    const Userid = req.cookies['user_id']; 

    const templateVars = { user: users[Userid]};

    res.render("register", templateVars);
    });
  


app.post("/urls/:shortURL/delete" ,(req, res) => {
  const Userid = req.cookies['user_id']; 
  if ( Userid && Userid === urlDatabase[req.params.shortURL].userID) {
    delete urlDatabase[req.params.shortURL];
    res.redirect("/urls");
  }
  else return res.sendStatus(403); 
  
  }); 

app.post("/urls/:shortURL" ,(req, res) => {
  const Userid = req.cookies['user_id']; 
  if ( Userid && Userid === urlDatabase[req.params.shortURL].userID) {
    urlDatabase[req.params.shortURL].longURL= req.body.longURL;
    res.redirect("/urls");
  }
  else return res.sendStatus(403); 

 
  }); 


  app.get("/login", (req, res) => {
    const Userid = req.cookies['user_id']; 
    const templateVars = { user: users[Userid]};
    res.render("login", templateVars);
    });
  
app.post("/login" ,(req, res) => {
  //const { email, password } = req.body
  const email = req.body.email;
  const password = req.body.password;

  const userId= authenticateUser(users, email, password);
  if (userId) { 

      res.cookie ('user_id', userId);
      res.redirect('/urls');
  }
 else   res.sendStatus(403); 

  }); 

app.post("/logout" ,(req, res) => {
    res.clearCookie ('user_id');
    res.redirect('/urls');
    }); 

app.post('/register', (req, res) => {
 
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
if ( email === "" || password === "" || checkEmail(email)=== true) {
  res.sendStatus(400); 
}
else {
  const user ={ id ,email,password };
  users[id]= user;
  console.log(users);
  res.cookie ('user_id', id);
  res.redirect('/urls');
}

  }); 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




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


const urlsForUser  = (userId)=> {
  let URLS ={};
for (KeyShorURL in urlDatabase) {
    if (urlDatabase[KeyShorURL].userID === userId) {
        URLS[KeyShorURL]= urlDatabase[KeyShorURL];
    }
}
return URLS;
};
