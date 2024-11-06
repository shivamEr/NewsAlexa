import React, { Component } from 'react'
import PropTypes from 'prop-types';
import NewsItem from './NewsItem'
import Loading from './Loading';

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

    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsAlexa`
    }

    async update() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=85c94ee44c1d40fd9c619d60558071ce&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
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

    render() {
        return (
            <div className='container my3'>
                <h1 className='my-3 text-center'>NewsAlexa - Top Headlines On {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Loading />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://t4.ftcdn.net/jpg/06/95/90/53/360_F_695905385_58pzoib9wHFl4lK2YEVDbLA5f2B3z5iu.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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
