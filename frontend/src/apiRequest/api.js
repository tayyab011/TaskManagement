import axios from 'axios';
import { getEmail, getOtp, getToken, setEmail, setOtp, setToken, setUserDetails } from '../helper/SessionHelper';

import store from '../redux/store/store';
import { setCanceledTask, setCompletedTask, setNewTask, setProgressTask } from '../redux/state-slice/taskSlice';
import summary, { setSummary } from './../redux/state-slice/summarySlice';
import { setUser } from '../redux/state-slice/authSlice';
import { errortoast, successtoast } from '../helper/FromHelper';



const baseUrl = "https://taskmanagement-kdq0.onrender.com/api";
 const AxiosHeader = { headers: { "token": getToken() } };
export const registrationApi =async(reqbody)=>{
   try {
    const result = await axios.post(`${baseUrl}/register`, reqbody, {
      withCredentials: true,
    });
    if (result.data) {
     /*  alert(result.data.message); */
      successtoast(result.data.message);
    }
    return true;
   } catch (error) {
  /*   alert(error.response.result.data.message); */
  /*   alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false
   }
}
export const loginApi =async(reqbody)=>{
   try {
    const result = await axios.post(`${baseUrl}/login`, reqbody, {
      withCredentials: true,
    });
    if (result.data) {
    /*   alert(result.data.message); */
      successtoast(result.data.message);
      setToken(result.data.token)
      setUserDetails(result.data.user);
      store.dispatch(setUser(result.data.user));
      return true; 
      
    }
    
   } catch (error) {
  /*   alert(error.response.result.data.message); */
   /*  alert(error.response.data.message); */
   errortoast(error.response.data.message);
    return false
   }
}

export const logoutApi = async () => {
  try {
    const result = await axios.get(`${baseUrl}/logout` ,{
      withCredentials: true,
    });
    if (result.data) {
    /*   alert(result.data.message); */
      successtoast(result.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return true;
  } catch (error) {
    /*   alert(error.response.result.data.message); */
 /*    alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};



export const createTaskApi = async (reqbody) => {
  try {
    const result = await axios.post(`${baseUrl}/createTask`, reqbody, {
      withCredentials: true,
      AxiosHeader,
    });
    if (result.data) {
      /* alert(result.data.message); */
      successtoast(result.data.message);
    }
    return true;
  } catch (error) {
    /*   alert(error.response.result.data.message); */
    /* alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};


 export const TaskListByStatusApi = async (status) => {
  try {
    const result = await axios.get(
      `${baseUrl}/listStatusTask/${status}`,

      {
        AxiosHeader,
        withCredentials: true,
      }
    );
    if (result.data.success) {
  if (status === "New") {
    store.dispatch(setNewTask(result.data.tasks));
  } else if (status === "Completed") {
    store.dispatch(setCompletedTask(result.data.tasks));
  } else if (status === "Cancelled") {
    store.dispatch(setCanceledTask(result.data.tasks));
  } else if (status === "Progress") {
    store.dispatch(setProgressTask(result.data.tasks));
  }
    }
    return true;
  } catch (error) {
   
    alert(error.response.data.message);
    return false;
  }
};


export const summaryRequestApi = async () => {
  try {
    const result = await axios.get(`${baseUrl}/taskStatusCount`, {
      withCredentials: true,
      AxiosHeader,
    });
    if (result.data.success) {

      store.dispatch(setSummary(result.data.data));
    }
    return true;
  } catch (error) {
    /*   alert(error.response.result.data.message); */
  /*   alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};


export const deleteApi = async (id) => {
  try {
    await axios.delete(`${baseUrl}/deleteTask/${id}`, {
      withCredentials: true,
      AxiosHeader,
    });

    return true;
  } catch (error) {
    /*   alert(error.response.result.data.message); */
   /*  alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};

export const updateTaskApi = async (id, reqbody, navigate) => {
  try {
    const result = await axios.put(`${baseUrl}/updateTask/${id}`, reqbody, {
      withCredentials: true,
      AxiosHeader,
    });
    if (result.data.success) {
     /*  alert(result.data.message); */
      successtoast(result.data.message);
     /*  if (reqbody.status === "New") {
        navigate("/all");
      } else if (reqbody === "Completed") {
        navigate("/completed");
      } else if (reqbody === "Cancelled") {
        navigate("/cancled");
      } else if (reqbody === "Progress") {
        navigate("/progress");
      } */
        if (reqbody.status === "New") {
          navigate("/all");
        } else if (reqbody.status === "Completed") {
          navigate("/completed");
        } else if (reqbody.status === "Cancelled") {
          navigate("/cancled");
        } else if (reqbody.status === "Progress") {
          navigate("/progress");
        }
        return true;
    }
  } catch (error) {
    /*   alert(error.response.result.data.message); */
  /*   alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};


export const updateProfileApi = async (reqbody) => {
  try {
 const result=   await axios.put(`${baseUrl}/updateProfile`,reqbody, {
      withCredentials: true,
      AxiosHeader,
    });
    if (result.data) {
      setUserDetails(result.data.user);
     /*  alert(result.data.message); */
      successtoast(result.data.message);
      return result.data;
    }
  } catch (error) {
    /*   alert(error.response.result.data.message); */
    /* alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};




export const verifyEmailApi = async (email) => {
  try {
    const result = await axios.get(`${baseUrl}/verifyEmail/${email}`, {
      withCredentials: true,
    });
    if (result.data) {
      setEmail(result.data.email);
     /*  alert(result.data.message); */
      successtoast(result.data.message);
      return true;
    }
  } catch (error) {
    /*   alert(error.response.result.data.message); */
   /*  alert(error.response.data.message); */
   errortoast(error.response.data.message);
    return false;
  }
};



export const verifyotpApi = async (email,otp) => {
  
  try {
    const result = await axios.get(`${baseUrl}/verifyOtp/${email}/${otp}`, {
      withCredentials: true,
    });
    if (result.data) {
     /*  alert(result.data.message);  */
      successtoast(result.data.message);
      setOtp(result.data.otp);
      return true;
    }
  } catch (error) {
    /*   alert(error.response.result.data.message); */
   /*  alert(error.response.data.message); */
   errortoast(error.response.data.message);
    return false;
  }
};


export const verifypassApi = async (email,otp,pass) => {
  try {
    const result = await axios.post(
      `${baseUrl}/resetPass/${email}/${otp}/${pass}`,
      {
        withCredentials: true,
      }
    );
    if (result.data) {
    /* alert(result.data.message);  */
    successtoast(result.data.message);
      return true;
    }
  } catch (error) {
    /*   alert(error.response.result.data.message); */
    /* alert(error.response.data.message); */
    errortoast(error.response.data.message);
    return false;
  }
};