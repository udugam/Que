import React from "react";
// what does this do again ...props
export const Input = props => (
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>
);
