import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getbase64 } from '../helper/FromHelper';
import { updateProfileApi } from '../apiRequest/api';
import { setUser } from '../redux/state-slice/authSlice';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from "../assets/sdc.jpg";
import { setLoading } from '../redux/state-slice/settingSlice';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';
const Profile = () => {
  const { loader } = useSelector((store) => store.settings);

  const {user}=useSelector(store=>store.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
    password: user.password,
    photo: user.photo,
  });
  let [image, setimg] = useState(null);
  let getimg = async (file) => {
    let result = await getbase64(file.target.files[0]);
    setimg(result);
    setProfile((prev) => ({ ...prev, photo: result }));
  };
  let onChangeHandler= (e) => {
   const {name,value}=e.target;
   setProfile({...profile,[name]:value})
  };

  
  const submitHandler = async (e) => {
    e.preventDefault();
      dispatch(setLoading(true));
    const result = await updateProfileApi( profile);
    if (result) {
      dispatch(setUser(result.user));
    navigate('/profile')
    dispatch(setLoading(false));
    }
  };
    return (
      <div>
        <div class="flex justify-center items-center h-full  w-full bg-gradient-to-r">
          {loader ? <FullscreenLoader /> : null}
          <form onSubmit={submitHandler} class="space-y-6 mx-4">
            <div className="flex justify-center gap-5 my-12">
              <img
                src={profile.photo ? profile.photo : defaultAvatar}
                className="w-42 h-42 rounded-full border-4 border-blue-500 "
              />
            </div>
            <div className="flex gap-5 my-12">
              <input
                name="firstName"
                value={profile.firstName}
                onChange={onChangeHandler}
                className="input input-info w-full"
                type="text"
                placeholder="First Name"
              />
              <input
                name="lastName"
                value={profile.lastName}
                onChange={onChangeHandler}
                className="input input-info w-full"
                type="text"
                placeholder="last Name"
              />
            </div>
            <div className="flex gap-5 my-12">
              <input
                name="email"
                value={profile.email}
                onChange={onChangeHandler}
                className="input input-info w-full"
                type="email"
                placeholder="email"
              />
              <input
                name="mobile"
                value={profile.mobile}
                onChange={onChangeHandler}
                className="input input-info w-full"
                type="number"
                placeholder="mobile"
              />
            </div>
            <div className="flex gap-5 my-12">
              <input
                name="password"
                value={profile.password}
                onChange={onChangeHandler}
                className="input input-info w-full"
                type="password"
                placeholder="password"
              />

              <input
                name="photo"
                accept="image/*"
                className="input input-info w-full cursor-pointer"
                type="file"
                onChange={getimg}
                placeholder="upload photo"
              />
            </div>
            <button
              class="w-1/3 cursor-pointer profileToggle p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:text-base hover:scale-105 transition-all transform duration-1000 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    );
};

export default Profile;