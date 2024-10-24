import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'quill/dist/quill.snow.css';
import Styles from './notes.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notes = ({ active, updateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved');

  useEffect(() => {
    if (active) {
      setTitle(active.title || '');
      setContent(active.description || '');
      setIsEdited(false);
    } else {
      setTitle('');
      setContent('');
      setIsEdited(false);
    }
  }, [active]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsEdited(true);
  };

  const handleContentChange = (value) => {
    setContent(value);
    setIsEdited(true);
  };

  const saveNote = async () => {
    if (!active || !active._id) return;

    try {
      setSaveStatus('Saving...');
      const sessionId = localStorage.getItem("sessionid");
      
      const response = await axios.put(
        `https://notes-backend-x9sp.onrender.com/notes/${active._id}`,
        {
          title,
          description: content,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        console.log('Note saved successfully');
        setIsEdited(false);
        setSaveStatus('Saved');
        toast.success('Note saved successfully');

        updateNote({
          ...active,
          title: title,
          description: content,
        });
      } else {
        console.error('Failed to save note');
        setSaveStatus('Save Failed');
        toast.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      setSaveStatus('Save Failed');
      toast.error('Error saving note');
    }
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
      [{
        "color": [
          "#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc",
          "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc",
          "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66",
          "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00",
          "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000",
          "#663d00", "#666600", "#003700", "#002966", "#3d1466", "custom-color"
        ]
      }],
    ]
  };

  const formats = [
    "header", "height", "bold", "italic", "underline", "strike",
    "blockquote", "list", "color", "bullet", "indent", "link",
    "image", "align", "size",
  ];

  if (!active) {
    return (
      <div className={Styles.noactive}>
        No note selected
      </div>
    );
  }

  return (
    <div className={Styles.notesContainer}>
      <ToastContainer />
      <div className={Styles.noteHeader}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note tit̀̀le"
          className={Styles.noteTitle}
        />
        <button
          className={`${Styles.saveButton} ${!isEdited ? Styles.active : ''}`}
          onClick={saveNote}
          disabled={!isEdited}
        >
          {saveStatus}
        </button>
      </div>
      
      <div className={Styles.noteContents}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
};

export default Notes;