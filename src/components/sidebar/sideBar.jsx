import React, { useState, useEffect } from "react";
import Styles from "./sideBar.module.css";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editNoteID, editingNoteID] = useState("");

  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const sessionId = localStorage.getItem("sessionid");

        const response = await axios.get(
          "https://notes-backend-x9sp.onrender.com/notes/",
          {
            headers: {
              Authorization: `Bearer ${sessionId}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("Response:", response.data);

        setNotes(response.data.data || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching notes:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("uuid");
          console.log("Session expired. Redirecting to login page");
          localStorage.removeItem("sessionid");
          window.location.href = '/user/login'; 
        }
        setError(err.message || "Failed to fetch notes");
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [setNotes]);
  
  const createNewNote = async () => {  
    try {
      const sessionId = localStorage.getItem("sessionid");
  
      const response = await axios.post(
        "https://notes-backend-x9sp.onrender.com/notes",
        {
          title: "Untitled Note",
          description: "enter note description",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response for adding note:", response.data);
      const newNote = response.data;
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setactive(newNote);
  
    } catch (err) {
      console.error("Error creating new note:", err);
      setError("Failed to create note");
    }
  };

  const deletenote = async (note) => {
    try {
      const sessionId = localStorage.getItem("sessionid");
      await axios.delete(
        `https://notes-backend-x9sp.onrender.com/notes/${note._id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      setNotes(prevNotes => prevNotes.filter(n => n._id !== note._id));
      
      if (active && active._id === note._id) {
        setactive('');
      }
      
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note");
    }
  }

  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good Morning 🌅";
  } else if (hour < 18) {
    greeting = "Good Afternoon ☀️";
  } else if (hour >= 19 || hour < 6) {
    greeting = "Good Evening 🌇";
  } else {
    greeting = "Good Evening 🌇";
  }

  const colortags = {
    "": "gray",
    red: "red",
    yellow: "yellow",
    green: "green",
    blue: "blue",
    purple: "purple",
  };

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

  if (isLoading) {
    return (
      <div className={Styles.sideBar}>
        <div className={Styles.greeting}>
          <div className={Styles.loader}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={Styles.sideBar}>
        <div className={Styles.greeting}>
          <h1>Error loading notes</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
          />
        </div>

        <div className={Styles.buttonContainer}>
          <button className={Styles.sideBarButton} onClick={homeClick}>
            <img src="/assets/home.svg" alt="" />
            Home
          </button>
          <button className={Styles.sideBarButton} onClick={createNewNote}>
            <img src="/assets/addNote.svg" alt="" />
            Add Note
          </button>
        </div>

        <div className={Styles.tagFilter}>
          <select
            className={Styles.sortcolor}
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
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
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note._id}
                className={`${Styles.noteItem} ${
                  active && active._id === note._id ? Styles.focusedNote : ""
                }`}
              >
                <div
                  className={Styles.noteContent}
                  onClick={() => setactive(note)}
                >
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
                            e.stopPropagation();
                            colortag(note._id, color);
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>
                  {editNoteID === note._id ? (
                    <input
                      type="text"
                      value={note.title}
                      onChange={(e) =>
                        editNoteName(note._id, textLghtReduce(e.target.value, 15))
                      }
                      onBlur={finishEditing}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          finishEditing();
                        }
                      }}
                      className={Styles.editNoteIDInput}
                    />
                  ) : (
                    <span
                      className={Styles.noteTitle}
                      title={note.title}
                    >
                      {note.title}
                    </span>
                  )}
                </div>
                <div className={Styles.noteOptions}>
                  <button className={Styles.optionsButton}>⋮</button>
                  <div className={Styles.optionsMenu}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        editingNoteName(note._id);
                      }}
                    >
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletenote(note);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={Styles.noNotes}>No notes available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;