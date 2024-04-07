import { Box } from "@mui/material";
import { NavigationDrawer } from "../leftNavigationDrawer";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <NavigationDrawer />
      <Box sx={{ width: "100%", marginLeft: "240px" }}>{children}</Box>
    </Box>
  );
};
