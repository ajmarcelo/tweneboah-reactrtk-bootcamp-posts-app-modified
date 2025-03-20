import React from "react";
import { useDispatch } from "react-redux";
import { fetchPosts, fetchPost, resetPosts } from "../redux/slice/postsSlice"; 
import "./Form.css";

const SearchPost = () => {
  const dispatch = useDispatch();
  //search form state
  const [search, setSearch] = React.useState("");
  //search form submit handler
  const handleSubmit = e => {
    e.preventDefault();
    if (search === "")
        handleShowAll();
    else
        dispatch(fetchPost(search));
  };
    function handleReset() {
        dispatch(resetPosts());
    };

    function handleShowAll() {
        dispatch(fetchPosts());
    };

    return (
        <div className="form-header">
            <div>
                <h2>React Redux Project</h2>
                <p>
                    This project is a simple React Redux project that fetches data with
                    search functionality from an API
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search for a post by id"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <button onClick={handleReset}>Reset Posts</button>
            <button onClick={handleShowAll}>Show all</button>
        </div>
    );
};

export default SearchPost;
