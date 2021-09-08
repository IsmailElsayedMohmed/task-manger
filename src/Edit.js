import React, { useEffect, useState } from "react";
import Composition from "./Composition";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { editTask } from "./mainReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Edit(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: taskIdParama } = useParams();
  const id = taskIdParama.substring(3);
  const task = useSelector((state) => state.users.user).filter(
    (e) => e._id === id
  );
  const [editInput, setEditInput] = useState(null);
  const [checkInput, setCheckInput] = useState(null);
  console.log(checkInput);
  const handelEditSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      editTask(id, {
        editInput: editInput !== null ? editInput : task[0].name,
        checkInput: checkInput !== null ? checkInput : task[0].completed,
      })
    );
    history.push("/");
  };
  return (
    <Composition>
      {task
        ? task.map(({ _id, name, completed }, index) => {
            return (
              <form
                onSubmit={handelEditSubmit}
                key={_id}
                className="grid  grid-cols-3 gap-7 items-center my-4  border-2 bg-white border-gray-300 rounded-lg shadow-lg p-8"
              >
                <h1 className="col-span-3 text-center tracking-widest text-lg text-gray-900">
                  Edit Task
                </h1>
                <h2>Task iD</h2>
                <p className="col-span-2">{id}</p>
                <h2>Name</h2>
                <input
                  type="text"
                  value={!editInput ? name : editInput}
                  onChange={({ target: { value } }) => setEditInput(value)}
                  className="col-span-2 bg-gray-100  rounded-sm border-2 font-bold text-green-500 hover:border-green-200 outline-none py-1 px-2"
                />
                <h2>Completed</h2>
                <input
                  value={checkInput === null ? completed : checkInput}
                  checked={checkInput === null ? completed : checkInput}
                  onChange={() =>
                    setCheckInput(
                      checkInput === null ? !completed : !checkInput
                    )
                  }
                  type="checkbox"
                  name=""
                  id=""
                  className="col-span-2"
                />
                <button className="col-span-3 bg-green-200 rounded-lg hover:bg-green-300 trnasitiona-all ring-2 ring-green-300 text-cyan-900 tracking-widest font-bold py-2">
                  Edit
                </button>
              </form>
            );
          })
        : ""}
    </Composition>
  );
}
