import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        login-controls="collapse-login"
        login-expanded={open}
      >
        Login
      </Button>
      <Collapse in={open}>
        <div id="collapse-login">Please login to Flatify!</div>
      </Collapse>
    </>
  );
}
