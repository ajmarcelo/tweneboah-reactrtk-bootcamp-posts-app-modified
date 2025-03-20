import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPost from "./SearchPost";
import "./Posts.css";
import { fetchPosts, fetchPost } from "../redux/slice/postsSlice"; 

const PostsList = () => {
//  dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchPost());
    }, [dispatch]);

    //get data from store
    const { loading, error, posts, post } = useSelector(data => data);

    console.log(loading, error, posts, post);

    return (
    <>
        <SearchPost />
        <div className="posts-list">
            <h1>Total Posts {posts.length}</h1>
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2 style={{ color: "red" }}>
                    {error.response.status && "No Post Found"}
                </h2>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post-details">
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))
            )}
        </div>
    </>
  );
};

export default PostsList;
