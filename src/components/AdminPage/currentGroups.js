import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Row, Col, Modal, ModalBody } from "reactstrap";
import NavBar from "../NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import bg from "../../assets/bg4.jpg";
import { auth, db } from "../../firebase";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CurrentGroups() {
  // const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [smsList, setSmsList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [status, setStatus] = useState("Inactive");
  const [id, setId] = useState("");
  const [groupName, setGroupName] = useState("");

  // const smsRef = db.collection("sms-groups");
  var time = new Date().getMonth();
  const getLength = (refId) => {
    // console.log(refId)
    db.collection("sms-groups")
      .doc(refId)
      .collection("members")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.length);
        setMembersList((result) => [...result, snapshot.docs.length]);
      });
  };

  const changeName = (id) => {
    console.log(id);
    try {
      console.log(id);
      db.collection("sms-groups").doc(id).set(
        {
          groupName: groupName,
        },
        { merge: true }
      );
    } catch (e) {
      console.error(e);
    }
    setToggle(false);
  };

  useEffect(() => {
    db.collection("sms-groups").onSnapshot((querySnapshot) => {
      const isCollectionEmpty = querySnapshot.docs.length === 0;
      if (!isCollectionEmpty) {
        const List = querySnapshot.docs.map((doc) => {
          getLength(doc.data().refId);
          setId(doc.data().refId);
          // console.log(id)
          return doc.data();
        });

        // console.log(List);
        setSmsList([...List]);
      }
    });
  }, []);

  // console.log(smsList);

  const classes = useStyles();
  return (
    <div style={{ backgroundImage: `url(${bg})`, height: "100vh" }}>
      <NavBar />

      <Card className="items">
        <Card.Header>
          <h3 className="text-center mb-4">SMS Groups</h3>
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
                        <div class="table-title">Group Name</div>
                        <div class="table-data">
                          {data.groupName ? data.groupName : i + 1}
                          {/* {console.log(data.refId)} */}

                          <IconButton onClick={() => setToggle(true)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <Modal
                            isOpen={toggle}
                            toggle={() => setToggle(false)}
                          >
                            <div className="modal-header justify-content-center">
                              <button
                                className="close"
                                type="button"
                                onClick={() => setToggle(false)}
                              >
                                {/* <i className="now-ui-icons ui-1_simple-remove"></i> */}
                              </button>
                              <h4 className="title">Change Group Name</h4>
                            </div>
                            <ModalBody>
                              <Row>
                                <Col>
                                  <h3>Enter Name: </h3>
                                </Col>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="New Name"
                                    onChange={(e) =>
                                      setGroupName(e.target.value)
                                    }
                                    style={{ maxWidth: "80%" }}
                                  />
                                  {/* {console.log(groupName)} */}
                                </Col>
                              </Row>
                              <Row>
                                <button
                                  className="btn-grad3"
                                  // onClick={() => changeName(smsList)}
                                >
                                  Change Group Name
                                </button>
                                {i}
                              </Row>
                            </ModalBody>
                          </Modal>
                        </div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Status</div>
                        <div class="table-data">
                          {data.status}
                          {/* {membersList[i] === 50 ? "Active" : "Inactive"} */}
                        </div>
                      </div>
                      {data.status === "Active" ? (
                        data.interval === "Monthly" ? (
                          <div class="table-row">
                            <div class="table-title">Months Done</div>
                            <div class="table-data">{time}</div>
                          </div>
                        ) : (
                          <div class="table-row">
                            <div class="table-title">Weeks Done</div>
                            <div class="table-data">{time}</div>
                          </div>
                        )
                      ) : (
                        ""
                      )}
                      <div class="table-row">
                        <div class="table-title">Members</div>
                        <div class="table-data">{membersList[i]}</div>
                      </div>
                      <div class="table-row">
                        <div class="table-title">Referral Id:</div>
                        <div class="table-data">{data.refId}</div>
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
                      {/* {if (data.type==="bidding"){

                      }} */}
                      <div class="table-row">
                        <div class="table-title">Type</div>
                        <div class="table-data">{data.type}</div>
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
