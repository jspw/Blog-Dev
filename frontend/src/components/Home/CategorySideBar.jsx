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

export default function CategorySideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("category/all")
      .then((categories) => {
        console.log(categories.data);
        setCategories(categories.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h3 align="center">Category</h3>
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
  );
}
