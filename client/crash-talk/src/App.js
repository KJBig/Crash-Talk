import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./view/pages/Login";
import Register from "./view/pages/Register";
import Home from "./view/pages/Home";
import Chat from "./view/pages/Chat";
import "./App.css";
import { AuthContextProvider } from "./stores/auth-context";
import setAuthorization from "./stores/utils/setAuthorization";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path={"/home"} element={<Home />}></Route>
          <Route path={"/chat"} element={<Chat />}></Route>
          <Route path={"/register"} element={<Register />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"*"} element={<Navigate to={"/login"} replace />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
