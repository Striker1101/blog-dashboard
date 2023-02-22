import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {Button} from "../components/styles/Button.styled"
export default function App({ submit, post }) {
  const editorRef = useRef(null);
  const log = function () {
    if (editorRef.current) {
      const content = editorRef.current.getContent();

      submit(content);
    }
  };

  return (
    <>
      <Editor
        className="content2"
        name="content2"
        apiKey={process.env.REACT_APP_TINY_API}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={post ? post.content : "write content here ......"}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <Button 
      bg={"black"}
      color={"wheat"}
      style={{ margin: "10px" }} onClick={log}>
        {post ? "Update" : "Add"}
      </Button>
    </>
  );
}
