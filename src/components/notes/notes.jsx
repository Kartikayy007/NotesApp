import React, { useState, useEffect } from 'react';
import Styles from './notes.module.css';

const Notes = ({ active, onUpdateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (active) {
      setTitle(active.title);
      setContent(active.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [active]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdateNote({
      ...active,
      title: e.target.value,
    });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onUpdateNote({
      ...active,
      content: e.target.value,
    });
  };

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
          onChange={handleTitleChange}
          placeholder="Note Title"
          className={Styles.noteTitle}
        />
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Write your note here..."
        className={Styles.noteContent}
      />
    </div>

    </>
  );
};

export default Notes;