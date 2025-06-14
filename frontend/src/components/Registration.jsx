import React, { useState } from 'react';
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { registrationApi } from '../apiRequest/api';
import { Isempty, ValidateEmail } from '../helper/FromHelper';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, setLoading } from "../redux/state-slice/settingSlice";
const Registration = () => {
/* const [loading,setLoading]=useState(false) */
const { loader } = useSelector((store) => store.settings);
const navigate=useNavigate()
const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });
  const onChangeHandler=(e)=>{
  const {name,value}=e.target;
  setData({...data,[name]:value})
  }
  const onSubmitHandler = async(e) => {
    e.preventDefault()

if (Isempty(data.email)) {
  alert("enter your  email");
} else if (Isempty(data.firstName)) {
  alert("enter your  firstName");
} else if (Isempty(data.lastName)) {
  alert("enter your  lastName");
} else if (Isempty(data.mobile)) {
  alert("enter your  mobile");
} else if (Isempty(data.password)) {
  alert("enter your  password");
} else {
 /*  setLoading(true) */
 dispatch(setLoading(true));
 const result= await registrationApi(data);
 if (result===true) {
  navigate('/login')
 }
 /*  setLoading(false); */
 dispatch(setLoading(false));
}
   
  };
    return (
      <div>
        {loader ? <FullscreenLoader /> : null}
        <div class="flex justify-center items-center h-full w-full bg-gradient-to-r ">
          <div class="grid gap-8 ">
            <section
              id="back-div"
              class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 rounded-2xl"
            >
              <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
                <h1 class="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                  Registration
                </h1>
                <form onSubmit={onSubmitHandler} class="space-y-6">
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-lg dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      onChange={onChangeHandler}
                      name="email"
                      id="email"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-lg dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      onChange={onChangeHandler}
                      name="firstName"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="text"
                      placeholder="first name"
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-lg dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      onChange={onChangeHandler}
                      name="lastName"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="text"
                      placeholder="last name"
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-lg dark:text-gray-300">
                      Mobile
                    </label>
                    <input
                      onChange={onChangeHandler}
                      name="mobile"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="number"
                      placeholder="number"
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-lg dark:text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      onChange={onChangeHandler}
                      name="password"
                      id="password"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <Link
                    to="/sendotp"
                    class="text-blue-400 text-sm transition hover:underline"
                  >
                    Forget your password?
                  </Link>
                  <button
                    class="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
                <div class="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
                  <p>
                    Already have an account?
                    <Link
                      to="/login"
                      class="text-blue-400 transition hover:underline  via-purple-900 to-purple-500"
                    >
                      Login
                    </Link>
                  </p>
                </div>

                <div class="mt-4 text-center text-sm text-gray-500">
                  <p>
                    By signing in, you agree to our
                    <a
                      href="#"
                      class="text-blue-400 transition hover:underline"
                    >
                      Terms
                    </a>
                    and
                    <a
                      href="#"
                      class="text-blue-400 transition hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
};

export default Registration;