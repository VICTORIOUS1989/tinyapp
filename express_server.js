const express = require("express");
var cookieSession = require('cookie-session')
const bodyParser = require("body-parser");
//var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const {  generateRandomString, urlsForUser,authenticateUser, checkEmail,addNewUser ,createNewUrl,updateUrl } = require('./helpers');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//app.use(cookieParser())

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);

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
    name : "name1" ,
    email: "user@example.com", 
    password: bcrypt.hashSync("purple-monkey-dinosaur", 10)
  },
 "user2RandomID": {
    id: "user2RandomID", 
    name : "name2" ,
    email: "user2@example.com", 
    password:  bcrypt.hashSync("dishwasher-funk", 10)
  },
  "test": {
    id: "test", 
    name : "name3" ,
    email: "test@test.com", 
    password: bcrypt.hashSync("test", 10)
  }
}

app.get("/urls", (req, res) => {
  const Userid = req.session.user_id; 
  if (Userid) {
   const listUrls = urlsForUser (urlDatabase,Userid);
   //console.log(listUrls);
  const templateVars = { urls: listUrls , user: users[Userid]};
  return res.render("urls_index", templateVars);
  }
  res.redirect("/login");
 
});

app.get("/urls/new", (req, res) => {
  const Userid = req.session.user_id; 
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

 // shortURL = generateRandomString();
  const longURL = req.body.longURL;
  const userID = req.session.user_id; 
  const shortURL= createNewUrl(urlDatabase,longURL,userID);
  //console.log(urlDatabase);  // Log the POST request body to the console
  res.redirect(`/urls/${shortURL}`);         
});

app.get("/urls/:shortURL", (req, res) => {
  const Userid = req.session.user_id; 

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
    const Userid = req.session.user_id; 

    const templateVars = { user: users[Userid]};

    res.render("register", templateVars);
    });
  


app.post("/urls/:shortURL/delete" ,(req, res) => {
  const Userid = req.session.user_id; 
  if ( Userid && Userid === urlDatabase[req.params.shortURL].userID) {
    delete urlDatabase[req.params.shortURL];
    res.redirect("/urls");
  }
  else return res.sendStatus(403); 
  
  }); 

app.post("/urls/:shortURL" ,(req, res) => {
  const Userid = req.session.user_id; 
  const shortURL =req.params.shortURL;
  const longURL = req.body.longURL;

  if ( Userid && Userid === urlDatabase[req.params.shortURL].userID) {
    updateUrl(urlDatabase,shortURL,longURL);
    res.redirect("/urls");
  }
  else return res.sendStatus(403); 

 
  }); 


  app.get("/login", (req, res) => {
    const Userid = req.session.user_id; 
    const templateVars = { user: users[Userid]};
    res.render("login", templateVars);
    });
  
app.post("/login" ,(req, res) => {

  //const { email, password } = req.body
  const email = req.body.email;
  const password = req.body.password;


   userId= authenticateUser(users ,email, password);
  if (userId) { 

      req.session.user_id = userId;
      res.redirect('/urls');
  }
 else   res.sendStatus(403); 

  }); 

app.post("/logout" ,(req, res) => {
    req.session = null;
    res.redirect('/urls');
    }); 

app.post('/register', (req, res) => {
 
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const UserId = addNewUser( users ,name, email, hashedPassword );
if (UserId ) {
  req.session.user_id = UserId;
  res.redirect('/urls');
}
else {
  res.sendStatus(400); 

}

  }); 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


//generateRandomString, urlsForUser,authenticateUser, checkEmail,addNewUser ,createNewUrl,updateUrl