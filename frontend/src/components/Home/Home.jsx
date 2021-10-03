import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import CustomNavBar from "../NavBar/CustomNavBar";
import CategorySizeBar from "./CategorySideBar.jsx";
import Feed from "./Feed";

const drawerWidth = 300;

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomNavBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <CategorySizeBar />
        </Box>
      </Drawer>
      <Feed />
    </Box>
  );
}
