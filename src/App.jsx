import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SideBar from "./components/sidebar/sideBar";
import Notes from "./components/notes/notes";
import AI from "./components/ai/ai";
import Register from "./components/registerPage/register";
import Login from "./components/LoginPage/Login";

const App = () => {
  const [active, setActive] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [searching, setSearchingNote] = useState("");
  const [notes, setNotes] = useState([]);


  const newNote = () => {
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
      setActive("");
    }
  };

  const updateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotesArr);
  };

  const colorTag = (id, color) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, tag: color } : note))
    );
  };


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/user/signup" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route
            path="/notes"
            element={
                <>
                  <SideBar
                    notes={notes}
                    setNotes={setNotes}
                    newnote={newNote}
                    deleteNote={deleteNote}
                    active={active}
                    setactive={setActive}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    searching={searching}
                    searchingNote={setSearchingNote}
                    colortag={colorTag}
                  />
                  <AI />
                  <Notes className="notes" active={active} updateNote={updateNote} />
                </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;