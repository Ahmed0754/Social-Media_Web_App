// import libraries
const express = require("express")
const User = require('../models/user');// access functions in user model
const router = express.Router();

router
    .post('/login', async(req, res) =>{
        try{
            const user = await User.login(req.body.username, req.body.password);
            res.send({...user, password: undefined});
        }catch(error){
            res.status(401).send({message: error.message});
        }
        
    })

    .post ('/register', async (req, res) =>{
        try{
            const user = await User.register(req.body.username, req.body.password)
            res.send({...user,password: undefined})

        } catch(error){
            res.status(401).send({message: error.message});

        }
    })


    .put ('/update', async(req,res) => {
        try{
            const user = await User.updatePassword(req.body.id, req.body.password);
            res.send({...user, password: undefined});

        }catch(error){
            res.status(401).send({message: error.message});

        }
    })

    .delete('/delete', async(req,res) => {
        try{
            await User.deleteUser(req.body.id);
            res.send({success: "Account deleted"});

        }catch(error){
                res.status(401).send({message: error.message});
        
        }
    })

    router.post('/follow', async (req, res) => {
        try {
            const { followerId, followeeId } = req.body;
            const result = await User.followUser(followerId, followeeId);
            res.send(result);
        }   catch (error) {
            res.status(400).send({ message: error.message });
        }
    });
      
      router.post('/unfollow', async (req, res) => {
        try {
          const { followerId, followeeId } = req.body;
          const result = await User.unfollowUser(followerId, followeeId);
          res.send(result);
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
    });
      

    module.exports = router;

