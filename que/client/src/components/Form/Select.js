import React from "react";

// what does this do again ...props
export const Select = props => (
  <div className="form-group">
    <select className="form-control" id="exampleFormControlSelect1" {...props}>
        <option></option>
        <option>Series</option>
        <option>Movie</option>
        <option>Podcast</option>
        <option>Video</option>
    </select>
  </div>
);
