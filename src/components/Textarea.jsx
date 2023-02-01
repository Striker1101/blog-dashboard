import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App({submit}) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
     const content =editorRef.current.getContent();

     submit(content)
    }
  };
  
  return (
    <>
      <Editor
        className ='content2'
         name = 'content2'
        apiKey= "ndo36fpqlukde2s8lzy8kgdoknu17gg2vbw3ai62h2uubjit"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>write your content here</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button style={{margin:'10px'}} onClick={log}>Submit</button>
    </>
  );
}