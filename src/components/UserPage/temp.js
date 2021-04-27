import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import "./userPage.scss";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import bg from "../../assets/bg4.jpg";

export default function UserPage() {
  const [toggle, setToggle] = useState(false);
  const [refId, setRefId] = useState("");

  let history = useHistory();

  // useEffect(() => {
  //  db.collection("sms-groups").
  // }, [])

  // const handleSubmit = async () => {

  // };
  console.log(auth);
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
            </li> */}

            <li>
              <a href="/usercurrent"> Current Groups</a>
            </li>
            <li>
              <a href="/user"> Join A Group</a>
            </li>
            <li>
              <a>Bids/Lottery</a>
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
            <h3 className="text-center mb-4">Join a SMS Group</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>Enter a Referral Id:</Col>
              <Col>
                {/* <input
                  type="text"
                  onChange={(e) => setRefId(e.target.value)}
                ></input> */}
                <Form.Control
                  type="text"
                  placeholder="Normal text"
                  onChange={(e) => setRefId(e.target.value)}
                />
                {refId}
              </Col>
            </Row>
            <br />
            <Row>
              <button className="btn-grad1">
                <Link
                  to={{
                    pathname: "/userconf",
                    state: { id: refId },
                  }}
                >
                  Join Group
                </Link>
              </button>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
