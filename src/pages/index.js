import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spline from "@splinetool/react-spline";
import Login from "@/components/login";
import Register from "@/components/register";
import Image from "next/image";
import styles from "src/styles/login_register.module.css";

export default function Home() {
  return (
    <div className="main-div">
      <Container className="main-container">
        <Row>
          <Col sm={12} md={6} className="text-light p-5">
            <div className={styles.logo}>
              <Image src="/fdmlogo.png" width={200} height={200} />
            </div>
            <Row>
              <Col>
                <Login />
              </Col>
              <Col>
                <Register />
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
      <Row>
        <div className={styles.slogan}>
          <h1>Helping Connect FDMers Globally</h1>
        </div>
      </Row>
    </div>
  );
}
