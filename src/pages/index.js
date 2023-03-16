import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spline from "@splinetool/react-spline";
import Login from "@/components/login";
import Register from "@/components/register";
import Image from "next/image";
import styles from "src/styles/login_register.module.css";
import User from "@/services/user";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState("");
  const [user, setUser] = useState("");
  const userService = new User();

  useEffect(() => {
    setSession(localStorage.getItem("access_token"));
    if (session) {
      console.log("The session");
    } else {
      console.log("No session");
    }
  });

  async function handleRegister() {
    const data = await userService.register(name, email, password);
    localStorage.setItem("access_token", data.session.access_token);
    setSession(data.session.access_token);
    setUser(data.user);
  }
  return (
    <div className="main-div">
      {session ? (
        <div>Dashboard</div>
      ) : (
        <Container className="main-container">
          <Row>
            <Col sm={12} md={6} className="text-light p-5">
              <div className={styles.logo}>
                <Image src="/fdmlogo.png" width={200} height={200} alt="logo" />
              </div>
              <Row>
                <Col>
                  <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                  />
                </Col>
                <Col>
                  <Register
                    email={email}
                    setEmail={setEmail}
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    handleRegister={handleRegister}
                  />
                </Col>
              </Row>
            </Col>

            <Col sm={12} md={6} className="p-5">
              <div></div>
              <div className="container">
                <Spline scene="https://prod.spline.design/G9WRoRn2ZkIOLcxr/scene.splinecode" />
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <Row>
        <div className={styles.slogan}>
          <h1>Helping Connect FDMers Globally</h1>
        </div>
      </Row>
    </div>
  );
}
