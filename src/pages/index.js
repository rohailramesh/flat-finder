import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/login_register.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spline from "@splinetool/react-spline";
import Login from "@/components/login";
import Register from "@/components/register";
import Image from "next/image";
import FlatifyDashboard from "./dashboard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { notification } from "antd";
import UserService from "@/services/UserService";
import { LoadScript } from "@react-google-maps/api";
import Loading from "../components/Loading";
import AdminDashboard from "./admin";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUser } from "@/redux/userSlice";
import SignIn from "@/components/SignIn";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const [api, popUp] = notification.useNotification();

  const userService = new UserService();
  const dispatch = useDispatch();
  const session = useSession();
  const supabase = useSupabaseClient();

  function openNotificationWithIcon(type) {
    api[type]({
      message: "Confirmation email sent!",
      duration: 3,
      description:
        "We sent you a confirmation email. Click on the link provided to confirm your account and login",
    });
  }

  async function handleRegister() {
    const user = await userService.register(supabase, name, email, password);
    setEmailSent(true);
    openNotificationWithIcon("success");
    setCurrentUser(user);
  }

  async function handleLogin() {
    const user = await userService.login(supabase, email, password);
    setIsAdmin(user.is_admin);
    dispatch(setUser(user));
    setCurrentUser(user);
  }

  useEffect(() => {
    (async () => {
      const user_profile = await userService.getAuthUserProfile(supabase);
      setIsAdmin(user_profile.is_admin);
    })();
  }, [session]);

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      loadingElement={<Loading />}
    >
      {popUp}
      {session ? (
        isAdmin === null ? (
          <Loading />
        ) : isAdmin ? (
          <AdminDashboard />
        ) : (
          isAdmin === false && <FlatifyDashboard />
        )
      ) : (
        <>
          <div
            style={{
              // backgroundColor: "#2a3e78",
              // background: "linear-gradient(135deg, #2a3e78, #4e6cb0)",
              // background: "linear-gradient(135deg, #2a3e78, #5a5ab6, #2a3e78, #5d6b94)",
              background: "linear-gradient(135deg, #2a3e78, #5a5ab6, #2a3e78)",
              // background: "linear-gradient(135deg,  #ff7e5f, #4e6cb0)",
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  minWidth: "20%",
                  padding: "2rem",
                  borderRadius: "10px",
                  transform: "translateY(-2rem)",
                }}
              >
                <Image
                  src="/Fdm-logo-black.jpeg"
                  width={200}
                  height={200}
                  alt="logo"
                  // style={{ margin: "1rem" }}
                />
                <SignIn
                  name={name}
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setName={setName}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                  handleRegister={handleRegister}
                  emailSent={emailSent}
                />
              </div>

              <div
                style={{
                  minWidth: "50%",
                  alignSelf: "stretch",
                  maxWidth: "70%",
                }}
              >
                <Spline scene="https://prod.spline.design/hi0Jxh3HBgXwoleJ/scene.splinecode" />
              </div>
            </div>
          </div>
        </>
      )}
    </LoadScript>
  );
}
