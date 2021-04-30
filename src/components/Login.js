import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../css/login.css";
import bg from "../assets/bg4.jpg";
import { db } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
      // .then(
      //   (result) => {
      //     db.collection("users")
      //       .doc(result.user.uid)
      //       .get()
      //       .then( (data) => {
      //         if (data.data().type === "admin")
      //           history.push("/admin");
      //           else
      //           history.push("/user");
      //         // console.log(data.data().type)
      //       });
      //     // console.log(result.user.uid)
      //   }
      // );
      // auth.onAuthStateChanged(function  (user) {
      //   if (user){
      //     console.log(user.uid)
      //   }
      // }
      // history.push("/", { params: user });
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div>
      {/* style={{ backgroundImage: `url(${bg})` }} */}
      <h2 align="center">Welcome to Chit funds</h2>
      <br></br>
      <br />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
