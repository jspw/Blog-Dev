import { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  convertToRaw,
  EditorState,
  ContentState,
  ContentBlock,
} from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DOMPurify from "dompurify";
import Wrapper from "../Wrapper/Wrapper";
import axios from "axios";
import { useHistory } from "react-router";
import { GlobalContext } from "../../Context/GlobalContext";

export default function EditBlog() {
  const {
    location: { blog },
  } = useHistory();

  console.log("blog", blog.content);

  const blocksFromHTML = convertFromHTML(blog.content);

  console.log(blocksFromHTML);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      //   ContentState.createFromBlockArray(
      //     blocksFromHTML.contentBlocks,
      //     blocksFromHTML.entityMap
      //   )
      ContentState.createFromText(blog.content)
    )
  );

  const [categories, setCategories] = useState([]);

  const [user, setUser] = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("category/all")
      .then((categories) => {
        console.log(categories.data);
        setCategories(categories.data);
        setFormData((preState) => {
          return {
            ...preState,
            categoryId: categories.data[0].id,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [convertedContent, setConvertedContent] = useState(null);

  const initFormData = {
    title: blog.title,
    content: blog.title,
    categoryId: blog.categoryId,
    userId: user.id,
  };

  const [formData, setFormData] = useState(initFormData);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    setFormData((preState) => {
      return {
        ...preState,
        content: currentContentAsHTML,
      };
    });
  };

  function handleFormChange(e) {
    setFormData((preData) => {
      return {
        ...preData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleBlogSubmit(e) {
    e.preventDefault();
    console.log(formData);
    updateBlog();
    // console.log(convertToRaw(editorState.getCurrentContent()));
  }

  function updateBlog() {
    axios({
      method: "POST",
      url: `blog/${blog.title}`,
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        history.push(`${formData.title}`);
        setFormData(initFormData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const dropDownCategory = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  return (
    <div className="mt-20">
      <form onSubmit={handleBlogSubmit}>
        <div className="container m-auto  max-w-xl flex flex-col space-y-4 justify-center">
          <div className="text-xl text-blue-400 font-mono font-semibold">
            Blog Title
          </div>
          <div>
            <textarea
              value={formData.title}
              className="w-full border rounded focus:border-white outline-none p-1"
              name="title"
              onChange={handleFormChange}
            ></textarea>
          </div>
          <div className="text-xl text-blue-400 font-mono font-semibold">
            Blog Contents
          </div>
          <div>
            <Editor
              editorState={editorState}
              toolbarClassName="rounded "
              wrapperClassName="rounded-md "
              editorClassName="border-2 rounded"
              onEditorStateChange={handleEditorChange}
            />
          </div>
          <div className="text-xl text-blue-400 font-mono font-semibold">
            Blog Category
          </div>

          <select
            className="p-2 bg-white border-2 rounded"
            onChange={handleFormChange}
            name="categoryId"
          >
            {dropDownCategory}
          </select>

          <button
            className="btn-secondary bg-blue-600 rounded p-2 shadow-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
