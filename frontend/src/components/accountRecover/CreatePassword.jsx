import React, { useState } from 'react';
import { Isempty } from '../../helper/FromHelper';
import { verifypassApi } from '../../apiRequest/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { getEmail, getOtp } from '../../helper/SessionHelper';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/state-slice/settingSlice';
import FullscreenLoader from '../MasterLayout.jsx/FullscreenLoader';

const CreatePassword = () => {
  const { loader } = useSelector((store) => store.settings);
  const dispatch = useDispatch();
  const navigate=useNavigate()
const [Password, setPassword] = useState({
  password: "",
  confirmpassword: "",
});

const onChangeHandler=(e)=>{
  const {name,value}=e.target;
  setPassword({ ...Password, [name]: value });

}
const submitHandler = async (e) => {
 e.preventDefault();
 if (Isempty(Password.password)) {
   alert("enter your updated password");
 } else if (Isempty(Password.confirmpassword)) {
   alert("enter your confirmed password");
 } else if (Password.confirmpassword != Password.password) {
   alert("password doesnt match");
 }else{
     dispatch(setLoading(true));
 const result = await verifypassApi(getEmail(),getOtp(), Password.password); //sudhu password jokhn pathaitesialm tokhn reqbody jacchilo bt jokhn Passwordword.password disi tokhn updated pass jacchilo
 result?navigate('/login'):null
 dispatch(setLoading(false));
 }
};
    return (
      <div>
        <div class="flex justify-center items-center h-full w-full bg-gradient-to-r py-32">
          {loader ? <FullscreenLoader /> : null}
          <div class="grid gap-8 ">
            <section
              id="back-div"
              class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 rounded-2xl"
            >
              <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
                <form onSubmit={submitHandler} class="space-y-4 px-12">
                  {/*   <div>
                    <label
                      for="email"
                      class="block mb-2 text-lg dark:text-gray-300"
                    >
                      Your Email Address
                    </label>
                    <input
                      name="email"
                      id="email"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="email"
                      placeholder="Email"
                    />
                  </div> */}
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-lg dark:text-gray-300"
                    >
                      New Password
                    </label>
                    <input
                      value={Password.password}
                      onChange={onChangeHandler}
                      name="password"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="password"
                      placeholder=" New Password"
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-lg dark:text-gray-300"
                    >
                      Confirm Password
                    </label>
                    <input
                      onChange={onChangeHandler}
                      name="confirmpassword"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                      type="password"
                      placeholder="Confirm Password"
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
      </div>
    );
};

export default CreatePassword;