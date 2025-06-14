
import { userModel } from "../models/userModel.js";

import { EncodeToken } from './../utility/tokenUtility.js';
import { otpModel } from './../models/otpModel.js';
import EmailSend from "../utility/emailUtility.js";

export const register =async(req,res)=>{

    try {
        const reqBody = req.body;
  
       const existingData = await userModel.findOne({email: reqBody.email});
       if (existingData) {
        return res.status(400).json({
          success: false,
          message: "User Exists",
        });
       }
        await userModel.create(reqBody);
        res.status(200).json({
          success: true,
          message: "User Register SuccessFully",
        });
        
    } catch (error) {
        return res.status(400).json({
            message:"somthing went wrong",
            error:error.toString()
        })
    }
}

export const login = async (req, res) => {
  try {
    const reqBody = req.body;

    if ( !reqBody.email || !reqBody.password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Data",
      });
    }
    const user = await userModel.findOne({
      $or:[{email:reqBody.email, password:reqBody.password}]
    });
   /*  const existingData = await otpModel.findOne({
      $or: [{ email: email, otp: otp, status: updateStatus }],
    }); */
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password ",
      });
    }

    const token = EncodeToken({ email: user.email ,_id:user._id});
    const cookiOption = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    };
    res.cookie('token',token, cookiOption)
    
    res.status(200).json({
      token,
      success: true,
      user,
      message: "User Login SuccessFully",
    });

  } catch (error) {
    return res.status(400).json({
      message: "somthing went wrong",
      error: error.toString(),
    });
  }
};

 /* export const getMyProfile = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    const user = await userModel.findById({ _id: user_id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

  };  */
  export const updateProfile = async (req, res) => {
    try {
      const email =req.headers.email
   
      const reqBody = req.body;
   
   
      await userModel.updateOne({ email: email}, reqBody);

      return res.status(200).json({
        success: true,
         user: reqBody,
        message: "User profile updated successfully",
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({
        success: false,
        message: "Data update failed",
      });
    }
  };
  







  export const logout = async (req, res) => {
    try {
     const email = req.headers.email;
    
    
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0),
      }); 

      // Optional: Destroy session if using server-side sessions
      // if (req.session) req.session.destroy();

      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Logout failed",
        error: error.message,
      });
    }
  };



   export const verifyEmail = async (req, res) => {
    try {
      const email = req.params.email;
    
  const emailExist =   await userModel.findOne({email})
  let otpcode=Math.floor(100000 +Math.random() * 900000).toString()
  if (emailExist) {
    const createotp=   await otpModel.create({ email: email, otp: otpcode });
    const sendEmail = await EmailSend(email, `Your pin code is = ${otpcode}`, "Task Manager Pin Varification");
    res.status(200).json({
      success: true,
      email,
      message: "mail sent successfull",
    });
  }else{
    res.status(400).json({
      success: false,
      message: "no user found",
    });
  }
     
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " failed",
        error: error.message,
      });
    }
  }; 
 

  export const verifyOtp = async (req, res) => {
    try {
      const email = req.params.email;
      const otp = req.params.otp;
      const status = 0;
      const updateStatus = 1;

      const existingData = await otpModel.findOne({
        $or: [{ email: email, otp: otp, status: status }],
      });
      if (existingData) {
  /*  const otpUpdate  =  await userModel.updateOne(
          { email, otp, status },
          { $set: { status: updateStatus } }
        ); */
        const otpUpdate = await otpModel.updateOne(
          { email, otp, status },
          { $set: { status: updateStatus } }
        );
        res.status(200).json({
          success: true,
          otp,
          message: "otpUpdate successfull",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "invalid code",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " failed",
        error: error.message,
      });
    }
  }; 
 

  export const resetPass = async (req, res) => {
    try {
      const email = req.params.email;
      const otp = req.params.otp;
      const password = req.params.password;

      const updateStatus = 1;

      const existingData = await otpModel.findOne({
        $or: [{ email: email, otp: otp, status: updateStatus }],
      });
      if (existingData) {
        const otpUpdate = await userModel.updateOne(
          { email},
          { $set: { password: password } }
        );
        res.status(200).json({
          success: true,
          otpUpdate,
          message: "password Update successfull",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "invalid code",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " failed",
        error: error.message,
      });
    }
  }; 
 