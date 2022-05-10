import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";

let Block = Quill.import("blots/block");
class BlockBlot extends Block {
  static create() {
    let node = super.create();
    node.setAttribute("class", "custom-div");
    return node;
  }
}
BlockBlot.blotName = "custom";
BlockBlot.tagName = "div";

Quill.register("formats/custom", BlockBlot);

const makeId = (length) => {
  let result = "container_";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.containerId = makeId(5);
    this.modules = {
      toolbar: {
        container: "#" + this.containerId,
      },
    };
    this.state = {
      isRawHtml: false,
    };
  }

  render() {
    let { label, value, onTextEditorChange, placeholder } = this.props;
    return (
      <div>
        <div>
          {label && <label className="react_quill_label">{label}</label>}

          <div className="text-editor">
            <CustomToolbar id={this.containerId} />
            <ReactQuill
              theme={"snow"}
              onChange={onTextEditorChange}
              value={value}
              modules={this.modules}
              formats={TextEditor.formats}
              bounds={".app"}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    );
  }
}
TextEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "custom",
];
export default TextEditor;
