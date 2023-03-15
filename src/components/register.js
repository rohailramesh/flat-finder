import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import styles from "src/styles/login_register.module.css";

export default function Register() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
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
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <br></br>
          <Button variant="light" type="submit">
            Register
          </Button>
        </Form>
      </Collapse>
    </div>
  );
}
