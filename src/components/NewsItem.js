import React from "react";

const NewsItem = (props) => {
  return (
    <div className="my-3">
      {/* News card */}      
      <div className="card" style={{width:"21rem"}}>
      {/* Source badge */}
      <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
      <span className="position-absolute badge rounded-pill bg-danger">{props.source}</span>
      </div>

        {/* News image */}
        <img src={props.imageUrl?props.imageUrl:"https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-1145669796.jpg?resize=1200,675"} className="card-img-top" alt="..." />

        {/* News details */}
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text"> {props.description}... </p>
          <p className="card-text"><small className="text-info">By {props.author?props.author:"Unknown"} on {new Date(props.date).toGMTString()}</small></p>

          {/* Read more button */}
          <a href={props.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem