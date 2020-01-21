import React, { Component } from 'react';
import axios from 'axios';
import './newsBanner.css';


class NewsBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };

        this.routeChange = this.routeChange.bind(this);
    }

    componentDidMount() {
        axios
            .get('http://newscenter-api.herokuapp.com/article/')
            .then(res => {
                let articles = res.data;
                articles = articles.filter(article => {
                    return article.site === this.props.site;
                });

                this.setState({
                    articles
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    routeChange(e) {
        const path = e.target.getAttribute('href');
        window.open(path);
    };

    getArticles() {
        const tableId = 'articleTable' + this.props.site;

        for (let i = 0; i < this.state.articles.length; i++) {
            if (i === 15) break;
            const article = this.state.articles[i];
            const table = document.getElementById(tableId);
            let newRow = table.insertRow();
            newRow.innerHTML = `<td href=${article.url}>${article.title}</td>`;
            newRow.classList.add('articleLink');
            newRow.onclick = this.routeChange;
        };
    }

    render() {
        const tableId = 'articleTable' + this.props.site;
        this.getArticles();
        console.log(this.state.articles);
        return (
            <div className='news_banner'>
                <h2>{this.props.site}</h2>
                <table id={tableId}></table>
            </div>
        );
    }
}

export default NewsBanner;