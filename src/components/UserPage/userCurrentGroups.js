import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import NavBar from "../NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import bg from "../../assets/bg4.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function UserCurrentGroups() {
  const [toggle, setToggle] = useState(false);
  const [smsList, setSmsList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  
  const [bid, setBid] = useState(0);
  let history = useHistory();
  const classes = useStyles();
  const getLength = (refId) => {
    console.log(refId);
    db.collection("sms-groups")
      .doc(refId)
      .collection("members")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.length);
        setMembersList((result) => [...result, snapshot.docs.length]);
      });
  };

  useEffect(() => {
    db.collection("sms-groups").onSnapshot((querySnapshot) => {
      const isCollectionEmpty = querySnapshot.docs.length === 0;
      if (!isCollectionEmpty) {
        const List = querySnapshot.docs.map((doc) => {
          getLength(doc.data().refId);
          return doc.data();
        });

        console.log(List);
        setSmsList([...List]);
      }
    });
  }, []);
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
            <li>
              <a href="/user"> Join A Group</a>
            </li>
            {/* <li>
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

      <Card className="items">
        <Card.Header>
          <h3 className="text-center mb-4">Your SMS Groups</h3>
        </Card.Header>
        <Card.Body>
          <div className={classes.root}>
            {smsList.map((data, i) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Group: {i + 1}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div class="table">
                    <div class="table-content">
                      <div class="table-row">
                        <div class="table-title">Status:</div>
                        <div class="table-data">
                          {membersList[i] === 50 ? "Active" : "Inactive"}
                        </div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Members:</div>
                        <div class="table-data">{membersList[i]}</div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Referral Id:</div>
                        <div class="table-data">{data.refId}</div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Interval:</div>
                        <div class="table-data">{data.interval}</div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Amount:</div>
                        <div class="table-data">{data.amount}</div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Total Period:</div>
                        <div class="table-data">{data.duration}</div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Type:</div>
                        <div class="table-data">{data.type}</div>
                      </div>
                      {data.type === "Bidding" ? (
                        <div class="table-row">
                          <div class="table-title">Current Lowest Bid:</div>
                          <div class="table-data">1</div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div class="table-row">
                        <div class="table-title">
                          {data.type === "Bidding"
                            ? "Bidding:"
                            : "Lucky draw Winner:" }

                            {/* "Winner of the" +  `{data.interval == "Monthly" ? "Month" : "Week}` */}
                        </div>
                        {data.type === "Bidding" ? (
                          <div class="table-data">
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Amount"
                                  onChange={(e) => setBid(e.target.value)}
                                  style={{ maxWidth: "80%" }}
                                />
                              </Col>
                              <Col>
                                {" "}
                                <button
                                  className="btn-grad3"
                                  onClick={() => {}}
                                >
                                  Bid
                                </button>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          data.winner
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
