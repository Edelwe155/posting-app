import { Paper, Box, Button, Typography } from "@mui/material";

interface MediaSectionWrapperProps {
  sectionName: string;
  buttonFn?: (location: string) => void;
  withoutButtons?: boolean;
  children?: React.ReactNode;
  sx?: object;
}

export const MediaSectionWrapper = ({
  sectionName,
  withoutButtons,
  buttonFn,
  children,
  sx,
}: MediaSectionWrapperProps) => {
  const deleteFn = buttonFn ? buttonFn : () => {};

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
      <Box sx={{ borderBottom: "1px solid #1976d2" }}>
        <Typography sx={{ marginBottom: "5px", fontSize: "18px" }}>
          {sectionName}
        </Typography>
      </Box>
      {children}
      <Box
        sx={{
          borderTop: "1px solid #1976d2",
          marginTop: "auto",
          pt: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!withoutButtons && (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteFn(sectionName)}
          >
            Remove
          </Button>
        )}
      </Box>
    </Paper>
  );
};
