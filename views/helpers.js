

const checkEmail = (users,email)=> {
  for ( let user in users) {
    if (users[user].email === email)
    return true
  }
  return false
};



const authenticateUser = (users, email, password) => {
  
  for ( let userId in users) {
    if (users[userId].email === email){
      if (users[userId].password === password) {
        return userId;
      }
    }
  }
  return false
}









module.exports = { authenticateUser, checkEmail }
