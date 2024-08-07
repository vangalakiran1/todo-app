import { useState, useContext } from "react";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import CapitalizeHeading from "../../utils/CapitalizeHeading";
import { GetAllTodoData } from "../../context";
import { CategoryName } from "../../context";

const port = "http://localhost:5000";
const categories = ["personal", "business", "social"];

export default function ModalBox({
  onClick,
  isAddNote,
  isEditBtn,
  todoDetails,
}) {
  const { updataApi } = useContext(GetAllTodoData);
  const { reloadApi } = useContext(CategoryName);
  const editNoteFormData = {
    heading: isAddNote ? "" : todoDetails.heading,
    todo: isAddNote ? "" : todoDetails.todo,
    category: isAddNote ? "" : todoDetails.category,
  };

  const [editNoteForm, setEditNoteForm] = useState({
    heading: editNoteFormData.heading,
    todo: editNoteFormData.todo,
    category: editNoteFormData.category,
  });

  const onChangeValueEdit = (event) => {
    setEditNoteForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [addTodoForm, setAddTodoForm] = useState({
    heading: "",
    todo: "",
    category: "",
  });

  const onChangeValue = (event) => {
    setAddTodoForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onStickyNoteSubmit = async (event) => {
    event.preventDefault();
    if (addTodoForm.heading === "") return alert("heading is not empty");
    if (addTodoForm.category === "") return alert("category is not empty");
    if (addTodoForm.todo === "") return alert("todo is not empty");

    const jwtToken = Cookies.get("jwtToken");

    try {
      const userDetails = {
        heading: addTodoForm.heading,
        todo: addTodoForm.todo,
        category: addTodoForm.category,
      };
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(`${port}/api/add-todo`, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(`msg: ${data}`);
        onClick();
        updataApi();
        reloadApi();
      } else {
        console.log(`Err msg: ${data}`);
      }
    } catch (error) {
      console.log(`Err msg: ${error}`);
    }
  };

  const onEditNoteSubmit = async (event) => {
    const { _id } = todoDetails;
    event.preventDefault();
    const jwtToken = Cookies.get("jwtToken");

    try {
      const userDetails = {
        heading: editNoteForm.heading,
        todo: editNoteForm.todo,
        category: editNoteForm.category,
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
        onClick();
        updataApi();
      } else {
        console.log(`Err msg: ${data}`);
      }
    } catch (error) {
      console.log(`Err msg: ${error}`);
    }
  };

  const renderStikyNote = () => (
    <form onSubmit={isAddNote ? onStickyNoteSubmit : onEditNoteSubmit}>
      <div className="fixed top-0 left-0 p-2 bg-gray-950/30 w-full min-h-screen flex justify-center items-center z-10">
        <div className="p-6 relative flex justify-center items-center flex-col max-w-96 w-full rounded-lg bg-white">
          <button
            type="button"
            className="absolute top-5 right-5"
            onClick={onClick}
          >
            <IoClose size={25} />
          </button>
          <h2 className="text-2xl font-bold pb-6">
            {isAddNote ? "Sticky Note" : "Edit Note"}
          </h2>
          <input
            type="text"
            className="border-2 w-full h-12 pl-4 mb-2 rounded-md"
            placeholder="Heading"
            name="heading"
            value={isAddNote ? addTodoForm.heading : editNoteForm.heading}
            onChange={isAddNote ? onChangeValue : onChangeValueEdit}
          />
          <select
            className="border-2 w-full h-12 px-4 pr-10 mb-2 rounded-md"
            placeholder="category"
            name="category"
            onChange={isAddNote ? onChangeValue : onChangeValueEdit}
          >
            <option defaultValue="category" className="text-gray-200" hidden>
              Category
            </option>
            {/* <option>hello</option> */}
            {categories.map((item) => (
              <option value={item} key={item}>
                {CapitalizeHeading(item)}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          <textarea
            type="text"
            className="border-2 w-full h-40 p-4 mb-2 rounded-md"
            placeholder="Write Todo..."
            name="todo"
            value={isAddNote ? addTodoForm.todo : editNoteForm.todo}
            onChange={isAddNote ? onChangeValue : onChangeValueEdit}
          ></textarea>
          <button className="w-full h-12 bg-gray-800 text-white rounded-md mt-4">
            Add Note
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <>
      {isAddNote && renderStikyNote()}
      {isEditBtn && renderStikyNote()}
    </>
  );
}
