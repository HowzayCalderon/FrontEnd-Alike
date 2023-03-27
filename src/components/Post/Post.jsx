//Import React
import React from "react";
import { useState, useEffect, useRef } from "react";
//Import ccs
import "./post.css";
//Import Material UI & React Icon
import { RxCross2 } from "react-icons/rx";
import { FaRegCommentDots, FaEdit } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { IconContext } from "react-icons";

// Import postAPI configuration
import { deletePost, updatePost } from "../../services/postApi";

import EditPost from "../EditPost/EditPost.jsx";
//Import Components
// import Comment from "../../components/Comment/Comment.jsx";

export default function Post({ post, user, setToggle }) {
  const [showPopup, setShowPopup] = useState(false);

  let username = "";
  for (let i = 0; i < user.length; i++) {
    if (user[i] !== undefined) {
      username = user[i];
    }
  }

  let activeUser = window.localStorage.getItem("username");

  async function handleDelete() {
    await deletePost(post.id);
    setToggle((prev) => !prev);
  }

  return (
    <>
      <div className="post">
        <div className="post_header">
          <div className="post-avatar_left">
            <h4>
              <strong className="post-project">Project:</strong>
              <span className="post-project__name">{post.project_name}</span>
            </h4>
          </div>
          {activeUser === username ? (
            <RxCross2 onClick={handleDelete} className="post-delete-btn" />
          ) : (
            <></>
          )}
        </div>
        <img className="post-image" src={post.image} alt="" />
        <div className="post-bottom">
          <div className="post-like-title">
            <h3 className="post-like-username">{username}</h3>
            <IconContext.Provider value={{ color: "rgb(46 127 194)" }}>
              <FaRegCommentDots className="post-navbar-menu__icon" />
            </IconContext.Provider>
          </div>
          {activeUser === username ? (
            <IconContext.Provider value={{ color: "rgb(46 127 194)" }}>
              <FaEdit
                onClick={() => setShowPopup(true)}
                className="post-update-btn post-navbar-menu__icon"
              />
            </IconContext.Provider>
          ) : (
            <></>
          )}
          <a className="post-github" target="_blank" href={post.github_link}>
            <IconContext.Provider value={{ color: "rgb(46 127 194)" }}>
              <GoMarkGithub className="post-navbar-menu__icon" />
            </IconContext.Provider>
          </a>
        </div>
      </div>
      {showPopup && (
        <EditPost
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          setToggle={setToggle}
          post={post}
        />
      )}
    </>
  );
}
