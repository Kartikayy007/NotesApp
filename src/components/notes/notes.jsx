import React, { useState, useEffect } from 'react';
import Styles from './notes.module.css';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const Notes = ({ active, updateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEdited, editied] = useState(false);

  useEffect(() => {
    if (active) {
      setTitle(active.title);
      setContent(active.content);
      editied(false);
    } else {
      setTitle('');
      setContent('');
      editied(false);
    }
  }, [active]);

  const changetitle = (e) => {
    setTitle(e.target.value);
    editied(true);
  };

  const notecontent = (value) => {
    setContent(value);
    editied(true);
  };

  const savenotes = () => {
    updateNote({
      ...active,
      title: title,
      content: content,
    });
    editied(false);
  };

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  const formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  if (!active) {
    return <div className={Styles.noactive}>No note selected</div>;
  }

  return (
    <>
      <div className={Styles.notesContainer}>
        <div className={Styles.noteHeader}>
          <input
            type="text"
            value={title}
            onChange={changetitle}
            placeholder="Note Title"
            className={Styles.noteTitle}
          />
          <button 
            onClick={savenotes}
            className={`${Styles.saveButton} ${isEdited ? Styles.active : ''}`}
            disabled={!isEdited}
          >
            {isEdited ? 'Save' : 'Saved'}
          </button>
        </div>
        <ReactQuill
          modules={modules}
          formats={formats}
          value={content}
          onChange={notecontent}
          className={Styles.noteContents}
        />
      </div>
    </>
  );
};

export default Notes;