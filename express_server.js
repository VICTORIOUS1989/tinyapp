const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.set("view engine", "ejs");
const PORT = 8080; // default port 8080

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls", (req, res) => {

  const templateVars = { urls: urlDatabase , username: req.cookies["username"]};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies["username"],
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

  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies["username"]};
  //console.log(templateVars);
  //console.log(req.params);
  res.render("urls_show", templateVars);
  });


  app.get("/register", (req, res) => {
    const templateVars = { username: req.cookies["username"]};

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

app.post("/login" ,(req, res) => {

  const username = req.body.username;
  res.cookie ('username', username);
  res.redirect('/urls');
  }); 

app.post("/logout" ,(req, res) => {
    res.clearCookie ('username');
    res.redirect('/urls');
    }); 

app.post('/register', (req, res) => {

  const name = req.body.name;
  res.cookie ('username', name);
  res.redirect('/urls');
  }); 

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});




function generateRandomString() {
  return Math.random().toString(36).substring(7);
}