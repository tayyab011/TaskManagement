import React, { useEffect } from 'react';
import '../App.css'
import { summaryRequestApi } from '../apiRequest/api';
import { useDispatch, useSelector } from 'react-redux';
import FullscreenLoader from './MasterLayout.jsx/FullscreenLoader';
import { setLoading } from '../redux/state-slice/settingSlice';
import { useNavigate } from 'react-router-dom';
import nodata from "../assets/2953962.jpg";
const Dashboard = () => {
  const navigate=useNavigate()
  const { loader } = useSelector((store) => store.settings);
  const dispatch = useDispatch();
  useEffect(()=>{
(async()=>{
       dispatch(setLoading(true));
await summaryRequestApi()
dispatch(setLoading(false));
})()
  },[])
  const { summary } = useSelector((store) => store.summary);
    return (
      <div className="container mx-auto  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {loader ? <FullscreenLoader /> : null}
        {summary.length === 0 ? (
          <img className="mx-auto" src={nodata} />
        ) : (
          summary.map((item, i) => (
            <div key={i} className="card">
              <div className="card__border" />
              <div className="card_title__container">
                <span className="card_title">{item._id + " Task"}</span>
                <p className="font-extrabold w-5 h-5 rounded-full bg-gray-300 text-center text-black mt-5">
                  {item.sum}
                </p>
              </div>
              <hr className="line" />
              <ul className="card__list">
                <li className="card__list_item">
                  <span className="check">
                    <svg
                      className="check_svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="list_text">Set Clear Goals</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <svg
                      className="check_svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="list_text">Stay Organized</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <svg
                      className="check_svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="list_text">Continuous Learning</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <svg
                      className="check_svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="list_text">Time Management</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <svg
                      className="check_svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="list_text">
                    Maintain a Positive Attitude
                  </span>
                </li>
              </ul>
              <button
                className="button"
                onClick={() => {
                  item._id === "New"
                    ? navigate("/all")
                    : item._id === "Completed"
                    ? navigate("/completed")
                    : item._id === "Progress"
                    ? navigate("/progress")
                    : item._id === "Cancelled"
                    ? navigate("/cancled")
                    : null;
                }}
              >
                Get Your all {item._id} Task
              </button>
            </div>
          ))
        )}
      </div>
    );
};

export default Dashboard;