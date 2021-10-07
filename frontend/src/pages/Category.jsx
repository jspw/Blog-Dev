import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Feed from "../components/Home/Feed";
import Spinner from "../components/utility/Spinner";

export default function Category() {
  const { name } = useParams();

  const [blogs, setBlogs] = useState(null);

  useEffect(function () {
    axios
      .get(`category/${name}`)
      .then(({ data }) => {
        setBlogs(data.blogs);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="container  w-full mt-20 p-4 space-y-4">
      <div className="text-2xl text-center text-pink-500 p-4 border-b-2">
        Category : {name}
      </div>
      {blogs ? <Feed blogs={blogs} /> : <Spinner />}
    </div>
  );
}
