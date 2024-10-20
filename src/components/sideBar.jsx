import React, { useState } from "react";
import Styles from "./sideBar.module.css";

const SideBar = () => {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good Morning 🌅";
  } else if (hour < 18) {
    greeting = "Good Afternoon ☀️";
  } else {
    greeting = "Good Evening 🌇";
  }

  const [notes, setnote] = useState([]);
  const [selectedTag, tag] = useState("");
  const [searching, searchingNote] = useState("");
  const [editNoteID, edit] = useState("");
  const [focuednoteID, noteOnFocus] = useState("");

  const addNewNote = () => {
    const newNote = {
      id: Math.random(),
      title: `Note ${notes.length + 1}`,
      content: "",
      tag: "",
    };
    setnote([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setnote(notes.filter((note) => note.id !== id));
    if (focuednoteID === id) {
      noteOnFocus("");
    }
  };

  const colortags = {
    "": "gray",
    red: "red",
    yellow: "yellow",
    green: "green",
    blue: "blue",
    purple: "purple",
  };

  const tagNote = (id, color) => {
    setnote(
      notes.map((note) => (note.id === id ? {...note, tag: color} : note))
    );
  };
  
  const filteredNotes = notes.filter(
    (note) =>
      (note.tag === selectedTag || selectedTag === "" || (selectedTag === "none" && note.tag === "")) &&
      note.title.toLowerCase().indexOf(searching.toLowerCase()) !== -1
  );

  const focusNote = (id) => {
    noteOnFocus(id);
    // console.log(`Notew-${id}`);
  };
  const editingNoteName = (id) => {
    edit(id);
  };

  const editNoteName = (id, name) => {
    setnote(
      notes.map((note) => (note.id === id ? {...note, title: name} : note))
    );
  };

  const finishEditing = () => {
    edit("");
  };

  return (
    <div className={Styles.sideBar}>
      <div className={Styles.greeting}>
        <h1>{greeting}</h1>
      </div>
      <div className={Styles.searchContainer}>
        <img
          src="src/assets/search.svg"
          alt="Search Icon"
          className={Styles.searchIcon}
        />
        <input
          type="text"
          placeholder="Search notes..."
          className={Styles.searchInput}
          value={searching}
          onChange={(note) => searchingNote(note.target.value)}
        />
      </div>
      <div className={Styles.buttonContainer}>
        <button className={Styles.sideBarButton}>
          <img src="src/assets/home.svg" alt="" />
          Home
        </button>
        <button className={Styles.sideBarButton} onClick={addNewNote}>
          <img src="src/assets/addNote.svg" alt="" />
          Add Note
        </button>
      </div>
      <div className={Styles.tagFilter}>
        <select
          className={Styles.sortcolor}
          value={selectedTag}
          onChange={(e) => tag(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="none">⚪ None</option>
          <option value="red">🔴 Red</option>
          <option value="yellow">🟡 Yellow</option>
          <option value="green">🟢 Green</option>
          <option value="blue">🔵 Blue</option>
          <option value="purple">🟣 Purple</option>
        </select>
      </div>
      <div className={Styles.noteList}>
        {filteredNotes.map((note) => (
          <div
            ID={note.id}
            className={`${Styles.noteItem} ${
              focuednoteID === note.id ? Styles.focusedNote : ""
            }`}
          >
            <div
              className={Styles.noteContent}
              onClick={() => focusNote(note.id)}
            >
              <div className={Styles.tagOptions}>
                <button
                  className={Styles.tagButton}
                  style={{backgroundColor: colortags[note.tag]}}
                ></button>
                <div className={Styles.tagMenu}>
                  {Object.entries(colortags).map(([color, value]) => (
                    <button
                      ID={color}
                      className={Styles.tagOption}
                      style={{backgroundColor: value}}
                      onClick={(e) => {
                        tagNote(note.id, color);
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              {editNoteID === note.id ? (
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => editNoteName(note.id, e.target.value)}
                  onBlur={finishEditing}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      finishEditing();
                    }
                  }}
                  className={Styles.editNoteIDInput}
                />
              ) : (
                <span className={Styles.noteTitle}>{note.title}</span>
              )}
            </div>
            <div className={Styles.noteOptions}>
              <button className={Styles.optionsButton}>⋮</button>
              <div className={Styles.optionsMenu}>
                <button
                  onClick={() => {
                    editingNoteName(note.id);
                  }}
                >
                  Rename
                </button>
                <button
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
