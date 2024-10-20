import React, { useState } from "react";
import Styles from "./sideBar.module.css";

const SideBar = ({
  notes,
  setNotes,
  newnote,
  deleteNote,
  active,
  setactive,
  selectedTag,
  setSelectedTag,
  searching,
  searchingNote,
  colortag,
}) => {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good Morning 🌅";
  } else if (hour < 18) {
    greeting = "Good Afternoon ☀️";
  } else if (hour >= 19 || hour < 6) {
    greeting = "Good Evening 🌙";
  } else {
    greeting = "Good Evening 🌇";
  }

  const [editNoteID, editingNoteID] = useState("");

  const colortags = {
    "": "gray",
    red: "red",
    yellow: "yellow",
    green: "green",
    blue: "blue",
    purple: "purple",
  };

  const filteredNotes = notes.filter(
    (note) =>
      (note.tag === selectedTag ||
        selectedTag === "" ||
        (selectedTag === "none" && note.tag === "")) &&
      note.title.toLowerCase().indexOf(searching.toLowerCase()) !== -1
  );

  const editingNoteName = (id) => {
    editingNoteID(id);
  };

  const editNoteName = (id, name) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: name } : note
    );
    setNotes(updatedNotes);

    if (active && active.id === id) {
      setactive({ ...active, title: name });
    }
  };

  const finishEditing = () => {
    editingNoteID("");
  };

  const homeClick = () => {
    setactive("");
  };

  const textLghtReduce = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <input type="checkbox" id="hamburger" className={Styles.hamburger} />
      <label htmlFor="hamburger" className={Styles.hamburger}></label>
      <div className={Styles.sideBar}>
        <div className={Styles.greeting}>
          <h1>{greeting}</h1>
        </div>
        <div className={Styles.searchContainer}>
          <img
            src="/assets/search.svg"
            alt="Search Icon"
            className={Styles.searchIcon}
          />
          <input
            type="text"
            placeholder="Search notes..."
            className={Styles.searchInput}
            value={searching}
            onChange={(e) => searchingNote(e.target.value)}
          ></input>
        </div>

        <div className={Styles.buttonContainer}>
          <button className={Styles.sideBarButton} onClick={homeClick}>
            <img src="/assets/home.svg" alt="" />
            Home
          </button>
          <button
            className={Styles.sideBarButton}
            onClick={(e) => {
              e.preventDefault();
              newnote();
            }}
          >
            <img src="/assets/addNote.svg" alt="" />
            Add Note
          </button>
        </div>

        <div className={Styles.tagFilter}>
          <select
            className={Styles.sortcolor}
            value={selectedTag}
            onChange={(e) => {
              e.preventDefault();
              setSelectedTag(e.target.value);
            }}
          >
            <option value="">🔘 All</option>
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
              key={note.id}
              className={`${Styles.noteItem} ${
                active && active.id === note.id ? Styles.focusedNote : ""
              }`}
            >
              <div className={Styles.noteContent} onClick={() => setactive(note)}>
                <div className={Styles.tagOptions}>
                  <button
                    className={Styles.tagButton}
                    style={{ backgroundColor: colortags[note.tag] }}
                  ></button>
                  <div className={Styles.tagMenu}>
                    {Object.keys(colortags).map((color) => (
                      <button
                        key={color}
                        className={Styles.tagOption}
                        style={{ backgroundColor: colortags[color] }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          colortag(note.id, color);
                        }}
                      ></button>
                    ))}
                  </div>
                </div>
                {editNoteID === note.id ? (
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => editNoteName(note.id, textLghtReduce(e.target.value, 15))}
                    onBlur={finishEditing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        finishEditing();
                      }
                    }}
                    className={Styles.editNoteIDInput}
                  />
                ) : (
                  <span className={Styles.noteTitle} title={note.title}>
                    {note.title.length > 15 ? `${note.title.substring(0, 15)}...` : note.title}
                  </span>
                )}
              </div>
              <div className={Styles.noteOptions}>
                <button
                  className={Styles.optionsButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    editingNoteName(note.id);
                  }}
                >
                  Rename
                </button>
                <button
                  className={Styles.optionsButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;