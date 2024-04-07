import React from "react";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface InfoStringProps {
  infoText: string;
}

export const InfoString = ({ infoText }: InfoStringProps) => {
  return (
    <Box
      sx={{
        marginLeft: "25px",
        flexDirection: "row",
        color: "#1976d2",
        display: "flex",
        alignItems: "center",
      }}
    >
      <InfoOutlinedIcon
        sx={{ width: "16px", height: "16px", marginRight: "5px" }}
      />
      <Typography>{infoText}</Typography>
    </Box>
  );
};
