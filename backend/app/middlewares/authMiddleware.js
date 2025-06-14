import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {
    const token = req.cookies.token; 
  let decoded = DecodeToken(token);

  if (decoded === null) {
    res.status(401).send({
      status: "failed",
      message: "dont have an account? please create an account ",
    });
  } else {
    /*   token theke indentify  */
    let email = decoded.email;
    let user_id = decoded.user_id; 
    req.headers.email = email;
     req.headers.user_id = user_id; 
    
  
    next();
  }
};
