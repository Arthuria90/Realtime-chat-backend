const { response } = require('express');
const User = require('../models/user');

const getUsers = async (req, res = response) => {
    
    const from = Number(req.query.from) || 0;
    
    // minus (-) in sort means desc
    // ne: not exist
    const users = await User
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(from)
        .limit(20);

    res.json({
        ok: true,
        users: users
    });

    // Find user by UID
    //const userDB = await User.findById(uid);
}

module.exports = {
    getUsers
}