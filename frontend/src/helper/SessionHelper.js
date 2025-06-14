export const setToken=(token)=>{
localStorage.setItem("token",token)

}

export const getToken = () => {
 return  localStorage.getItem("token");
};

export const setUserDetails = (user) => {
   localStorage.setItem("user", JSON.stringify(user));
};

/* export const getUserDetails = () => {
    return JSON.parse(localStorage.setItem("user"))
}; */

export const getUserDetails = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setEmail = (email) => {
  localStorage.setItem("email", email);
};
export const setOtp = (otp) => {
  localStorage.setItem("otp", otp);
};

export const getEmail = () => {
  return localStorage.getItem("email");
};
export const getOtp = () => {
  return localStorage.getItem("otp");
};