const jwt = require("jsonwebtoken");

const authmiddleware = (req,res,next) => {
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            status : false,
            message : "you are not in database"
        })
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = { id: decode.userId, name: decode.userName };
        next();
    }
    catch(e){
        console.log(e);
    }
    
}

module.exports = authmiddleware;