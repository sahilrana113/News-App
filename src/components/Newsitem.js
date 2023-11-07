import React, { Component } from 'react'

export class Newsitem extends Component {

    
    
  render() {

    let {title, description, imgurl, newsurl, author, date}= this.props;
    return (
      <div>
        <div className="card" >
  <img src={imgurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p class="card-text"><small class="text-body-secondary">By {!author?"Unknown":author} on {date}</small></p>
    <a href={newsurl}  target="blank" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
