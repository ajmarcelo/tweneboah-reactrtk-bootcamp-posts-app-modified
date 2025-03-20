import axios from "axios";
import apiURL from "../../utils/apiURL";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

//initial state
const initialState = {
    loading: false,
    error: "",
    posts: [],
    post: {},
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const res = await axios.get(apiURL);
    return res.data; 
});

export const fetchPost = createAsyncThunk('post/fetchPost', async (id)=>{
    const res = await axios.get(`${apiURL}/${id}`);
    return res.data; 
});

// CreateSlice
const postsSlice = createSlice({
    name: "posts",
    initialState, 
    reducers: {
        resetPosts: (state) => {
            Object.assign(state, initialState);
        }
    },
    extraReducers: (builder)=> {
        // request all posts
        builder.addCase(fetchPosts.pending,(state)=>{
            state.loading = true;
        });
        
        // success call all posts
        builder.addCase(fetchPosts.fulfilled,(state, action)=>{
            state.posts = action.payload;
            state.loading = false;
        }) 
        
        // failure call all posts
        builder.addCase(fetchPosts.rejected,(state, action)=>{
            state.posts = [];
            state.error = action.payload;
            state.loading = false;
        })  

        // request a post
        builder.addCase(fetchPost.pending,(state)=>{
            state.loading = true;
        })

        // success call for a post
        builder.addCase(fetchPost.fulfilled,(state, action)=>{
            state.posts = [action.payload];
            state.loading = false;
        }) 
        
        // failure call for a post
        builder.addCase(fetchPost.rejected,(state, action)=>{
            state.post = [];
            state.error = action.payload;
            state.loading = false;
        })   
    }
})
export const { resetPosts } = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;