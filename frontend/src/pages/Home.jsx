import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import CustomNavBar from "../components/NavBar/CustomNavBar";
import CategorySizeBar from "../components/Home/CategorySideBar.jsx";
import Feed from "../components/Home/Feed";
import axios from "axios";

const drawerWidth = 300;

export default function Home() {
  const [blogs, setBlogs] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("blog/all")
      .then((blogs) => {
        setBlogs(blogs.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <div className="container w-full mt-20 p-4 space-y-4">
        <Feed blogs={blogs} />
      </div>
    </Box>
  );
}
