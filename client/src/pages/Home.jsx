import React, { useEffect, useState, useRef, useContext } from "react";
import Cookies from "js-cookie";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import { GetAllTodoData } from "../context";
import { CategoryName } from "../context";
import scrollDown from "../utils/ScrollToBottom";

const port = "https://todo-app-two-sigma-72.vercel.app";
// const port = "http://localhost:5000";

const HomePage = () => {
  const [todosData, setTodoData] = useState([]);
  const scrollDown = useRef(null);
  const { categoryName } = useContext(CategoryName);
  const filterByCategory = categoryName === "All Notes" ? "" : categoryName;

  useEffect(() => {
    getAllTodoData();
  }, [categoryName]);

  const onSuccess = (data) => {
    setTodoData(data);
    // scrollDown.current.scrollIntoView();
  };

  const getAllTodoData = async () => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${port}/api/todos?category=${filterByCategory}`,
        options
      );
      if (response.ok === true) {
        const data = await response.json();
        onSuccess(data.todos);
        console.log(data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GetAllTodoData.Provider value={{ updataApi: getAllTodoData }}>
      <div
        id="todoContainer"
        className="p-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {todosData.length > 0 ? (
          todosData.map((item) => <Todo key={item._id} todoDetails={item} />)
        ) : (
          <p></p>
        )}
        <div className="min-h-52 flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg">
          <Modal isAddNote={true} buttonName="Add Note" />
        </div>
        <div ref={scrollDown} />
      </div>
    </GetAllTodoData.Provider>
  );
};

export default HomePage;
