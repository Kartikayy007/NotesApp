import React, { useState } from 'react';
import './App.css';
import SideBar from './components/sidebar/sideBar';
import Notes from './components/notes/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [active, setactive] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [searching, searchingNote] = useState("");

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
      setactive(null);
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
      <Notes className="notes" active={active} onUpdateNote={updateNote} />
    </div>
  );
};

export default App;