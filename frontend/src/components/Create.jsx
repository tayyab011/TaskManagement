import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTaskApi } from '../apiRequest/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/state-slice/settingSlice';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';

const Create = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { loader } = useSelector((store) => store.settings);
  const [create, setCreate] = useState({
    title: "",
    description: "",
    status: "New",
  });
  const onChangeHandler=(e)=>{
 const {name,value}=e.target
 setCreate({...create,[name]:value})
  }
  const onSubmitHandler=async(e)=>{
e.preventDefault();
  dispatch(setLoading(true));
 const res = await createTaskApi(create);
 res?navigate('/all'):(null)
 dispatch(setLoading(false));
  }
    return (
      <div class="flex justify-center items-center h-full  w-full bg-gradient-to-r">
        {loader ? <FullscreenLoader /> : null}
        <div class="md:w-1/2 sm:w-1/2 w-full bg-black rounded-3xl mx-5  grid gap-8">
          <section
            id="back-div"
            class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 rounded-3xl"
          >
            <div class="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2">
              <h1 class="md:text-5xl sm:text-3xl text-2xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                Create New
              </h1>
              <form onSubmit={onSubmitHandler} class="space-y-6">
                <div className="my-12">
                  <input
                    name="title"
                    onChange={onChangeHandler}
                    className="input input-info w-full"
                    type="text"
                    placeholder="Task Name"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Task Discription"
                    className="textarea textarea-info w-full"
                  ></textarea>
                </div>

                <button
                  class="w-1/3 cursor-pointer profileToggle p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:text-base hover:scale-105 transition-all transform duration-1000 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                >
                  Create
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    );
};

export default Create;