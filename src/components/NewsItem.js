import React, { Component } from 'react'

// export class NewsItem extends Component {



    const NewsItem=(props)=>{
    // render() {

        let { title, description, imageurl, newsurl, author, date,source} = props;
        return (
            <>

                <div>
                    <div className="card my-4 mx-2" /*style={{width: "auto"}}*/>
                        <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0' }}>
                        <span className="badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}</span>

                        </div>
                         <img src={imageurl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text fs-6">{description}...</p>
                            <p className="card-text"><small className="text-muted">By-{!author ? "UnKnown" : author} at {new Date(date).toGMTString()}</small></p>
                            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>
                </div>


            </>



        )
    // }
    }
// }

export default NewsItem
