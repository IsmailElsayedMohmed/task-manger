import { useState } from "react";
import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { ImBin } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Composition from "./Composition";
import { useDispatch, useSelector } from "react-redux";
import { postAnewTask, deleteTask } from "./mainReducer";
function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.users.user);
  const [postTask, setPostTask] = useState("");
  const onHandelSubmit = (e) => {
    e.preventDefault();
    if (postTask.trim() === "") return;
    dispatch(
      postAnewTask({
        name: postTask,
      })
    );
    setPostTask("");
  };
  const onDelteTask = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <Composition>
      <div className="w-3/4  sm:transform sm:scale-110  lg:w-2/4 lg:mx-auto text-center rounded-lg p-8 pb-14  mb-20 bg-white shadow-2xl border-2 border-gray-300">
        <h1 className="tracking-wider text-2xl font-serif my-2">Task Manger</h1>
        <form onSubmit={onHandelSubmit}>
          <input
            type="text"
            autoFocus
            style={{ maxWidth: "90%", width: "400px" }}
            className=" bg-gray-100 rounded-tl-lg rounded-bl-lg border-2 border-gray-300 py-2 px-2 text-green-900 font-bold outline-none"
            value={postTask}
            required
            onChange={({ target: { value } }) => setPostTask(value)}
          />
          <input
            type="submit"
            value="Submit"
            className="font-bold rounded-tr-lg rounded-br-lg block mx-auto my-4 lg:my-0 sm:inline text-gray-900 py-2 border-2 border-green-500 
            bg-green-300 px-5 tracking-widest cursor-pointer hover:border-green-600 hover:bg-green-500 transition-all"
          />
        </form>
      </div>
      <div className="w-full px-8 lg:w-2/4 lg:mx-auto ">
        {tasks ? (
          tasks.map(({ _id: key, name, completed }) => {
            return (
              <div
                key={key}
                className="flex  lg:transform lg:scale-x-125 lg:scale-y-110   border-green-100 border-2 hover:border-green-400 my-4 justify-between  hover:shadow-xl transition-all py-4 px-6 rounded-lg    bg-white"
              >
                <div className="flex justify-center items-center space-x-3">
                  <AiOutlineCheckCircle className="text-green-400 text-2xl font-bold" />{" "}
                  <span
                    className={`text-gray-900 font-serif text-sm font-bold ${
                      completed && "line-through"
                    }`}
                  >
                    {name}
                  </span>
                </div>
                <div className="flex  justify-center items-center space-x-4">
                  <Link to={`/id=${key}`}>
                    <HiPencilAlt className="transition-all text-xl transform hover:rotate-45 cursor-pointer  text-green-400" />{" "}
                  </Link>
                  <ImBin
                    onClick={({ currentTarget }) => {
                      onDelteTask(key);
                      currentTarget.classList.add("pointer-events-none");
                      currentTarget.classList.add("text-5xl");
                    }}
                    className="transition-all text-xl  transform hover:rotate-45  cursor-pointer text-red-400"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </Composition>
  );
}

export default Home;
