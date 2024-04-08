import React, { useState } from "react";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import {
  PasswordVisibilityOff,
  PasswordVisibilityOn,
} from "../icons/passwordVisibilityIcons";

interface NamedInputProps {
  label: "Name" | "Password" | "Login" | "Email";
  id: string;
  validationFn: (value: string) => boolean;
  onChange: (value: string) => void;
}

export const NamedInput = ({
  label,
  id,
  validationFn,
  onChange,
}: NamedInputProps) => {
  const [error, setError] = useState<string | null>(null);
  //password show/hide
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChangeValue = (e: any) => {
    onChange(e.target.value);

    if (validationFn && !validationFn?.(e.target.value)) {
      setError(`Invalid ${label} format`);
    } else {
      setError(null);
    }
  };

  return (
    <Box
      id={id}
      sx={{
        margin: "15px 25px",
      }}
    >
      <OutlinedInput
        placeholder={label}
        onChange={handleChangeValue}
        sx={{ width: "100%" }}
        type={!showPassword || label !== "Password" ? "text" : "password"}
        endAdornment={
          label === "Password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disableRipple
              >
                {showPassword ? (
                  <PasswordVisibilityOff />
                ) : (
                  <PasswordVisibilityOn />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      <FormHelperText
        sx={{
          display: `${error === null ? "none" : "block"}`,
          color: "#D62F39",
        }}
      >
        {`${error}`}
      </FormHelperText>
    </Box>
  );
};
