import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    // console.log(req.headers);
    if(!token){
        return res.json({success:false,message:"Not authorized, please login"});
    }
    try {
        const token_decoed = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decoed.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"server error"});
    }
}

export default authMiddleware;