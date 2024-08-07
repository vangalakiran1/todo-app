import Cookies from "js-cookie";

// const port = "https://todo-app-two-sigma-72.vercel.app/";
const getAllTodosApi = async () => {
  const onSuccess = (data) => {
    return console.log(data);
  };

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
      "https://todo-app-two-sigma-72.vercel.app/api/todos",
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

export default getAllTodosApi;
