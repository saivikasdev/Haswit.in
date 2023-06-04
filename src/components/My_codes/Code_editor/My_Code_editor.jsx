import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import './My_Code_editor.css'
import Cookies from "universal-cookie";
// Import Ace editor modes and themes
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
const My_Code_editor = () => {
  const cookies = new Cookies();
  const [html, setHtml] = useState(cookies.get("html"));
  const [css, setCss] = useState(cookies.get("css"));
  const [js, setJs] = useState(cookies.get("js"));

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

  const savecode = async () => {
    await setDoc(
      doc(
        db,
        "Students",
        cookies.get("user").phoneNumber,
        "Codes",
        cookies.get("Code")
      ),
      {
        html: html,
        css: css,
        js: js,
      },
      { merge: true }
    ).then(() => {
      toast('Code Saved', {
        position: toast.POSITION.BOTTOM_LEFT,
        className: 'toast-message'
    })
    });
  };

  return (
    <div>
      <div className="My_editor_row">
        <div>
          HTML
          <AceEditor
            width="40vw"
            height="40vh"
            className="My_editor"
            mode="html"
            theme="monokai"
            defaultValue={cookies.get("html")}
            onChange={(value) => {
              setHtml(value);

              runCode();
            }}
            name="html-editor"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div>
          CSS
          <AceEditor
            width="40vw"
            height="40vh"
            className="My_editor"
            mode="css"
            theme="monokai"
            defaultValue={cookies.get("css")}
            onChange={(value) => {
              setCss(value);
              runCode();
            }}
            name="css-editor"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>

      <div>
        <div className="My_editor_row">
          <div>
            Javascript
            <AceEditor
              width="40vw"
              height="40vh"
              className="editor"
              defaultValue={cookies.get("js")}
              mode="javascript"
              theme="monokai"
              onChange={(value) => {
                setJs(value);

                runCode();
              }}
              name="js-editor"
              editorProps={{ $blockScrolling: true }}
            />
            <button className="My_runcode" onClick={runCode}>
              Run
            </button>
            <button
              className="My_runcode"
              onClick={() => {
                savecode();
              }}
            >
              Save
            </button>
          </div>
          <div>
            <iframe id="output" className="My_output"></iframe>
          </div>
        </div>
      </div>
        <ToastContainer />
    </div>
  );
};

export default My_Code_editor;
