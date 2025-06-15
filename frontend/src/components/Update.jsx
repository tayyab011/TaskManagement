import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Isempty } from '../helper/FromHelper';
import { updateTaskApi } from '../apiRequest/api';
import { setLoading } from '../redux/state-slice/settingSlice';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';

const Update = () => {
  const { loader } = useSelector((store) => store.settings);
  const dispatch=useDispatch()
    const location =useLocation();
    const data = location.state || {}
    const id=data._id
    const navigate =useNavigate()
  const [update,setUpdate]=useState({...data})
  const onChangeHandler=(e)=>{
 const {name,value}=e.target;
 setUpdate({...update,[name]:value})
  }
  const submitHandler=async (e)=>{
    e.preventDefault()
    dispatch(setLoading(true));
  await updateTaskApi(id, update, navigate);
  dispatch(setLoading(false));
  }

    return (
      <div class="flex justify-center items-center h-full  w-full bg-gradient-to-r py-20">
        {loader ? <FullscreenLoader /> : null}
        <div class="md:w-1/3 sm:w-1/2 w-full mx-5  grid gap-8">
          <section class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 rounded-3xl">
            <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
              <h1 class="md:text-5xl sm:text-3xl text-2xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                Update Task
              </h1>
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="my-12">
                  <input
                    name="title"
                    value={update.title}
                    className="input input-info w-full"
                    placeholder="Task Name"
                    disabled
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    value={update.description}
                    placeholder="Task Discription"
                    className="textarea textarea-info w-full"
                    disabled
                  ></textarea>
                </div>
                <select
                  defaultValue={update.status}
                  className="select select-info hover:bg-indigo-400 hover:font-extrabold cursor-pointer"
                  onChange={onChangeHandler}
                  name="status"
                  required
                >
                  <option>New</option>
                  <option>Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
                <button
                  class="w-1/3 cursor-pointer profileToggle p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:text-base hover:scale-105 transition-all transform duration-1000 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    );
};

export default Update;