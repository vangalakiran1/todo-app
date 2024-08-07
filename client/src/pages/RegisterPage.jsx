import React, { useState } from "react";
import CapitalizeHeading from "../utils/CapitalizeHeading";
import { useNavigate, NavLink } from "react-router-dom";

const port = "https://todo-app-two-sigma-72.vercel.app";
// const port = "http://localhost:5000";

function Input({ name, placeholder, type, onChange }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-[10px] block text-base font-medium text-dark text-gray-800">
        {CapitalizeHeading(name)}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className="w-full bg-transparent rounded-md border-2 border-gray-400 py-[10px] px-5 text-dark-5 outline-none transition focus:border-blue-500 active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
      />
    </div>
  );
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [myFormData, setMyFormData] = useState({
    username: "",
    password: "",
  });

  const onChangeInput = (event) => {
    setMyFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSuccess = (data) => {
    navigate("/login");
  };

  const myFormSubmit = async (event) => {
    event.preventDefault();
    if (myFormData.username === "") return alert("username is not empty");
    if (myFormData.password === "") return alert("password is not empty");

    try {
      const userDetails = {
        username: myFormData.username,
        password: myFormData.password,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(`${port}/api/add-new-user`, options);
      const data = await response.json();
      if (response.ok) {
        return onSuccess(data);
      } else {
        return console.log(data);
      }
    } catch (error) {
      console.log(`Err msg: ${error}`);
    }
  };

  return (
    <form onSubmit={myFormSubmit}>
      <div className="flex justify-center items-center min-h-screen bg-slate-200 ">
        <div className="max-w-96 w-full bg-white p-8 rounded-lg">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">
            Create an account
          </h1>
          <Input
            name="username"
            placeholder="info@yourmai.com"
            type="text"
            onChange={onChangeInput}
          />
          <Input
            name="password"
            placeholder="*******"
            type="password"
            onChange={onChangeInput}
          />
          <button
            type="submit"
            className="w-full h-12 mt-2 bg-gray-800 rounded-md text-white "
          >
            Sign Up
          </button>
          <p className="w-full flex justify-between items-center pt-4">
            <span>Already have an account</span>
            <NavLink to="/login" className="underline">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
