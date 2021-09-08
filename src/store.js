import { configureStore } from "@reduxjs/toolkit";
import apiFilterMiddleWare from "./apiFilterMiddleWare";
import mainReducer from "./mainReducer";
export default function reduxStore() {
  return configureStore({
    reducer: {
      users: mainReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiFilterMiddleWare),
  });
}
