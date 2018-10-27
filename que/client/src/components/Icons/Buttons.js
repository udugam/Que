import React from "react";

export const Btn = props => (
  <button {...props} style={props.style} className="btn btn-success">
    {props.children}
  </button>
);
