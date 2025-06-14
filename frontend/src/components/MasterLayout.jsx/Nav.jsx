import React from "react";
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineForm, AiOutlineUser } from "react-icons/ai";
import { GrCompliance, GrInProgress } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2, RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { getToken, getUserDetails } from "../../helper/SessionHelper";
import { logoutApi } from "../../apiRequest/api";
import defaultAvatar from "../../assets/sdc.jpg";
import { useSelector } from 'react-redux';
const Nav = () => {
  const navigate = useNavigate();
  const logout =async()=>{
   const res= await logoutApi()
   if (res===true) {
    navigate("/login");
   }
  }
/*  const user= getUserDetails() */
const { user } = useSelector(store => store.auth); 
  return (
    <div className="sticky top-0 z-50  mb-10">
      <>
        <div className="drawer ">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content mt-6 ml-4 mb-3 ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button profilesearchBtn border-0"
            >
              <RiMenu2Line />
            </label>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className=" menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li
                className="profileToggle rounded-full"
                onClick={() => navigate("/")}
              >
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <span>
                    <RxDashboard />
                  </span>
                  <a className=" font-bold text-lg">Dashboard</a>
                </label>
              </li>
              <li
                className="profileToggle rounded-full"
                onClick={() => navigate("/create")}
              >
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <span>
                    <AiOutlineForm />
                  </span>
                  <a className=" font-bold text-lg">Create Task</a>
                </label>
              </li>
              <li
                className="profileToggle rounded-full"
                onClick={() => navigate("/all")}
              >
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <span>
                    <AiOutlineAlignLeft />
                  </span>
                  <a className=" font-bold text-lg">New Task</a>
                </label>
              </li>
              <li
                className="profileToggle rounded-full"
                onClick={() => navigate("/progress")}
              >
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <span>
                    <GrInProgress />
                  </span>
                  <a className=" font-bold text-lg">in Progress</a>
                </label>
              </li>
              <li
                className="profileToggle rounded-full"
                onClick={() => navigate("/completed")}
              >
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <span>
                    <GrCompliance />
                  </span>
                  <a className=" font-bold text-lg">Completed</a>
                </label>
              </li>
              <li
                className="profileToggle rounded-full"
                onClick={() => navigate("/cancled")}
              >
                <label htmlFor="my-drawer" className="cursor-pointer">
                  <span>
                    <RxCross2 />
                  </span>
                  <a className=" font-bold text-lg">Cancelled</a>
                </label>
              </li>
              <hr />

              <li
                className="mt-6 w-9 profileToggle rounded-full"
                onClick={() => navigate("/")}
              >
                <label
                  htmlFor="my-drawer"
                  className="cursor-pointer text-center"
                >
                  <IoArrowBack />
                </label>
              </li>
            </ul>
          </div>
        </div>
      </>

      {!getToken() ? (
        <>
          {" "}
          <div className="dropdown dropdown-center flex float-end -mt-13 mr-4 gap-2 cursor-pointer">
            {" "}
            <button className=" p-3 text-white profilesearchBtn cursor-pointer rounded-lg hover:scale-95 transition transform duration-300 shadow-lg ">
              {" "}
              <Link to="/login">login</Link>
            </button>{" "}
            <button className=" p-3 text-white profilesearchBtn cursor-pointer rounded-lg hover:scale-95 transition transform duration-300 shadow-lg ">
              {" "}
              <Link to="/registration">signup</Link>
            </button>{" "}
          </div>
        </>
      ) : null}

      {getToken() ? (
        <>
          <div className="dropdown dropdown-end float-end -mt-13 mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photo ? user.photo : defaultAvatar}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl"
            >
              <p className="text-center">
                {" "}
                {user.firstName + " " + user.lastName}
              </p>
              <hr className="mb-2" />
              {/*   <li className="profileToggle rounded-full">
                <a className="justify-between">{user.firstName+" "+user.lastName} </a>
              </li> */}
              <li className="profileToggle rounded-full">
                <Link to="/profile" className="justify-between">
                  Profile{" "}
                </Link>
              </li>

              <li className="profileToggle rounded-full">
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Nav;
