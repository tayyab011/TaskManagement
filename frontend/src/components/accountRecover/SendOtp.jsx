import React, { useState } from 'react';
import "../../App.css";
import { verifyEmailApi } from '../../apiRequest/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/state-slice/settingSlice';
import FullscreenLoader from '../MasterLayout.jsx/FullscreenLoader';
const SendOtp = () => {
  const { loader } = useSelector((store) => store.settings);
  const dispatch = useDispatch();
 const navigate=useNavigate()
    const [email,setEmail]=useState("")

    const verifyEmail=async(e)=>{
         e.preventDefault();
        dispatch(setLoading(true));
       const result=  await verifyEmailApi(email);
       result?navigate('/verifyotp'):null
       dispatch(setLoading(false));
         
    }
    return (
      <div class="flex justify-center items-center h-full w-full bg-gradient-to-r py-32">
        {loader ? <FullscreenLoader /> : null}
        <div class="grid gap-8 ">
          <section
            id="back-div"
            class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 rounded-2xl"
          >
            <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
              <form onSubmit={verifyEmail} class="space-y-6">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-lg dark:text-gray-300"
                  >
                    Your Email Address
                  </label>
                  <input
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <button
                  class="w-full cursor-pointer p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                >
                  next
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    );
};

export default SendOtp;