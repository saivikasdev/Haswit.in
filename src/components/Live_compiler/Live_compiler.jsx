import React, { useRef, useEffect } from 'react';
import './Live_compiler.css';

const LiveCodeEditor = () => {
  return (
    <iframe
    className='editor'
      src="https://codesandbox.io/s/react-new"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default LiveCodeEditor;





