import {
  Drawer,
  List,
  ListItemText,
  Toolbar,
  Avatar,
  Typography,
  Stack,
  Box,
  Button,
  ListItemButton,
  Link,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export const NavigationDrawer = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        ".MuiDrawer-paper": {
          width: "240px",
          boxSizing: "border-box",
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ backgroundColor: "rgba(144, 162, 219, 0.04)" }}>
          <Stack
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
              }}
            >
              <Typography>ADMIN MENU</Typography>
              <Typography sx={{ color: "#1976d2" }}>
                {user ? user.login : "Guest"}
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
        <ListItemButton component={Link} href="/post">
          <ListItemText primary="Post" />
        </ListItemButton>
        <ListItemButton component={Link} href="/repo">
          <ListItemText primary="Repository" />
        </ListItemButton>
      </List>
      <Button
        component={Link}
        href="/login"
        onClick={() => setUser(null)}
        sx={{ marginTop: "auto" }}
      >
        LOG OUT
      </Button>
    </Drawer>
  );
};
