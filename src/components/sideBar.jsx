import React, { useState } from 'react';
import Styles from './sideBar.module.css';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : 'Good Evening';

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      
      <div className={`${Styles.sideBar} ${isOpen ? Styles.open : Styles.closed}`}>
        <div className={Styles.greeting}>
          <h1>{greeting}</h1>
          
        </div>
        <div className={Styles.hamburger} onClick={toggleSidebar}>
        &#9776;
      </div>

        <ul className={Styles.createNotes}>

          <li className={Styles.searchContainer}>
            <img src="src/assets/search.svg" alt="Search Icon" className={Styles.searchIcon} />
            <input
              type="text"
              placeholder="Search notes..."
              className={Styles.searchInput}
            />
          </li>

          <li className={Styles.home}>
            <img src="src/assets/home.svg" alt="" />
            <button className={Styles.homeButton}>Home</button>
          </li>

          <li className={Styles.addNote}>
            <img src="src/assets/addNote.svg" alt="" />
            <button className={Styles.addButton}>Add Note</button>
          </li>

          <li className="sort">
            <select className={Styles.sortcolor}>
              {/* Options */}
            </select>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default SideBar;