// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const message = "Hello from Parent!";
  const items = "test";

  return (
    <div>
      <h1>Parent Component</h1>
      {/* Pass 'message' as a prop to ChildComponent */}
      {/* <ChildComponent {message}  /> */}
    </div>
  );
};

export default ParentComponent;