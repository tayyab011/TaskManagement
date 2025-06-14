import toast from "react-hot-toast";

let emailRegx = /\S+@\S+\.\S+/;
const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
export const Isempty = (value) => {
  return value.length === 0;
};

export const ValidateEmail = (email) => {
  // More strict email regex pattern
  
  return !re.test(String(email).toLowerCase());
};

export const ValidatePhone = (phone) => {
  // Basic phone validation - accepts:
  // 10 digits (1234567890)
  // 3-3-4 digits (123-456-7890 or 123.456.7890)
  // 3-4 digits (123-4567)
  // Optional + at start for country code
  const re =
    /^\+?(\d{1,4})?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return re.test(phone);
};

export const getbase64 =(file)=>{
  return new Promise((resolve,reject)=>{
      let reader =new FileReader()
      reader.readAsDataURL(file)
      reader.onload=()=>{resolve(reader.result)}
      reader.onerror = (err)=>{reject(err)}
  })
  }
  
  export const successtoast =(msg)=>{
    toast.success(msg);
  }
  export const errortoast =(msg)=>{
    toast.error(msg);
  }


  

  