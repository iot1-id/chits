import React, { useState, useEffect } from "react";
// import NavBar from "../NavBar";
import "./userPage.scss";
import {  Card } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import bg from "../../assets/bg4.jpg";
import firebase from "../../firebase"

export default function JoinConf({ location }) {
  const [toggle, setToggle] = useState(false);
  const [smsGroup, setSmsGroup] = useState([]);
  const [id, setId] = useState(location.state.id);
  const [data, setData] = useState([]);
   const messaging = firebase.messaging();
  var smsGroups = [];
  let history = useHistory();
  // setId(location.state.id);

  useEffect(() => {
    //  messaging.requestPermission().then


    db.collection("sms-groups")
      .doc(id)
      .get()
      .then((snapshot) => {
        setData(snapshot.data());
        // console.log(snapshot.data());
      });
  }, []);
  // console.log(data);
  const handleSubmit = async () => {
    await db
      .collection("sms-groups")
      .doc(id)
      .collection("members")
      .get()
      .then((result) => {
        if (result.docs.length < 50) {
          db.collection("sms-groups")
            .get()
            .then((snapshot) => {
              setSmsGroup([]);
              // console.log(snapshot.docs);
              snapshot.docs.forEach((element) => {
                smsGroups.push(element.id);
                console.log(element.id);
              });
            })
            .then(() => {
              console.log(smsGroups);
              ////////////
              if (smsGroups.includes(id)) {
                db.collection("sms-groups")
                  .doc(String(id))
                  .collection("members")
                  .doc(auth.currentUser.uid)
                  .set(
                    {
                      joinedAt: new Date(),
                    },
                    { merge: true }
                  ).then((result)=>{
                    db.collection("users")
                      .doc(auth.currentUser.uid)
                      .collection("sms-groups")
                      .doc(String(id)).set({
                        joinedAt: new Date(),
                        

                      })
                  })
              }
              alert("Group Joined succesfully");
              history.push("/usercurrent")
            })
            .catch((e) => alert(e));
        }
        else {
          alert("group already full")
        }
      });
  };

  return (
    <div style={{ backgroundImage: `url(${bg})`, height: "100vh" }}>
      <nav>
        <div className="logo">Chit Funds</div>
        <div className="content">
          <ul
            className="nav-links"
            style={{
              transform: toggle ? "translateX(0px)" : "",
              float: "right",
            }}
          >
            {/* {if (user===admin){

        }} */}
            {/* <li>
              <a>Payments</a>
            </li>
            <li>
              <a>Bids/Lottery</a>
            </li> */}
            <li>
              <a href="/usercurrent"> Current Groups</a>
            </li>
            <li>
              <button
                className="btn-grad2"
                onClick={() => {
                  auth.signOut().catch((e) => {
                    console.error("Sign Out Error", e);
                  });
                  history.push("/");
                }}
              >
                Signout
              </button>
            </li>

            {/* <li>
            <a>Signout</a>
          </li>
          <li>
            <a>Signout</a>
          </li> */}
          </ul>
          <i
            onClick={() => setToggle(!toggle)}
            className="fas fa-bars burger"
          ></i>
        </div>
      </nav>

      <div>
        <Card className="items">
          <Card.Header>
            <h3 className="text-center mb-4">Confirm Joining Group</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <div class="table">
                <div class="table-content">
                  <div class="table-row">
                    <div class="table-title">Referral Id:</div>
                    <div class="table-data">{id}</div>
                  </div>
                  <div class="table-row">
                    <div class="table-title">Interval</div>
                    <div class="table-data">{data.interval}</div>
                  </div>
                  <div class="table-row">
                    <div class="table-title">Amount</div>
                    <div class="table-data">{data.amount}</div>
                  </div>
                  <div class="table-row">
                    <div class="table-title">Total Period</div>
                    <div class="table-data">{data.duration}</div>
                  </div>
                  <div class="table-row">
                    <div class="table-title">Type</div>
                    <div class="table-data">{data.type}</div>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <button className="btn-grad1" onClick={handleSubmit}>
                Join Group
              </button>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
