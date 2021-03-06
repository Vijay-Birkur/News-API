import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps={
        country: 'in',
        pageSize:9,
        category: 'general',

    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitaliz = (string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page:1,
            totalResults:0

        }
        document.title=`${this.capitaliz(this.props.category)}-NewsMonkey`;
    }
    async updateNews(){
        this.props.setProgress(20);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=f94b2ed5069a4c1f836f85cc2d6df67a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json()
        console.log(parsedData);
        this.props.setProgress(70);
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }
    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=f94b2ed5069a4c1f836f85cc2d6df67a&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles,totalArticles:parsedData.totalResults,loading:false})
        this.updateNews();
    }
    handlePrevClick= async ()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=f94b2ed5069a4c1f836f85cc2d6df67a&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parsedData.articles,
        //     loading:false
        // })
        this.setState({page:this.state.page-1});
        this.updateNews();

    }
    handleNextClick= async ()=>{
        if(this.state.page+1 > Math.ceil(this.totalResults/20)){
    }
    else{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f94b2ed5069a4c1f836f85cc2d6df67a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     this.setState({
        //         page:this.state.page+1,
        //         articles:parsedData.articles,
        //         loading:false
        //     })
        this.setState({page:this.state.page+1});
        this.updateNews();
        }
    }
    fetchMoreData = async()=>{
        this.setState({page: this.state.page+1})
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=f94b2ed5069a4c1f836f85cc2d6df67a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        })
    };
    render() {
        return (
            <>
            <h1 className="text-center">NewsMonkey-Top {this.capitaliz(this.props.category)} Headlines</h1>
            {this.state.loading&&<Spinner />}
            <InfiniteScroll dataLength={this.state.articles.length} 
            next={this.fetchMoreData} 
            hasMore={this.state.articles.length !== this.state.totalResults} 
            loader={<Spinner />}>
            <div className="container">
            <div className="row" > 
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem key={element.url} title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0.88):""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
                {/* <div disabled={this.state.page<=1} className="d-flex justify-content-between">
                    <button type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
