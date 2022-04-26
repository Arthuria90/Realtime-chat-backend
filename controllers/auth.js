const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const router = require('../routes/auth');


// Create user
const createUser = async (req, res = response) => {
    // extract email
    const {email, password} = req.body;

    try{
        // Database connection
        const emailExist = await User.findOne({email: email});

        if(emailExist){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            });
        }
        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);
        
        // Response
        res.json({
            ok: true,
            user,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the administrator'
        });
    }    
}

// Login user
const loginUser = async (req, res = response) =>{
    // extract email
    const {email, password} = req.body;
    try{
        // Database connection
        // ---------------
        
        // Validate email
       const userDB = await User.findOne({email});
       if(!userDB){
           return res.status(404).json({
            ok: false,
            msg: 'Email not found'
           });
       }
       
       // Validate password
       const validPassword = bcrypt.compareSync(password, userDB.password);
       if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Invalid credentials'
           });
       }


       // Everything was right so we generate JWT
       const token = await generateJWT(userDB.id);

       //Response
       res.json({
        ok: true,
        user: userDB,
        token
    });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the administrator'
        });
    }
}

// Renew token
const renewToken = async (req, res =response) =>{
    const uid = req.uid;

    // Generate JWT
    const token = await generateJWT(uid);

    // Find user by UID
    const userDB = await User.findById(uid);

    // Response
    res.json({
        ok: true,
        user: userDB,
        token
    });
}
module.exports = {
    createUser,
    loginUser,
    renewToken
}