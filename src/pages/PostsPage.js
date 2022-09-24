import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchPosts } from "../actions/postsActions";

import { Post } from "../components/Post";

const PostsPage = ({ dispatch, loading, posts, hasErrors }) => {
  const [typedString, setTypedString] = useState("");
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;

    const filteredPosts = posts.filter((post) => {
      return post.title.toLowerCase().includes(typedString.toLowerCase());
    });

    return filteredPosts.map((post) => (
      <Post key={post.id} post={post} excerpt />
    ));
  };

  const onChangeHandler = (e) => {
    setTypedString("");
    setTypedString(e.target.value);
  };

  return (
    <section>
      <div class="posts-container">
        <h1>Posts</h1>
        <div class="search-box">
          <input
            type="text"
            class="input-search"
            placeholder="Search here..."
            onChange={onChangeHandler}
          />
        </div>
      </div>
      {renderPosts()}
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors
});

export default connect(mapStateToProps)(PostsPage);
