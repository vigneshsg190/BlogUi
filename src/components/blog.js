import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../pexels-photo-965117.webp';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
        axios.get('http://localhost:8000/posts')
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
        e.preventDefault();
        const newblog = {
            id: Math.floor(Math.random() * 10000),
            title: title,
            content: blog,
        }
        axios.post('http://localhost:8000/posts', newblog)
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
            const blogid = Number(value.id); // ensure it's a number
            console.log("Deleting blog with ID:", blogid);

            await axios.delete(`http://localhost:8000/posts/${blogid}`);
            toast.success('Blog Deleted Successfully!');
            getblog(); // refresh blog list
        } catch (error) {
            toast.error("Error deleting blog");
        }
    }

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
            const { id, title, content } = EditBlogData;
            await axios.put(`http://localhost:8000/posts/${id}`, {
                title,
                content
            });
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
                                            className="btn btn-primary"
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
