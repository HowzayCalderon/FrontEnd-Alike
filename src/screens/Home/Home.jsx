import React, { useState, useEffect } from "react";
import "./home.css";
import Post from "../../components/Post/Post.jsx";
import Navbar from "../../components/Navbar/Navbar";
import RightNavbar from "../../components/RightNavbar/RightNavbar";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal.jsx";
import usePostData from "../../Hooks/usePostData.js";

// username, project, github, imageUrl
function Home() {
  const [posts, setPosts] = useState([])
  const postData = usePostData()

  useEffect(() => setPosts(postData), [])

  console.log(posts)


  // checking if a post has been liked, here we avoid on multi clicks

  // function handlePostLikeClick(updatedPost) {
  //   console.log("Handle Post Update", updatedPost);
  //   const newPosts = posts.map((post) => {
  //     if (post.id === updatedPost.id) return updatedPost;
  //     return post;
  //   });
  //   setPosts(newPosts);
  // }

  return (
    <div className="home">
      <div className="home-global">
        <Navbar />
        <div className="home-content">
          <div className="home-content_center">
            <div className="home-center">
              {posts.map((post, index) => {
                // console.log(post);
                return (
                  <Post
                    key={index}
                    post={post}
                    // onPostLikeClick={handlePostLikeClick}
                  />
                );
              })}
            </div>
            <RightNavbar />
          </div>
        </div>
      </div>
      <footer className="home-footer">
        <h1>hello</h1>
      </footer>
    </div>
  );
}

export default Home;