import React, { useState } from "react";
import { Box, Button, Paper, Link, Typography } from "@mui/material";
import { NamedInput } from "../elements/namedInput";
import { isEmail, isName, isPassword } from "../utils/validation";
import { InfoString } from "../elements/infoString";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  // register data
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const resetRegPageData = () => {
    setLogin("");
    setEmail("");
    setPass("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        login,
        email,
        pass,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        resetRegPageData();
        toast.success("User created successfully");
        navigate("/");
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
          maxHeight: "70%",
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
          Registration
        </Typography>
        <InfoString infoText="Login will be visible to all users" />
        <NamedInput
          label={"Login"}
          id={"login-input-signin"}
          validationFn={isName}
          onChange={setLogin}
        />
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
            marginBottom: "15px",
          }}
        >
          <Link href="/login" underline="hover">
            Login
          </Link>{" "}
          with your existing account
        </Typography>
        <Button
          type="submit"
          // disabled={!(isName(login) && isPassword(pass) && isEmail(email))}
          sx={{
            marginTop: "auto",
            fontSize: 25,
            backgroundColor: "rgba(144, 162, 219, 0.04)",
          }}
        >
          Create User
        </Button>
      </Paper>
    </Box>
  );
};
