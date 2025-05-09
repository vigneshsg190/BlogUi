import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../pexels-photo-965117.webp';


const Blog = () => {
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [blogdata, setBlogdata] = useState([]);
    const [EditBlogPopup , setEditBlogpopup]= useState(false);


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

        setTitle('');
        setBlog('');
    }

    const popupedit = () => {
        setEditBlogpopup(true);
        // console.log("Edit button clicked");
    }

    const EditBlogPopupClose = () => {
        setEditBlogpopup(false);
    }


    return (
        <>
            <div className="container text-center py-5">
                <form onSubmit={handleblogformsubmitt} className="col-md-4 col-lg-4 mx-auto mb-4">
                    <input type="text" onChange={tittlebox} value={title} className="form-control mb-3" placeholder="Blog Title" required />
                    <textarea onChange={blogbox} value={blog} rows="5" cols="10"
                        className="form-control mb-3"
                        placeholder="Type your Blog"
                        required
                    />
                    <button type="submit" className="btn btn-primary">
                        Add Blog
                    </button>
                </form>
            </div>
            <div className="blog">
                <div className="container">
                    <div className="row">
                        {blogdata.map((items) => (
                            <div key={items.id} className="col-md-4 col-sm-12 col-lg-4">
                                <div className="card" style={{ width: "17rem" }}>
                                    <img src={image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{items.title}</h5>
                                        <p className="card-text">{items.content}</p>
                                        <button className='danger btn btn-primary'>Delete</button>
                                        <button type="button" class="btn btn-primary"  onClick={popupedit}>
                                            Edit
                                        </button>
                                        { EditBlogPopup && (
                                             <div className="modal show d-block" tabIndex="-1">
                                             <div className="modal-dialog" role="document">
                                                 <div className="modal-content">
                                                     <div className="modal-header">
                                                         <h5 className="modal-title" id="exampleModalLongTitle">{items.title}</h5>
                                                         <button type="button" class="close" onClick={EditBlogPopupClose}>
                                                             <span aria-hidden="true">&times;</span>
                                                         </button>
                                                     </div>
                                                     <div className="modal-body">
                                                        {items.content}
                                                     </div>
                                                     <div className="modal-footer">
                                                         <button type="button" className="btn btn-primary" onClick={EditBlogPopupClose}>Close</button>
                                                         <button type="button" className="btn btn-primary">Save changes</button>
                                                     </div>
                                                 </div>
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
        </>
    )
}

export default Blog;