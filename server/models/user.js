const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: String,
    followers: [String],
    following: [String]
});

const User = mongoose.model("User", userSchema);

// REGISTER
async function register(username, password) {
    const user = await getUser(username);
    if (user) throw Error('Username is already in use');

    const newUser = await User.create({ username, password });
    return newUser;
}

// LOGIN
async function login(username, password) {
    const user = await getUser(username);
    if (!user) throw Error('User not found!');
    if (user.password !== password) throw Error("Wrong password");
    return user;
}

// UPDATE PASSWORD
async function updatePassword(id, password) {
    const user = await User.updateOne({ _id: id }, { $set: { password } });
    return user;
}

// DELETE
async function deleteUser(id) {
    return await User.deleteOne({ _id: id });
}

// UTILITY
async function getUser(username) {
    return await User.findOne({ username });
}

module.exports = { register, login, updatePassword, deleteUser };
