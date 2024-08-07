import Cookies from "js-cookie";

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
    const response = await fetch("http://localhost:5000/api/todos", options);
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
