import React, { Component } from 'react'
import PropTypes from 'prop-types';
import NewsItem from './NewsItem'
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'technology'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsAlexa`
    }

    async update() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.update();
    }

    handlePreClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.update();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.update();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        });
    };

    render() {
        return (
            <div className='container my3'>
                <h1 className='my-3 text-center' style={{paddingTop :"80px"}}>NewsAlexa - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Loading />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://t4.ftcdn.net/jpg/06/95/90/53/360_F_695905385_58pzoib9wHFl4lK2YEVDbLA5f2B3z5iu.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container row">
                    <button type="button" disabled={this.state.page <= 1} className="my-3 col-md-1 btn btn-dark" onClick={this.handlePreClick}>&larr; Preview</button>
                    <button type="button" className="my-3 col-md-1 offset-10 btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}
