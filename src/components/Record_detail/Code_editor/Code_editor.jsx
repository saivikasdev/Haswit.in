import React, { useState } from "react";
import Cookies from "universal-cookie";
import AceEditor from "react-ace";
import './Code_editor.css'
// Import Ace editor modes and themes
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import './Code_editor.css'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader";
const LiveCodeEditor = () => {
   const cookies = new Cookies();
   const [loading, setloading] = useState();
   const [code_title, setcode_title] = useState('')
  const [html, setHtml] = useState("<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>");
  const [css, setCss] = useState("body {background-color: powderblue;}h1   {color: blue;}p    {color: red;}");
  const [js, setJs] = useState("");
  const runCode = () => {
    const iframe = document.getElementById("output");
    const iframeContent = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}</body>
        <script>${js}</script>
      </html>
    `;
    iframe.srcdoc = iframeContent;
  };
  let width = window.screen.width;
  const date = new Date();
  const showTime =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  const savecode = async (e) => {
    setloading(true)
   e.preventDefault();
   if (code_title.length > 5) {
     await setDoc(
       doc(
         db,
         "Students",
         cookies.get("user").phoneNumber,
         "Codes",
         code_title
       ),
       {
         html: html,
         css: css,
         js:js,
         time: showTime,
         session: "python dataypes",
         code_title: code_title,
       },
       { merge: true }
     ).then(() => {
      toast('Code saved successfully', {
        position: toast.POSITION.BOTTOM_LEFT,
        className: 'toast-message'
    })
     });
   } else {

   }
   
   setloading(false)
 };



  return (
    <div>
      <div className="Code_field">
         HTML
        <AceEditor
        
        width={(window.innerWidth<1000)?"80vw":"40vw"}
        height="20vh"
        className="edit_code"
          mode="html"
          theme="monokai"
          defaultValue ='<!DOCTYPE html>
          <html>
          <body>
          
          <h1>My First Heading</h1>
          <p>My first paragraph.</p>
          
          </body>
          </html>'
          onChange={(value) => setHtml(value)}
          name="html-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <div className="Code_field">
         CSS
        <AceEditor
        width={(window.innerWidth<1000)?"80vw":"40vw"}
        height="20vh"
        className="edit_code"
          mode="css"
          theme="monokai"
          defaultValue="body {background-color: powderblue;}
          h1   {color: blue;}
          p    {color: red;}"
          onChange={(value) =>{ 
            setCss(value)
            runCode()
         }}
          name="css-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <div className="Code_field">
         Javascript
        <AceEditor
        width={(window.innerWidth<1000)?"80vw":"40vw"}
        height="20vh"
        className="edit_code"
          mode="javascript"
          theme="monokai"
          onChange={(value) => setJs(value)}
          name="js-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <div>
        <div className="code_row">
        <button className="runcode" onClick={runCode}>Run</button>
        
        <form onSubmit={savecode} className="add_note_form">
        <input
                type="text"
                className="code_title"
                placeholder="Code title"
              maxlength="10"
              minLength="5"
              required
                onChange={(e) => {
                  setcode_title(e.target.value);
                }}
              />
              <button className="runcode">Save</button>
              </form>
        </div>

      </div>
      <div>
        <iframe id="output"
        className="output"
        ></iframe>
      </div>
      
      <ToastContainer />
      {
      (loading)?
      <Loader/>:null}
    </div>
  );
};

export default LiveCodeEditor;
