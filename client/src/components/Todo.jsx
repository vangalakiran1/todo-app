import React, { useState, useContext } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Cookies from "js-cookie";
import TimeFormater from "../utils/TimeFormater.js";
import CapitalizeHeading from "../utils/CapitalizeHeading.js";
import { GetAllTodoData } from "../context";
import Modal from "../components/Modal";

const port = "https://todo-app-two-sigma-72.vercel.app";
// const port = "http://localhost:5000";

const colorList = {
  personal: "bg-red-500",
  social: "bg-blue-400",
  business: "bg-gray-300",
};

const Todo = ({ todoDetails }) => {
  const { updataApi } = useContext(GetAllTodoData);
  const { heading, todo, isStarChecked, updatedAt, category, _id } =
    todoDetails;

  const deleteTodo = async () => {
    const isComfirm = window.confirm("Are you sure to delete todo");
    if (!isComfirm) return;

    const jwtToken = Cookies.get("jwtToken");
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${port}/api/deleteTodo/${_id}`, options);
      if (response.ok === true) {
        const data = await response.json();
        console.log(data);
        updataApi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = () => {};

  const getColor = (category) => {
    switch (category) {
      case "personal":
        return colorList.personal;
      case "social":
        return colorList.social;
      case "business":
        return colorList.business;

      default:
        return null;
    }
  };
  // console.log(getColor(category));

  const onClickChangeStared = async () => {
    const { _id } = todoDetails;
    const jwtToken = Cookies.get("jwtToken");

    try {
      const userDetails = {
        heading: todoDetails.heading,
        todo: todoDetails.todo,
        isStarChecked: !todoDetails.isStarChecked,
      };
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(`${port}/api/updateTodo/${_id}`, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(`msg: ${data}`);
        updataApi();
      } else {
        console.log(`Err msg: ${data}`);
      }
    } catch (error) {
      console.log(`Err msg: ${error}`);
    }
  };

  const formateDate = TimeFormater(updatedAt);
  return (
    <div className="relative bg-white hover:shadow-lg p-6 rounded-lg min-h-52">
      <span className={`absolute left-0 w-1 h-8 ${getColor(category)}`}></span>
      <h2 className="text-xl font-semibold">{CapitalizeHeading(heading)}</h2>
      <p className="py-1 text-gray-400">{formateDate}</p>
      <p className="pt-5 text-base text-gray-600">
        {/* Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. */}
        {CapitalizeHeading(todo)}
      </p>
      <div className="pt-6 flex justify-between">
        <button onClick={onClickChangeStared}>
          <FaStar
            className={isStarChecked ? "text-yellow-400" : ""}
            size={20}
          />
        </button>
        <div className="flex items-center justify-center">
          {/* <button onClick={updateTodo} className="mr-5"> */}
          <Modal isEditBtn={true} todoDetails={todoDetails} />

          <button onClick={deleteTodo} className="ml-3 pb-1">
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
