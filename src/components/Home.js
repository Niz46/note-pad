import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [[{ font: [] }], [{ size: [] }], ["link", "image", "video"]],
};

const Main = ({ activeNote, onUpdateNote }) => {
  const [value, setValue] = useState("");
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );
};

export default Main;
