import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [text, setText] = useState("");

  const handleFormInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
  };

  return (
    <nav className="nav">
      <div className="nav-items">
        <Link to="/">
          <img
            src="/logo_2.svg"
            alt="the movie database logo"
            className="logo"
          />
        </Link>
        <form className="search-form" onClick={handleSubmit}>
          <input
            type="text"
            placeholder="Enter movie title"
            onChange={handleFormInput}
            value={text}
            required
          />
          <Link to={text}>
            {text ? (
              <button className="btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            ) : (
              <button className="btn" disabled>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            )}
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
