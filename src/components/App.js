import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import adminPage from "./AdminPage/adminPage";
import userPage from "./UserPage/userPage";
import JoinConf from "./UserPage/joinConf";
import CurrentGroups from "./AdminPage/currentGroups";
import UserCurrentGroups from "./UserPage/userCurrentGroups";
// import firebase from "firebase";
import { auth, db } from "../firebase";
// import { CodeOutlined } from "@material-ui/icons";
import GroupConf from "./AdminPage/groupConf";

function App() {

  const [userType, setUserType] = useState("");
  const [id, setId] = useState("");
  

  let data;
  const getUserType = async (i) => {
     await db.collection("users")
         .doc(i)
         .get()
         .then((result) => {
           return  result.data().type
            // setUserType(result.data().type);
          
         });
     
  };

  useEffect( () => {

   const unsuscribe =  auth.onAuthStateChanged(function  (user) {
     
     if  (user.exists) {
       console.log("walkfnjefeikfkfh")
        setUserType(getUserType(user.uid))

     };
   return unsuscribe;
   
  })}, []);

  
  
  // console.log(id)
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
          {userType === "user" ? (
            <PrivateRoute exact path="/" component={userPage} />
          ) : (
            <PrivateRoute exact path="/" component={adminPage} />
          )}

          {/* <Route exact path="/user" component={userPage} /> */}
          <PrivateRoute exact path="/user" component={userPage} />
          <PrivateRoute exact path="/admin" component={adminPage} />
          <Route exact path="/userconf" component={JoinConf} />
          <Route exact path="/current" component={CurrentGroups} />
          <Route exact path="/usercurrent" component={UserCurrentGroups} />
          <Route exact path="/groupconf" component={GroupConf} />

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
