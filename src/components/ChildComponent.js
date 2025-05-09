// ChildComponent.js
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      {/* <h2>Child Component</h2> */}
      {/* Access the passed prop */}
      <p>Message: {props.message}</p>
      <p>Message: {props.test}</p>

    </div>
  );
};

export default ChildComponent;