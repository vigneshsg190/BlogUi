// blogService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/posts'; // change to your actual URL

// Get all blogs
const getAllBlogs = () => {
  return axios.get(BASE_URL);
};

// Create a new blog
const createBlog = (data) => {
  return axios.post(BASE_URL, data); 
};

// Update a blog
const updateBlog = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

// Delete a blog
const deleteBlog = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
    // getblog(); // refresh blog list

};

const ViewBlog =(id)=>{
  return axios.get(`${BASE_URL}/${id}`);
}
// Export all methods
const blogService = {
  getAllBlogs,
//   getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  ViewBlog,
};

export default blogService;
