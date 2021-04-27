import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import adminPage from "./AdminPage/adminPage";
import userPage from "./UserPage/userPage";
import JoinConf from "./UserPage/joinConf";
import CurrentGroups from "./AdminPage/currentGroups";
import UserCurrentGroups from "./UserPage/userCurrentGroups";
import firebase from "firebase";
import { auth, db } from "../firebase";
import { CodeOutlined } from "@material-ui/icons";

function App() {

  const [userType, setUserType] = useState("user");
  // useEffect(() => {
  //   console.log(auth);
  //   // db.collection("users")
  //   //   .doc(auth.currentUser.uid)
  //   //   .get()
  //   //   .then((result) => {
  //   //     console.log(result.data.type);
  //   //     setUserType(result.data.type);
  //   //   });
  // }, []);
  

  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          <PrivateRoute exact path="/" component={adminPage} />
          <Route exact path="/user" component={userPage} />
          <Route exact path="/userconf" component={JoinConf} />
          <Route exact path="/current" component={CurrentGroups} />
          <Route exact path="/usercurrent" component={UserCurrentGroups} />

          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </div>
          </Container>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
