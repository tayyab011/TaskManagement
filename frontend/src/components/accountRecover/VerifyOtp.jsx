import React, { useState } from 'react';
import { verifyotpApi } from '../../apiRequest/api';
import { getEmail } from '../../helper/SessionHelper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/state-slice/settingSlice';
import FullscreenLoader from '../MasterLayout.jsx/FullscreenLoader';

const VerifyOtp = () => {
  const { loader } = useSelector((store) => store.settings);
  const dispatch = useDispatch();
const[otp,setOtp]=useState("")
const navigate = useNavigate();

  const submitHandler = async(e)=>{
e.preventDefault()

if (otp.length === 6) {
     dispatch(setLoading(true));
const result= await verifyotpApi(getEmail(), otp);
result? navigate("/createpassword"):null
   dispatch(setLoading(false));
}else{
  alert("please enter 6 digit code");
}
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
              <form onSubmit={submitHandler} class="space-y-6">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-2xl dark:text-gray-300"
                  >
                    Otp Vrification
                  </label>
                  <p className="mb-5 font-extralight text-xs">
                    a 6 Digit verification code has been sent to your email
                    address
                  </p>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    placeholder="enter 6 digit otp "
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

export default VerifyOtp;