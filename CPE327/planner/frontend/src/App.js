import "./App.css";
import React from "react";
import MyProjects from "./page/Myprojects/myprojects";
import Tasks from "./page/Task/tasks";
import Navbar from "./components/navbar";
import Login from "./page/Loginpage/login";
import Regis from "./page/Registerpage/register";
import InfoTask from "./components/modal/infotask";
import Footer from "./components/footer";
import NotFound from "./page/Notfound/notfound";
import Profile from "./page/Profilepage/profile";
import ManageAccount from "./page/ManageAccountpage/manageaccount";
import Home from "./page/Homepage/home"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from './context/auth'
import UserRoute from "./util/UserRoute";
import GuestRoute from "./util/GuestRoute";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/regis" component={Regis} />
          <UserRoute path="/myprojects" component={MyProjects} />
          <UserRoute path="/project/:projectId/tasks" component={Tasks} />
          <UserRoute path="/profile" component={Profile} />
          <UserRoute path="/manage_account" component={ManageAccount} />
          <UserRoute path="/infotask" component={InfoTask} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
