import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }: { html: string, text: string }) {
    console.log('handleEditorChange', html, text);
}

// Định nghĩa kiểu dữ liệu cho props là kiểu string
type YourPropsType = {
    yourPropName: string;
}

const YourComponent: React.FC<YourPropsType> = (props) => {
    // Sử dụng props ở đây
    return (
        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
    );
};

export default YourComponent;
