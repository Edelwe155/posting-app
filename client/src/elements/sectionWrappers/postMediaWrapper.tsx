import { Paper, Box, Button, Typography } from "@mui/material";

interface MediaSectionWrapperProps {
  children?: React.ReactNode;
  sx?: object;
}

export const MediaSectionWrapper = ({
  children,
  sx,
}: MediaSectionWrapperProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        padding: "10px",
        ...sx,
      }}
    >
      <Box sx={{ borderBottom: "1px solid #1976d2" }}></Box>
      {children}
      <Box
        sx={{
          borderTop: "1px solid #1976d2",
          marginTop: "auto",
          pt: 1,
        }}
      />
    </Paper>
  );
};
