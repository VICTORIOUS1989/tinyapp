const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
const {  authenticateUser } = require('./helpers')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.set("view engine", "ejs");
const PORT = 8080; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
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
  const templateVars = { urls: urlDatabase , user: users[Userid]};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const Userid = req.cookies['user_id']; 
  const templateVars = {
    user: users[Userid]
  };
  res.render("urls_new", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  //console.log(req.params.shortURL);
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {

  shortURL = generateRandomString();
  longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  //console.log(req.body);  // Log the POST request body to the console
  res.redirect(`/urls/${shortURL}`);         
});

app.get("/urls/:shortURL", (req, res) => {
  const Userid = req.cookies['user_id']; 

  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL], 
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
 
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
 
  }); 

app.post("/urls/:shortURL" ,(req, res) => {
  urlDatabase[req.params.shortURL]= req.body.longURL;
  res.redirect("/urls");
 
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
