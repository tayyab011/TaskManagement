import React, { useEffect, useState } from 'react';
import '../App.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Isempty } from '../helper/FromHelper';
import { setLoading } from '../redux/state-slice/settingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../apiRequest/api';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';

const Login = () => {
  const { loader } = useSelector((store) => store.settings);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [data, setData] = useState({
      email: "",
      password: "",
    });
    const onChangeHandler = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
     const onSubmitHandler = async(e) => {
        e.preventDefault()
    
    if (Isempty(data.email)) {
      alert("enter your  email");
    } else if (Isempty(data.password)) {
      alert("enter your  password");
    } else {
     /*  setLoading(true) */
     dispatch(setLoading(true));
     const result = await loginApi(data);
     
     if (result) {
      
      navigate('/')
     }
     /*  setLoading(false); */
     dispatch(setLoading(false));
    }
       
      };

    
    return (
      <div>
        {loader ? <FullscreenLoader /> : null}

        <div class="flex justify-center items-center h-full w-full ">
          <div class="grid gap-8 bg-black rounded-3xl mx-4">
            <section
              id="back-div"
              class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 rounded-3xl"
            >
              <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
                <h1 class="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                  Log in
                </h1>
                <form
                  onSubmit={onSubmitHandler}
                  method="post"
                  class="space-y-6"
                >
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
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="email"
                      placeholder="Email"
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
                    LOG IN
                  </button>
                </form>
                <div class="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
                  <p>
                    Don't have an account?
                    <Link
                      to="/registration"
                      class="text-blue-400 transition hover:underline  via-purple-900 to-purple-500"
                    >
                      Sign Up
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

export default Login;