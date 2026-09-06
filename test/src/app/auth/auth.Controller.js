const authServce = require('./auth.servce');
const register = async (req, res, next) => {
    try {
        const {name,email,password} = req.body;
        //handel request goto servce 
      const createUser= await authServce.register(name,email,password)
        //send response
        res.status(201).json({message:"user is created successfully",success:true,data:createUser})

    } catch (error) {
        next(error)

    }
};

const login = async (req, res, next) => {
    try {
        const {email,password} = req.body;
        //handel request goto servce 
      const tocken= await authServce.register(email,password);
        //send response
        res.status(201).json({message:"user is login successfully",success:true,data:tocken});

    } catch (error) {
        next(error)

    }
};

const logout = async (req, res) => { 
    try {
         const authorization = req.headers.authorization;
          if (!authorization) {
             return res.status(401).json({ message: "Authorization header is required", success: false }); 
            }
             const token = authorization;
              const { email } = req.body;
               const result = await authServce.logout(email, token);
                return res.status(200).json(result);
             } catch (error)
              { return res.status(401).json({ message: error.message, success: false }); } };

const send_otp = async (req, res, next) => {
    try {
        //handel request goto servce 
        //send response

    } catch (error) {
        next(error)

    }
};

const verify_otp = async (req, res, next) => {
    try {
        //handel request goto servce 
        //send response

    } catch (error) {
        next(error)

    }
};

const reset_password = async (req, res, next) => {
    try {
        //handel request goto servce 
        //send response

    } catch (error) {
        next(error)

    }
};

module.exports = {
    register,
    login,
    logout,
    send_otp,
    verify_otp,
    reset_password
};