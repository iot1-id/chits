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
import moment from "moment"
import bg from "../../assets/bg4.jpg";
// import { IoMdRadioButtonOn } from "react-icons/io";
// var date= new Date().getDay();
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
  const [userGroups, setUserGroups] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [bid, setBid] = useState();
  const [name, setName] = useState("");
  let history = useHistory();
  const classes = useStyles();
  const getLength = (refId) => {
    // console.log(refId);
    db.collection("sms-groups")
      .doc(refId)
      .collection("members")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.length);
        setMembersList((result) => [...result, snapshot.docs.length]);
      });
  };

  const getUsername = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((result) => {
        // console.log(result.data());
        setName(result.data().displayName);
      });
  };
  const getUserGroups = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("sms-groups")
      .onSnapshot((result) => {
        const isCollectionEmpty = result.docs.length === 0;
        if (!isCollectionEmpty) {
          const List = result.docs.map((doc) => {
            return doc.id;
          });

          setUserGroups([...List]);
        }
      });
  };

  const bidding = () => {
    // console.log(id)

    db.collection("sms-groups")
      .doc(id)
      .set({ Bid: bid, lowestBidder: name }, { merge: true });
  };

  useEffect(() => {
    getUserGroups();
    getUsername();

    db.collection("sms-groups").onSnapshot((querySnapshot) => {
      const isCollectionEmpty = querySnapshot.docs.length === 0;
      if (!isCollectionEmpty) {
        const List = querySnapshot.docs.map((doc) => {
          getLength(doc.data().refId);
          setId(doc.data().refId);
          // userGroups.forEach((element) => {
          //   if (element === doc.id) {
          //     console.log(doc.id)
          //     // return doc.data
          //   }
          // });

          // console.log(doc.id);
          return doc.data();
        });

        // console.log(List);
        setSmsList([...List]);
      }
    });
  }, []);
  // console.log(userGroups);
  // console.log(smsList);
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
            {/* {smsList.map((data, i ) => {
              if (userGroups.include(data)){
                return ( <h1>ehjeb</h1>
                 )}}} */}
            {smsList.map((data, i) => {
              if (userGroups.includes(data.refId)) {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {/* {data.groupName ? "Group Name:" : "Group No.: "}
                              &nsbp; */}
                        Group: {data.groupName ? data.groupName : i + 1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div class="table">
                        <div class="table-content">
                          {error && (
                            <div class="table-row">
                              <div
                                class="table-title"
                                style={{ color: "red", textAlign: "center" }}
                              >
                                {error}
                              </div>
                            </div>
                          )}
                          {data.status === "Active" ? (
                            <div class="table-row">
                              <div class="table-title">Group Started:</div>
                              <div class="table-data">
                                {moment(data.createdAt.toDate()).fromNow()}
                              </div>
                            </div>
                          ) : (
                            <div class="table-row">
                              <div class="table-title">Status:</div>
                              <div class="table-data">Inactive</div>
                            </div>
                          )}

                          <div class="table-row">
                            <div class="table-title">Members:</div>
                            <div class="table-data">{membersList[i]}</div>
                          </div>
                          <div class="table-row">
                            <div class="table-title">Referral Id:</div>
                            <div class="table-data">{data.refId}</div>
                          </div>
                          {/* <div class="table-row">
                            <div class="table-title">Interval:</div>
                            <div class="table-data">{data.interval}</div>
                          </div> */}
                          <div class="table-row">
                            <div class="table-title">Amount:</div>
                            <div class="table-data">₹&nbsp;{data.amount} </div>
                          </div>
                          <div class="table-row">
                            <div class="table-title">Total Period:</div>
                            <div class="table-data">
                              {data.duration}{" "}
                              {data.interval === "Monthly" ? "months" : "weeks"}
                            </div>
                          </div>
                          {/* {data.status === "Active" && ( */}
                            {/* <div class="table-row">
                              <div class="table-title">Remaining Period:</div>
                              <div class="table-data"> */}
                                {/* {console.log(
                                  moment(data.createdAt.toDate()).fromNow()
                                )} */}
                                {/* todo */}
                                {/* {data.interval === "Monthly"
                                  ? "months"
                                  : "weeks"} */}
                              {/* </div> */}
                            {/* </div> */}
                          {/* )} */}
                          <div class="table-row">
                            <div class="table-title">Type:</div>
                            <div class="table-data">{data.type}</div>
                          </div>
                          {data.type === "Bidding" &&
                          data.status === "Active" ? (
                            <div class="table-row">
                              <div class="table-title">
                                Lowest Bid{" "}
                                {data.interval === "Monthly"
                                  ? "of the month"
                                  : " of the week"}
                                :
                              </div>
                              <div class="table-data">
                                ₹&nbsp;{data.Bid}{" "}
                                {data.lowestBidder
                                  ? "by " + data.lowestBidder
                                  : ""}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {/* {console.log(auth.currentUser)} */}
                          {data.status === "Active" ? (
                            <div class="table-row">
                              <div class="table-title">
                                {data.type === "Bidding"
                                  ? "Your Bid:"
                                  : "Lucky draw Winner:"}

                                {/* "Winner of the" +  `{data.interval == "Monthly" ? "Month" : "Week}` */}
                              </div>
                              {data.type === "Bidding" ? (
                                <div class="table-data">
                                  <Row>
                                    <Col>
                                      <Form.Control
                                        type="text"
                                        placeholder={data.amount}
                                        onChange={(e) => setBid(e.target.value)}
                                        style={{ maxWidth: "80%" }}
                                      />
                                      {/* {bid} */}
                                    </Col>
                                    <Col>
                                      {" "}
                                      <button
                                        className="btn-grad3"
                                        onClick={(e) =>
                                          data.Bid > bid
                                            ? (bidding(), setError(""))
                                            : setError(
                                                "Cannot bid higher than the current bid"
                                              )
                                        }
                                        // {{data.Bid > bid ? onClick={bidding} : onClick={ setError("Cannot bid higher than the current bid") }}}
                                      >
                                        Bid
                                      </button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : (
                                <div class="table-data">{data.Winner}</div>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              }
            })}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
