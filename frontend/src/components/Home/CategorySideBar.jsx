import CategoryIcon from "@mui/icons-material/Category";
import {
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Container,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../utility/Spinner";

export default function CategorySideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("category/all")
      .then((categories) => {
       
        setCategories(categories.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  return categories ? (
    <Container style={{ marginTop: "20px" }}>
      <h3
        align="center"
        className="text-2xl font-semibold text-blue-500 m-2  w-full bg-white"
      >
        Category
      </h3>
      <Divider />
      <List>
        {categories.map((category) => (
          <ListItem button key={category.id}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  ) : (
    <Spinner />
  );
}
