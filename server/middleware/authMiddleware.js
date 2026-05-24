const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protectRoutes = async (req,res,next)=>{
    // req: -> Incoming request.
    // res: -> Send response:
    // next: -> Move to next function
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded  = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)

            req.user = await User.findById(decoded.id).select("-password")

            next()
            // Minus sign (-) means:Exclude this field

        }catch(error){
            return res.status(401).json({
                message:"Not authorized"
            });
        }
    }

    if(!token){
        return res.status(401).json({
            message:"No token"
        });
    }
};

module.exports = protectRoutes