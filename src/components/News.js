import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Load from './Load'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {


    static defaultProps = {
        country: "in",
        pageSize: 20,
        category: "sports"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

    firstLetterCapitalise = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello i am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.firstLetterCapitalise(this.props.category)}-newsMonkey`;
    }

    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false

        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        console.log("cdm");
        // this.props.setProgress(10);
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // this.props.setProgress(40);
        // let parsedData = await data.json();
        // this.props.setProgress(70);
        this.updateNews();
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
        // this.props.setProgress(100);

    }

    handlePrevClick = async () => {
        console.log("Prev page");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // this.props.setProgress(10);
        // let data = await fetch(url);
        // this.props.setProgress(40);
        // let parsedData = await data.json();
        // this.props.setProgress(70);
        this.setState({
            page:this.state.page-1
        })
        this.updateNews();
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false

        // })
        // this.props.setProgress(100);

    }

    handleNextClick = async () => {

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) { }
        else {
            console.log("Next page");
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({ loading: true });
            // this.props.setProgress(10);
            // let data = await fetch(url);
            // this.props.setProgress(40);
            // let parsedData = await data.json();
            // this.props.setProgress(70);
            this.setState({
                page:this.state.page+1
            })
            this.updateNews();
            // this.setState({
            //     page: this.state.page + 1,
            //     articles: parsedData.articles,
            //     totalResults: parsedData.totalResults,
            //     loading: false

            // })
            // this.props.setProgress(100);

        }
    }

    fetchMoreData = async () => {

        this.setState({page: this.state.page + 1})
        // this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        // this.props.setProgress(40);
        let parsedData = await data.json();
        // this.props.setProgress(70);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
        // this.props.setProgress(100);

    }





    render() {
        return (
            <>

                 
                    <h2 className=" my-4 text-center">newsMonkey-Top {this.firstLetterCapitalise(this.props.category)} Headlines</h2>

                    {this.state.loading && <Load/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Load/>}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div key={element.url} className="col-lg-4 col-md-6">
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/img/2022/01/31/1600x900/7a38fc8c-828f-11ec-900e-268a37a5acfe_1643631688010.jpg"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>

                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
               

                {/* <div className="container d-flex justify-content-between">
                    <button onClick={this.handlePrevClick} disabled={this.state.page <= 1} type="button" className="mx-2 mb-3 btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} type="button" className="mx-2 mb-3 btn btn-dark">Next &rarr;</button>
                </div>  */}
            </>

        )
    }
}

export default News
