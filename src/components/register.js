import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import styles from "src/styles/login_register.module.css";

export default function Register(props) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleNameChange = (e) => {
    props.setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    props.setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    props.setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister();
    // Do something with email and password
  };
  return (
    <div>
      <Button
        className={styles.register_btn}
        onClick={handleToggle}
        aria-controls="register-form"
        aria-expanded={open}
        variant="light"
      >
        {open ? "Register" : "Register"}
      </Button>
      <Collapse in={open} className={styles.registercomponent}>
        <Form id="register-form" className="p-5">
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={props.name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={props.email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={props.password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <br></br>
          <div></div>
          <Button variant="light" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </Collapse>
    </div>
  );
}
