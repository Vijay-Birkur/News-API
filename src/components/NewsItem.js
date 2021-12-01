import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,source,newsUrl,author,date}=this.props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem"}}>
                <div style={{display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}}>
                <span class="badge rounded-pill bg-danger" >{source}</span>
                </div>
                    <img src={!imageUrl?"https://i.ytimg.com/vi/AcHHugVSKJE/maxresdefault.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{!description?"Click here to know more":description}..</p>
                        <p className="card-text"><small className="text-red" style={{color: 'red'}}>By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-warning">Read More..</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
