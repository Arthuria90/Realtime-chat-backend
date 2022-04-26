const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) =>{
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '48h'
        }, (err, token)=>{
            if(err){
                // could not create token
                reject('JWT could not be generated');
            }else{
                // create token
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}