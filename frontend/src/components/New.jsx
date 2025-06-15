import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { TaskListByStatusApi } from '../apiRequest/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/state-slice/settingSlice';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';
import { deleteAlert } from '../helper/DeleteAlert';
import { useNavigate } from 'react-router-dom';
import nodata from "../assets/2953962.jpg";
const New = () => {
  const { loader } = useSelector((store) => store.settings);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  useEffect(()=>{
 (async()=>{
   dispatch(setLoading(true));
 await TaskListByStatusApi("New");
  dispatch(setLoading(false));

 })()
  },[])
  const { New } = useSelector((store) => store.task);
    return (
      <div className="container mx-auto ">
        {loader ? <FullscreenLoader /> : null}
        {/* <div className=" flex justify-end my-5 items-center gap-2 mr-5 md:mr-0">
          <input
            type="text"
            placeholder="Info"
            className="input input-info md:w-1/4 w-1/3"
          />
          <button className="profilesearchBtn transition-all duration-300 hover:scale-105 px-5 py-3 rounded-md cursor-pointer">
            search
          </button>
        </div> */}
        <div className="container mx-auto  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {New.length === 0 ? (
            <img className="mx-auto" src={nodata} />
          ) : (
            New.map((item, i) => (
              <div key={i} className="card">
                <div className="flex justify-end gap-5">
                  <span>
                    <FaEdit
                      onClick={() =>
                        navigate(`/update/${item._id}`, { state: item })
                      }
                      className="cursor-pointer text-white hover:text-cyan-500 hover:text-lg transition-all duration-300"
                    />
                  </span>
                  <span>
                    <MdDelete
                      onClick={() => deleteAlert(item._id)}
                      className="cursor-pointer text-white hover:text-red-500 hover:text-lg transition-all duration-300"
                    />
                  </span>
                </div>
                <div className="card__border" />
                <div className="card_title__container">
                  <span className="card_title"> {item.title}</span>
                </div>
                <hr className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 h-[1px] border-0" />
                <p className="card_paragraph text-xs text-white">
                  {item.description}
                </p>
                <div className="w-full flex justify-evenly">
                  <div className="text-white">
                    {new Date(item.createdDate).toLocaleDateString()}
                  </div>
                  <button className="btn btn-xs rounded-full text-primary">
                    {item.status}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
};

export default New;