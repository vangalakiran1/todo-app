import React from "react";
import getAllTodosApi from "../api/getAllTodos.api";

const PageNotFound = () => {
  console.log(getAllTodosApi());
  return <div>404 Page not found </div>;
};

export default PageNotFound;
