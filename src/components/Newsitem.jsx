import React from "react";

const Newsitem=(props)=> {
  
    let { title, description, imageurl, newsurl,author,publishedAt,source} = props;
    return (
      <div className="my-3 mb-3 mx-4">
        <div className="card">
          <div className="cont"><span className="badge badge-light bg-danger rounded-pill"style={{
            display:"flex",
            position:"absolute", right:"0"
          }}>{source}</span></div>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
          <div className="card-footer text-muted">By {!author? "Unknown" :author} on {new Date(publishedAt).toGMTString()}</div>
        </div>
      </div>
    );
  }

  export default Newsitem;

