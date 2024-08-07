import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { CategoryName } from "./context/index.js";

function Header({ isTrue, onClickChangeTabName, activeCategoryName }) {
  const [activeTab, setActiveTab] = useState("All Notes");
  const [isActive, setActive] = useState(false);
  const naviagate = useNavigate();

  const navItems = [
    {
      name: "All Notes",
    },
    {
      name: "Personal",
    },
    {
      name: "Social",
    },
    {
      name: "Business",
    },
  ];

  const onClickChangeTab = (event) => {
    setActiveTab(event.target.dataset.linkName);
    onClickChangeTabName(event.target.dataset.linkName);
  };

  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    naviagate("/login");
  };

  return (
    <>
      <ul className="hidden sm:flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            data-link-name={item.name}
            className={
              activeCategoryName === item.name
                ? "py-3 px-2 bg-blue-600 text-white m-1 rounded-lg cursor-pointer md:py-3 md:px-4"
                : "py-3 px-4 m-1 cursor-pointer"
            }
            onClick={onClickChangeTab}
          >
            {item.name}
          </NavLink>
        ))}
        <button className="px-4" onClick={() => setActive((prev) => !prev)}>
          <FaRegUserCircle size={22} />
        </button>
        {isActive && (
          <div className="flex flex-col absolute right-0 top-20 bg-white rounded-lg shadow-md overflow-hidden">
            <NavLink className="w-full px-8 py-2 hover:bg-gray-200">
              User
            </NavLink>
            <NavLink
              onClick={onClickLogout}
              className="w-full px-8 py-2 hover:bg-red-50  text-red-500 flex items-center"
            >
              <FiLogOut className="mr-2" /> Logout
            </NavLink>
          </div>
        )}
      </ul>
      <ul
        className={`py-2 sm:hidden flex flex-col justify-center items-center bg-white w-full rounded-lg absolute top-20 left-0 shadow-lg ${
          isTrue ? "block" : "hidden"
        } `}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            data-link-name={item.name}
            className={
              activeTab === item.name
                ? "py-3 px-2 text-blue-600 font-bold m-1 rounded-lg cursor-pointer md:py-3 md:px-4"
                : "py-3 px-4 m-1 cursor-pointer"
            }
            onClick={onClickChangeTab}
          >
            {item.name}
          </NavLink>
        ))}

        <button
          className=" w-full py-3 px-2 border-t-2 border-gray-100"
          onClick={() => setActive((prev) => !prev)}
        >
          Profile
        </button>
        {isActive && (
          <div className=" w-full flex flex-col absolute right-0 top-80 bg-white rounded-lg shadow-md overflow-hidden">
            <NavLink className="w-full px-8 py-2 hover:bg-gray-200">
              User
            </NavLink>
            <NavLink
              onClick={onClickLogout}
              className="w-full px-8 py-2 hover:bg-red-50  text-red-500 flex items-center"
            >
              <FiLogOut className="mr-2" /> Logout
            </NavLink>
          </div>
        )}
      </ul>
    </>
  );
}

const AppLayout = () => {
  const [mobileSideBarOpen, setMobileSideBarOpen] = useState(false);
  const [activeCategoryName, setActiveCategoryName] = useState("All Notes");

  const onChangeTabName = (tabName) => {
    setActiveCategoryName(tabName);
    setMobileSideBarOpen(false);
  };

  const value = {
    categoryName: activeCategoryName,
    reloadApi: () => {
      setActiveCategoryName("All Notes");
    },
  };

  // console.log(activeCategoryName);
  return (
    <CategoryName.Provider value={value}>
      <div className="bg-gray-100">
        <header className="fixed top-0 left-0 w-full py-5 px-5 md:px-10 z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-md flex justify-between items-center md:p-2">
            <button
              className="sm:hidden"
              onClick={() => setMobileSideBarOpen((prev) => !prev)}
            >
              {mobileSideBarOpen ? (
                <IoClose size={25} className="sm:ml-5" />
              ) : (
                <IoMenu size={25} className="sm:ml-5" />
              )}
            </button>
            <div className="pl-3 flex items-center">
              <MdOutlineStickyNote2 size={30} />
              <span className="ml-2 font-bold text-lg">Sticky Note</span>
            </div>
            {
              <Header
                isTrue={mobileSideBarOpen}
                onClickChangeTabName={onChangeTabName}
                activeCategoryName={activeCategoryName}
              />
            }
          </div>
        </header>
        <main>
          <div className="bg-slate-100 min-h-screen pt-24 sm:pt-28 pb-10 px-5 md:px-10 lg:w-9/12 m-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </CategoryName.Provider>
  );
};

export default AppLayout;
