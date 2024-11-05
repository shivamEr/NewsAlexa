import React, { Component } from 'react'
import PropTypes from 'prop-types';
import NewsItem from './NewsItem'
import Loading from './Loading';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize : 6,
        category: 'technology'
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85c94ee44c1d40fd9c619d60558071ce&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading : false
        });
    }

    handlePreClick = async () => {
        // console.log("Preview");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85c94ee44c1d40fd9c619d60558071ce&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading : false
        });
    }
    handleNextClick = async () => {
        // console.log("Next");
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85c94ee44c1d40fd9c619d60558071ce&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
             this.setState({loading:true});
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
                loading: false
            });
        }
    }
    
    render() {
        return (
            <div className='container my3'>
                <h1 className='my-3 text-center'>NewsAlexa - Top Headlines</h1>
                {this.state.loading && <Loading />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage?element.urlToImage:"https://t4.ftcdn.net/jpg/06/95/90/53/360_F_695905385_58pzoib9wHFl4lK2YEVDbLA5f2B3z5iu.jpg"} newsUrl={element.url} />
                        </div>
                    })
                    }
                </div>
                <div className="container row">
                    <button type="button" disabled={this.state.page <= 1} className="my-3 col-md-1 btn btn-dark" onClick={this.handlePreClick}>&larr; Preview</button>
                    <button type="button" className="my-3 col-md-1 offset-10 btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
