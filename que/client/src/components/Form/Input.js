import React from "react";

export const Input = props => (
  <div className="form-group">
  <input className={`form-control`} id={props.name} {...props} />
  </div>
);
