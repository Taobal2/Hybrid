import React from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Screen from "./Components/Body/Screen";
import Tasked from "./Components/Body/Tasked";
import Register from "./Components/Register/Register";
import PrivateRoute from "./Components/Register/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Screen />
            </PrivateRoute>
          }
        />
        <Route path="/tasked" element={<Tasked />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
