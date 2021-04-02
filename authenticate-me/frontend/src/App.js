import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import TaskList from "./components/TaskList";
import ListOfTasks from "./components/UserLists";
import CreateList from "./components/CreateList";
import CreateTask from "./components/CreateTask";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/tasks">
            <TaskList />
          </Route>
          <Route exact path="/lists">
            <ListOfTasks />
          </Route>
          <Route exact path="/lists/create">
            <CreateList />
          </Route>
          <Route exact path="/tasks/create">
            <CreateTask />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
