

const checkEmail = (users,email)=> {
  for ( let user in users) {
    if (users[user].email === email)
    return true
  }
  return false
};



const authenticateUser = (users, email, password) => {

  //const hashedPassword = bcrypt.hashSync(password, 10);
  //bcrypt.compareSync(password, users[userId].password); // returns true
 // let password = bcrypt.compareSync(req.body.password, users[userID]["password"]);
 //console.log(users[userId].password);

  for ( let userId in users) {      
      if (users[userId].email === email && bcrypt.compareSync(password,users[userId].password) ) {

     // if (users[userId].password === password) {
      
        return userId;
      
    }
  }
  return false
}



/*
const authenticateUser = (users, email, password) => {
  for ( let user in users) {
    if (users[user].email === email){
      if (users[user].password === password) {
        return user;
      }
    }
  }
  return false
}

*/







module.exports = { authenticateUser, checkEmail }
