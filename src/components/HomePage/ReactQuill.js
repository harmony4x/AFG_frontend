import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyComponent = (props) => {
    const { value, setValue } = props;

    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default MyComponent;