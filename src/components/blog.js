import React, { useState } from 'react';


const Blog = () => {
    const [title, setTitle] = useState



    return (
        <>
            <div className="container text-center py-5">
                <form onSubmit={blogformsubmit} className="col-md-4 col-lg-4 mx-auto mb-4">
                    <input type="text" className="form-control mb-3" placeholder="Blog Title" required />
                    <textarea
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
                        <div className="col-md-4 col-sm-12 col-lg-4">
                            <div className="card" style={{ width: "17rem" }}>
                                <img src="https://source.unsplash.com/random/300x200/?blog" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Blog Title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog;