import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        // console.log(imageUrl);
        return (
            <div>
                <div className="card">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-white bg-danger">{source? source:"Unknown"}</span>
                
                    <img src={imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-muted">By {author?author:" Unknown"} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
