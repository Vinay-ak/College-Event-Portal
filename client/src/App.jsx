import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";

import DashBoard from "./pages/DashBoard";
import Task from "./pages/Task";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";

import { Toaster } from "sonner";
import SideBar from "./components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { Fragment, useRef } from "react";
import { setOpenSidebar } from "./redux/slices/authSlice";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { Transition } from "@headlessui/react";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <SideBar />
      </div>
      <MobileSidebar />
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}
const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };
  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-2/4 h-full">
              <div className="w-full flex justify-endpx-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>
              <div className="-mt-10">
                <SideBar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/tasks" element={<Task />}></Route>
          <Route path="/completed/:status" element={<Task />}></Route>
          <Route path="/in-progress/:status" element={<Task />}></Route>
          <Route path="/todo/:status" element={<Task />}></Route>
          <Route path="/team" element={<Users />}></Route>
          <Route path="/trashed" element={<Trash />}></Route>
          <Route path="/task/:id" element={<TaskDetails />}></Route>
        </Route>
        <Route path="/log-in" element={<Login />}></Route>
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
