import React from 'react'
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
  } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';

const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Events",
      link: "tasks",
      icon: <FaTasks />,
    },
    {
      label: "Completed",
      link: "completed/completed",
      icon: <MdTaskAlt />,
    },
    {
      label: "In Progress",
      link: "in-progress/in progress",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "Upcoming",
      link: "todo/todo",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "Team",
      link: "team",
      icon: <FaUsers />,
    },
    {
      label: "Trash",
      link: "trashed",
      icon: <FaTrashAlt />,
    },
  ];
  


const SideBar = () => {
    const {user}=useSelector((state)=>state.auth);

    const dispatch=useDispatch();
    const location=useLocation();

    const path=location.pathname.split("/")[1];

    const sidebarLinks=user?.isAdmin?linkData:linkData.slice(0,5);

    const closeSidebar=()=>{
        dispatch(setOpenSidebar(false))
    }
    const NavLink = ({ el }) => {
        return (
          <Link
            to={el.link}
            onClick={closeSidebar}
            className={clsx(
              "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#eda4252d]",
              path === el.link.split("/")[0] ? "bg-orange-600 text-neutral-100 hover:text-gray-800" : ""
            )}
          >
            {el.icon}
            <span className='hover:text-[#ed9625]'>{el.label}</span>
          </Link>
        );
      };
  return (
    
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <Link to='/'>
    <h1 className='flex gap-1 items-center'>
      <p className='bg-orange-500 p-2 rounded-full'>
        <MdOutlineAddTask className='text-white text-2xl font-black' />
      </p>
      <span className='text-2xl font-bold text-black hover:cursor-pointer '>College Event Portal</span>
    </h1>
    </Link>
    <div className='flex-1 flex flex-col gap-y-5 py-8'>
      {sidebarLinks.map((link) => (
        <NavLink el={link} key={link.label} />
      ))}
    </div>

    <div className=''>
      <button className='w-full gap-2 p-2 items-center text-lg text-gray-800 hidden'>
        <MdSettings />
        <span className='hidden'>Settings</span>
      </button>
    </div>
  </div>
  
);
};

export default SideBar