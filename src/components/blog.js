import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../pexels-photo-965117.webp';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import blogService from '../service/Post-Service';
import viewblogPage from './ViewBlogPage';

const Blog = () => {
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [blogdata, setBlogdata] = useState([]);
    const [EditBlogData, setEditBlogData] = useState({
        id: '',
        title: '',
        content: ''
    }); //pop up for edit the blog 
    const [EditBlogPopup, setEditBlogpopup] = useState(false); //pop up appers/close for edit
    const [AddBlogbtn, setAddBlogbtn] = useState(true); // Add new blog button
    const [isReadmore, setReadmore] = useState({}); // Read more button]



    const getblog = () => {
        blogService.getAllBlogs()
        // axios.get('http://localhost:8000/posts')
            .then((res) => {
                // const updated = res.data;
                // console.log(updated);
                setBlogdata(res.data);
            })
            .catch((err) => {
                console.error("Error fetching blog data:", err);
            });
    }

    useEffect(() => {
        getblog();
    }, [])

    const tittlebox = (e) => {
        let title = e.target.value;
        setTitle(title);
        // console.log(title);
    }

    const blogbox = (e) => {
        let blog = e.target.value;
        setBlog(blog);
        // console.log(blog);
    }

    const handleblogformsubmitt = (e) => {
        console.log(e)
        e.preventDefault();
        const newblog = {
            title: title,
            content: blog,
        }
        blogService.createBlog(newblog)
        // axios.post('http://localhost:8000/posts', newblog)
            .then((res) => {
                setBlogdata([...blogdata, res.data])
            })
            .catch((err) => {
                console.error("Error adding blog:", err);
            });
        toast.success('Blog Added Successfully!');
        setTitle('');
        setBlog('');
        setAddBlogbtn(true);
    }

    //Edit button click will get the values from the click and store
    const popupedit = (value) => {
        console.log(value);
        setEditBlogData(value);
        setEditBlogpopup(true); //popup to show
        // console.log("Edit button clicked");
    }

    const EditBlogPopupClose = () => {
        setEditBlogpopup(false);
    }

    // Adding 'new blog' button function
    const AddNewBlog = () => {
        setAddBlogbtn(false);
    }

    // Deleting Blog
   const DeleteBlog = async (value) => {
    try {
        const blogid = value.id;
        await blogService.deleteBlog(blogid); //  wait for deletion to complete
        getblog(); //  fetch updated list AFTER deletion
        toast.success('Blog Deleted Successfully!');
    } catch (error) {
        toast.error("Error deleting blog");
    }
};


    //Edit Blog data in popup
    const EditBlogDataPopupfunc = (e) => {
        return setEditBlogData({
            ...EditBlogData,
            [e.target.name]: e.target.value
        });
    }

    const editedBlogDataSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedata ={
            id : EditBlogData.id, //setting id value from the popup form during the edit
             title : EditBlogData.title,
             content : EditBlogData.content,
            }
            await blogService.updateBlog(EditBlogData.id,updatedata);
            // await axios.put(`http://localhost:8000/posts/${id}`, {
            //     title,
            //     content
            // });
            alert("Blog updated successfully!");
            getblog(); // Refresh the list
            EditBlogPopupClose(); // Close the modal
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Error while updating the blog");
        }
    }
    const toggleReadMore = (id) => {
        setReadmore((prevs) => ({
            ...prevs,
            [id]: !prevs[id], // toggle only that specific card
        }));
    };

    const navigate = useNavigate()
    const ViewBlog = async (item) => {
        const response = await blogService.ViewBlog(item.id);
        // const blogfulldata = response.data;
        // console.log(ff.data);
        navigate('/view-blog', {state:item})
        
    }

    return (
        <>
            {AddBlogbtn && (
                <div>
                    <div className="container text-center py-5">
                        <button type="submit" className="btn btn-primary" onClick={AddNewBlog}>
                            Add New Blog
                        </button>
                    </div>
                </div>)}
            {!AddBlogbtn && (
                <div className="container text-center py-5">
                    <form onSubmit={handleblogformsubmitt} className="col-md-4 col-lg-4 mx-auto mb-4">
                        <input type="text" onChange={tittlebox} value={title} className="form-control mb-3" placeholder="Blog Title" required />
                        <textarea onChange={blogbox} value={blog} rows="5" cols="10"
                            className="form-control mb-3"
                            placeholder="Type your Blog"
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            SUBMIT
                        </button>
                        <button type="text" onClick={() => setAddBlogbtn(true)} className="btn btn-primary dltbtn">
                            CANCEL
                        </button>
                    </form>
                </div>
            )}
            <div className="blog">
                <div className="container">
                    <div className="row">
                        {blogdata.map((items) => (
                            <div key={items.id} className="col-md-4 col-sm-12 col-lg-4">
                                <div className="card" style={{ width: "17rem" }}>
                                    <img src={image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{items.title}</h5>
                                        <p className="card-text">
                                            {isReadmore[items.id]? items.content:
                                             items.content.slice(0, 50) + "..."}

                                            {items.content.length > 50 && (
                                                <button
                                                    className="btn btn-link p-0"
                                                    onClick={() => toggleReadMore(items.id)}
                                                >
                                                    {isReadmore[items.id] ? "Read Less" : "Read More"}
                                                </button>
                                            )}
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-primary "
                                            onClick={() => ViewBlog(items)} >
                                            View 
                                        </button> |
                                        <button
                                            type="button"
                                            className="btn btn-primary dltbtn"
                                            onClick={() => popupedit(items)} >
                                            Edit
                                        </button> |
                                        <button className='danger btn btn-primary dltbtn' onClick={() => DeleteBlog(items)}>Delete</button>

                                        {EditBlogPopup && (
                                            <div className="modal show d-block" tabIndex="-1">
                                                <div className="modal-dialog" role="document">
                                                    <form onSubmit={editedBlogDataSubmit}>
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    onChange={EditBlogDataPopupfunc}
                                                                    value={EditBlogData.title}
                                                                />
                                                                <button type="button" className="close" onClick={EditBlogPopupClose}>
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <input
                                                                    type="text"
                                                                    name="content"
                                                                    onChange={EditBlogDataPopupfunc}
                                                                    value={EditBlogData.content}
                                                                />
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" onClick={EditBlogPopupClose}>Close</button>
                                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Blog;

