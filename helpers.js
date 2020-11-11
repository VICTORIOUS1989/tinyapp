

const checkEmail = (email)=> {
  for ( let user in users) {
    if (users[user].email === email)
    return true
  }
  return false
};



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









module.exports = { authenticateUser, checkEmail }
