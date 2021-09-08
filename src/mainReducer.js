import { createSlice } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
const mainReducer = createSlice({
  name: "prodcuts",
  initialState: {
    user: [],
  },
  reducers: {
    allUser: (state, { payload }) => {
      const users = payload.task ? [payload.task] : payload.tasks;
      state.user.push(...users);
    },
    deleted: (state, { payload }) => {
      state.user = payload;
    },
    updated: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { allUser, deleted, updated } = mainReducer.actions;
export default mainReducer.reducer;

//actions
export const apiTouched = createAction("apiTouched");
export const postAnewTask = (data) => (dispatch) => {
  dispatch(
    apiTouched({
      data,
      onSuccess: allUser.type,
      method: "post",
    })
  );
};
export const getAllTasks = () => (dispatch) => {
  dispatch(
    apiTouched({
      onSuccess: allUser.type,
    })
  );
};
export const deleteTask = (id) => (dispatch, getState) => {
  const deletedTask = getState().users.user.filter((e) => e._id !== id);
  dispatch({ type: deleted.type, payload: deletedTask });
  dispatch(
    apiTouched({
      method: "delete",
      params: {
        id,
      },
    })
  );
};
export const editTask = (id, data) => (dispatch) => {
  dispatch(
    apiTouched({
      method: "patch",
      params: {
        id,
      },
      data: {
        name: data.editInput,
        completed: data.checkInput ? data.checkInput : false,
      },
      onEdit: updated.type,
    })
  );
};
