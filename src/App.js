import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";
import { getAllTasks } from "./mainReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTasks());
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:id">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}
