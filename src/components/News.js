import React, {Component,useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


const News=(props)=>{
    const[articles,setArticles]=useState([]);
    const[loading,setLoading]=useState(false);
    const[page,setPage]=useState(1);
    const[totalResults,setTotalResults]=useState(0);
    //     document.title = `${this.firstLetterCapitalise(props.category)}-newsMonkey`;


// export class News extends Component {


    // static defaultProps = {
    //     country: "in",
    //     pageSize: 20,
    //     category: "sports"
    // }

    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string

    // }

    const firstLetterCapitalise = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props) {
    //     super(props);
    //     console.log("Hello i am constructor from news component");
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0
    //     };
    //     document.title = `${this.firstLetterCapitalise(props.category)}-newsMonkey`;
    // }

    const updateNews= async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false

        // })
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
        document.title = `${firstLetterCapitalise(props.category)}-newsMonkey`;

    },[])

    // const componentDidMount=async ()=> {
    //     console.log("cdm");
    //     // props.setProgress(10);
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // props.setProgress(40);
    //     // let parsedData = await data.json();
    //     // props.setProgress(70);
    //     updateNews();
    //     // this.setState({
    //     //     articles: parsedData.articles,
    //     //     totalResults: parsedData.totalResults,
    //     //     loading: false
    //     // });
    //     // props.setProgress(100);

    // }

    const handlePrevClick = async () => {
        console.log("Prev page");
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // props.setProgress(10);
        // let data = await fetch(url);
        // props.setProgress(40);
        // let parsedData = await data.json();
        // props.setProgress(70);
        setPage(page-1);
        // this.setState({
        //     page:page-1
        // })
        updateNews();
        // this.setState({
        //     page: page - 1,
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false

        // })
        // props.setProgress(100);

    }

    const handleNextClick = async () => {

        if (page + 1 > Math.ceil(totalResults / props.pageSize)) { }
        else {
            console.log("Next page");
            // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
            // this.setState({ loading: true });
            // props.setProgress(10);
            // let data = await fetch(url);
            // props.setProgress(40);
            // let parsedData = await data.json();
            // props.setProgress(70);
            setPage(page+1);
            // this.setState({
            //     page:page+1
            // })
            updateNews();
            // this.setState({
            //     page: page + 1,
            //     articles: parsedData.articles,
            //     totalResults: parsedData.totalResults,
            //     loading: false

            // })
            // props.setProgress(100);

        }
    }

    const fetchMoreData = async () => {

        // this.setState({page: page + 1})
        
        // props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        console.log(page);
        let data = await fetch(url);
        // props.setProgress(40);
        let parsedData = await data.json();
        // props.setProgress(70);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults
        // })
        // props.setProgress(100);

    }





    // render() {
        return (
            <>

                 
                    <h2 className=" my-4 text-center">newsMonkey-Top {firstLetterCapitalise(props.category)} Headlines</h2>

                    {loading && <Loader/>}
                    <InfiniteScroll
                        dataLength={articles.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Loader/>}
                    >
                        <div className="container">
                            <div className="row">
                                {articles.map((element) => {
                                    return <div key={element.url} className="col-lg-4 col-md-6">
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/img/2022/01/31/1600x900/7a38fc8c-828f-11ec-900e-268a37a5acfe_1643631688010.jpg"} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>

                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
               

                {/* <div className="container d-flex justify-content-between">
                    <button onClick={this.handlePrevClick} disabled={page <= 1} type="button" className="mx-2 mb-3 btn btn-dark">&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNextClick} type="button" className="mx-2 mb-3 btn btn-dark">Next &rarr;</button>
                </div>  */}
            </>

        )
    // }
// }
}
News.defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}

export default News
