import React, { useState } from "react";
import { Box, FormHelperText, TextField } from "@mui/material";

interface NamedInputProps {
  label: string;
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
      <TextField
        id="outlined-multiline-flexible"
        label={label}
        onChange={handleChangeValue}
        sx={{ width: "100%" }}
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
