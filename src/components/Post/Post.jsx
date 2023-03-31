//Import React
import React, { useState, useEffect, useRef } from "react";
//Import ccs
import "./post.css";
//Import Material UI & React Icon
import { RxCross2 } from "react-icons/rx";
import { FaRegCommentDots, FaEdit } from "react-icons/fa";
import {FcLikePlaceholder, FcLike } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { IconContext } from "react-icons";

// Import postAPI configuration
import { deletePost, updatePost, getPost } from "../../services/postApi";

import EditPost from "../EditPost/EditPost.jsx";
//Import Components
// import Comment from "../../components/Comment/Comment.jsx";

export default function Post({ post, user, setToggle }) {
  const [showPopup, setShowPopup] = useState(false);
  const [heart, setHeart] = useState(null);
  const [postLike, setPostLike] = useState(post)
  console.log(heart)

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

  async function updatingHeartQty() {
    await updatePost({
        project_name: postLike.project_name,
        github_link: postLike.github_link,
        // Sets image to the current postLike image URL if cloudinaryUrl does not exist; otherwise, uses cloudinaryUrl
        image: postLike.image,
        heartQty: postLike.heartQty
    }, post.id);
  }


  function likeButton(){
    // if (heart === false) {
    //     // const settingHeart1 = () => setHeart(true)
    //     console.log(heart)
    // } else {
        //     const settingHeart2 = () => setHeart(false)
        //     console.log(heart)
        // }
        // heart === false ? setHeart(true) : setHeart(false)
        setHeart(prev => !prev)
        // console.log(heart)
        addLikes()
    }
    
    let hearts = postLike.heartQty
    async function addLikes() {
        if (heart === null) {
            setHeart(true)
        } 
        !heart ? hearts++ : hearts--
        setPostLike({...postLike, heartQty: hearts})
        updatingHeartQty()
        console.log(hearts)
    }
    // console.log(post)



  return (
    <>
      <div className="post">
        <div className="demo post_header">
          <div className="post-avatar_left">
            <h4>
              <strong className="post-project">Project:</strong>
              <span className="post-project__name">{post.project_name}</span>
            </h4>
          </div>
          {activeUser === username ? (
            <IconContext.Provider value={{ color: "black" }}>
              <RxCross2 onClick={handleDelete} className="post-delete-btn" />
            </IconContext.Provider>
          ) : (
            <></>
          )}
        </div>
        <img className="post-image" src={post.image} alt="" />
        <div className="post-bottom">
          <div className="post-bottom-left">
            <div className="post-like-title">
              <h3>{username}</h3>
              {/* <FaRegCommentDots className="post-navbar-menu__icon" /> */}
            </div>
          </div>
          {activeUser === username ? (
            <IconContext.Provider
              value={{ color: "rgb(46 127 194)", size: "1.5rem" }}
            >
              <FaEdit
                onClick={() => setShowPopup(true)}
                className="post-update-btn post-navbar-menu__icon"
                onMouseOver={({ target }) => (target.style.color = "black")}
                onMouseOut={({ target }) =>
                  (target.style.color = "rgb(46 127 194)")
                }
              />
            </IconContext.Provider>
          ) : (
            <></>
          )}
          {/* <IconContext.Provider value={{ color: "rgb(46 127 194)" }}>
            <FaRegCommentDots
              className="post-navbar-menu__icon"
              onMouseOver={({ target }) => (target.style.color = "black")}
              onMouseOut={({ target }) =>
                (target.style.color = "rgb(46 127 194)")
              }
            />
          </IconContext.Provider> */}

          <a
            // className="post-github post-navbar-menu__icon"
            target="_blank"
            href={post.github_link}
          >
            <IconContext.Provider value={{ color: "rgb(46 127 194)" }}>
              <GoMarkGithub
                className="post-navbar-menu__icon"
                onMouseOver={({ target }) => (target.style.color = "black")}
                onMouseOut={({ target }) =>
                  (target.style.color = "rgb(46 127 194)")
                }
              />
            </IconContext.Provider>
          </a>
          <button type="button" onClick={likeButton}>{heart === null ? <FcLikePlaceholder /> : heart === true ? <FcLike /> : <FcLikePlaceholder />}</button>
          <div className="likeCount">{post.heartQty}</div>
        </div>
      </div>
      {showPopup && (
        <EditPost
          setShowPopup={setShowPopup}
          setToggle={setToggle}
          post={post}
        />
      )}
    </>
  );
}
