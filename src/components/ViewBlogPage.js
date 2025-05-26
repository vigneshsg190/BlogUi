import { useLocation } from 'react-router-dom';

const ViewBlogPage = () => {
  debugger
  const location = useLocation();
  const blog = location.state;
  if (!blog) return <p>Loading or No data found</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
    </div>
  );
};

export default ViewBlogPage;
