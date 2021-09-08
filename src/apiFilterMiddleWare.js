import { apiTouched } from "./mainReducer";
import axios from "axios";

const apiFilterMiddleWare =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiTouched.type) return next(action);
    try {
      const { url, method, data, onSuccess, onError, params, onEdit } =
        action.payload;
      const baseURL = `${process.env.REACT_APP_URL}${
        params ? `/${params.id}` : ""
      }`;
      const response = await axios.request({
        baseURL,
        url,
        method,
        data,
        onSuccess,
        onError,
      });
      if (onEdit) {
        const updatedTask = getState().users.user.map((task) => {
          if (task._id === response.data.task._id)
            return (task = response.data.task);
          else {
            return task;
          }
        });
        dispatch({ type: onEdit, payload: updatedTask });
      }
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
export default apiFilterMiddleWare;
