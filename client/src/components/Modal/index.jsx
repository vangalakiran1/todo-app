import React, { useState } from "react";
import ModalBox from "./ModalBox";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

const Modal = ({ isAddNote, buttonName, isEditBtn, todoDetails }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className={
          isEditBtn
            ? ""
            : `flex items-center bg-gray-800 hover:bg-blue-700 text-white rounded-lg py-3 px-4 m-1 cursor-pointer`
        }
      >
        {isAddNote && <FiPlusSquare className="mr-2" size={18} />}
        {isEditBtn && <FaRegEdit size={20} />}
        {buttonName}
      </button>
      {modalOpen && (
        <ModalBox
          isAddNote={isAddNote}
          isEditBtn={isEditBtn}
          todoDetails={todoDetails}
          onClick={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Modal;
