import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar'

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
import { useLocation } from "react-router-dom";

export default function GroupConf() {
  const location = useLocation();
//   const myparam = location.state.params;

    const [id, setId] = useState(location.state.params);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(id)
      db.collection("sms-groups")
        .doc(id)
        .get()
        .then((snapshot) => {
          setData(snapshot.data());
          // console.log(snapshot.data());
        });
    }, []);



    return (
      <div style={{ backgroundImage: `url(${bg})`, height: "100vh" }}>
        <NavBar />

        <Card className="items">
          <Card.Header>
            <h3 className="text-center mb-4">Share your Group Details</h3>
          </Card.Header>
          <Card.Body>
            <div class="table">
              <div class="table-content">
                <div class="table-row">
                  <div class="table-title">Referral Id:</div>
                  <div class="table-data">
                    <b>{id}</b>
                  </div>
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
          </Card.Body>
        </Card>
      </div>
    );
}
