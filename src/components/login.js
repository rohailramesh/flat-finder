import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Link from "next/link";
import FlatifyDashboard from "@/pages/dashboard";
import styles from "src/styles/login_register.module.css";
export default function Login() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Link href="/dashboard">Head to dashboard</Link>
      <Button
        className={styles.login_btn}
        onClick={handleToggle}
        aria-controls="login-form"
        aria-expanded={open}
        variant="light"
      >
        {open ? "Login" : "Login"}
      </Button>
      <Collapse in={open} className={styles.logincomponent}>
        <Form id="login-form" className="p-5">
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
            Submit
          </Button>
        </Form>
      </Collapse>
    </div>
  );
}
