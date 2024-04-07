import React, { useState } from "react";
import { Box, Button, Link, Paper, Typography } from "@mui/material";
import { NamedInput } from "../elements/namedInput";
import { isEmail, isPassword } from "../utils/validation";
import { InfoString } from "../elements/infoString";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  //login data
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const resetLoginPageData = () => {
    setEmail("");
    setPass("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        pass,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        resetLoginPageData();
        toast.success("Logged in successfully");
        navigate("/post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          width: "30%",
          maxWidth: 400,
          height: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            margin: "25px",
          }}
        >
          Welcome
        </Typography>
        <InfoString infoText="Login to continue" />
        <NamedInput
          label={"Email"}
          id={"email-input-signin"}
          validationFn={isEmail}
          onChange={setEmail}
        />
        <NamedInput
          label={"Password"}
          id={"password-input-signin"}
          validationFn={isPassword}
          onChange={setPass}
        />
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          Login with your existing or{" "}
          <Link href="/register" underline="hover">
            create new
          </Link>{" "}
          account
        </Typography>
        <Button
          type="submit"
          // disabled={!(isName(login) && isPassword(pass))}
          sx={{
            marginTop: "auto",
            fontSize: 25,
            backgroundColor: "rgba(144, 162, 219, 0.04)",
          }}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
};
