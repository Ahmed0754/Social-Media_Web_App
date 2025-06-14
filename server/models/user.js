const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, unique:true, required:true},
    //email: {type: String, required:true},
    password: String,
    followers: [String],
    following:[String]
    
})

// create model of schema
const User = mongoose.model("User", userSchema);


//create CRUD functions on model

async function register(username, password){
  const user = await getUser(username);
  if(user) throw Error('Username is already in use');

  const newUser = await User.create({
    username: username,
    password: password
  });
  return user
}

// read a user
async function login(username, password){
    const user =  await getUser(username);
    if(!user) throw Error('Userc not found!')
    if(user.password != password) throw Error("wronghg password")
}

// update
async function updatePassword(id, password){
    const user = await User.updateOne({ _id: id }, { $set: { password: password } });
    return user;
}



//delete
async function deleteUser(id){
    await User.deleteOne({"_id": id})

}


// utility fucntion
async function getUser(username) {
    return await User.findOne({"username": username})
}

// export all function we want to acces in route
module.exports = {register,login, updatePassword, deleteUser}