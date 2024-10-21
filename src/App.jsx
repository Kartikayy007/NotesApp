import React, { useState, useEffect } from 'react';
import './App.css';
import SideBar from './components/sidebar/sideBar';
import Notes from './components/notes/notes';
import AI from './components/ai/ai';

const App = () => {
  const [active, setactive] = useState('');
  const [selectedTag, setSelectedTag] = useState("");
  const [searching, searchingNote] = useState("");
  
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const newnote = () => {
    const newNote = {
      id: Math.random(),
      title: `Note ${notes.length + 1}`,
      content: "",
      tag: "",
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (active && active.id === id) {
      setactive('');
    }
  };

  const updateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotesArr);
  };

  const colortag = (id, color) => {
    setNotes(
      notes.map((note) => (note.id === id ? {...note, tag: color} : note))
    );
  };

  return (
    <div className="App">
      <SideBar
        notes={notes}
        setNotes={setNotes}
        newnote={newnote}
        deleteNote={deleteNote}
        active={active}
        setactive={setactive}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        searching={searching}
        searchingNote={searchingNote}
        colortag={colortag}
      />
      <AI />
      <Notes className="notes" active={active} updateNote={updateNote} />
    </div>
  );
};

export default App;