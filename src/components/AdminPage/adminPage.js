import React, { useState } from "react";
import NavBar from "../NavBar";
import { Container, Card, Button, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Row, Col } from "reactstrap";
import "./admin.css";
import { db } from "../../firebase";
import firebase from "firebase";
import bg from "../../assets/bg4.jpg";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AdminPage() {
  const classes = useStyles();
  // const [age, setAge] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interval, setInterval] = useState("");
  const [type, setType] = useState("");
  const [loader, setLoader] = useState(false);
  const [refID, setRefID] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    var date = new Date();
    db.collection("sms-groups")
      .doc(date.valueOf().toString())
      .set(
        {
          status: "Inactive",
          groupName: "",
          amount: amount,
          duration: duration,
          interval: interval,
          type: type,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          refId: date.valueOf().toString(),
          winner: "Not yet decided",
          startedAt: "",
          Bid: amount,
          lowestBidder: "",
       
        },
        { merge: true }
      )
      .then(() => {
        // setRefID()
        setLoader(false);
        history.push("/groupconf", {params: date.valueOf().toString() })
        // alert(date.valueOf().toString());
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setAmount("");
    setDuration("");
    setInterval("");
    setType("");
  };

  const handleChange = (event) => {
    setInterval(event.target.value);
  };

  db.collection("sms-groups");

  return (
    <div style={{ backgroundImage: `url(${bg})`, height: "100vh" }}>
      <NavBar />

      <Card className="items">
        <Card.Header>
          <h3 className="text-center mb-4">Create a New Group</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div class="table">
              <div class="table-content">
                <div class="table-row">
                  <div class="table-title">Select interval</div>
                  <div class="table-data">
                    <Select
                      value={interval}
                      onChange={handleChange}
                      required
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        Interval
                      </MenuItem>
                      <MenuItem value={"Weekly"}>Weekly</MenuItem>
                      <MenuItem value={"Monthly"}>Monthly</MenuItem>
                    </Select>
                  </div>
                </div>
                <div class="table-row">
                  <div class="table-title">Duration</div>
                  <div class="table-data">
                    {" "}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        Duration
                      </MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                      <MenuItem value={36}>36</MenuItem>
                      <MenuItem value={48}>48</MenuItem>
                      <MenuItem value={60}>60</MenuItem>
                    </Select>
                  </div>
                </div>
                <div class="table-row">
                  <div class="table-title">Amount Per interval</div>
                  <div class="table-data">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        amount
                      </MenuItem>
                      <MenuItem value={500}>500</MenuItem>
                      <MenuItem value={1000}>1000</MenuItem>
                      <MenuItem value={2000}>2000</MenuItem>
                      <MenuItem value={4000}>4000</MenuItem>
                      <MenuItem value={5000}>5000</MenuItem>
                      {/* <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </div>
                </div>
                <div class="table-row">
                  <div class="table-title">Type</div>
                  <div class="table-data">
                    {" "}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      displayEmpty
                      className={classes.selectEmpty}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        Type
                      </MenuItem>
                      <MenuItem value={"Bidding"}>Bidding</MenuItem>
                      <MenuItem value={"Lucky Draw"}>Lucky Draw</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
           
            <Button
              className="btn-grad"
              type="submit"
              // onClick={handleSubmit}
            >
              Generate Group
            </Button>
            {/* </Col>
              </Row> */}
            {/* </FormControl> */}

            {/* <div className="hidden">
              {" "}
              Generated Group Referral Id: {}, Please share it with members to
              join.
            </div> */}
          </Form>
          {/* </div> */}
        </Card.Body>
      </Card>
    </div>
  );
}
