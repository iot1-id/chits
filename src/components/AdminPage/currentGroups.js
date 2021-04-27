import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import NavBar from "../NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import bg from "../../assets/bg4.jpg";
import { auth, db } from "../../firebase";
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
  const [smsList, setSmsList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [status, setStatus] = useState("Inactive");

  // const smsRef = db.collection("sms-groups");

  const getLength = (refId) => {
    console.log(refId)
    db.collection("sms-groups")
      .doc(refId)
      .collection("members")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.length);
        setMembersList(result=>[...result, snapshot.docs.length]);
      });

      
  };

  useEffect(() => {
    db.collection("sms-groups").onSnapshot((querySnapshot) => {
      const isCollectionEmpty = querySnapshot.docs.length === 0;
      if (!isCollectionEmpty) {
        const List = querySnapshot.docs.map((doc) => {
          getLength(doc.data().refId)
          return doc.data();
        });

        console.log(List);
        setSmsList([...List]);

      }

    });

  }, []);

  console.log(smsList);

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
                        <div class="table-title">Status</div>
                        <div class="table-data">{membersList[i] ===50 ? "Active" : "Inactive" }</div>
                      </div>
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
