import React from "react";
import InputField from "./InputField.jsx";
import { useRef } from "react";
import Modal from "./Modal.jsx";

function NewProject({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const date = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = date.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDate.trim() === "" ||
      enteredDescription.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... you didnt enter a value</p>
        <p className="text-stone-600 mb-4">
          please enter a valid entry for all{" "}
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4 ">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 "
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <InputField type="text" ref={title} label="Title" />
          <InputField ref={description} label="Description" isTextArea />
          <InputField type="date" ref={date} label="Due Date" />
        </div>
      </div>
    </>
  );
}

export default NewProject;
