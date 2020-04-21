import React, { Component } from 'react';
import './newsBanner.css';


class NewsBanner extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(e) {
        const path = e.target.getAttribute('href');
        window.open(path);
    };

    componentDidMount() {
        this.getArticles()
    }

    componentWillUnmount() {
        this.setState({

        })
    }

    getArticles() {
        const tableId = 'articleTable' + this.props.site;
        const table = document.getElementById(tableId);
        if (table) {
            table.innerHTML = "";
            if (this.props.articles) {
                for (let i = 0; i < this.props.articles.length; i++) {
                    if (i === 15) break;
                    const article = this.props.articles[i];
                    let newRow = table.insertRow();
                    newRow.innerHTML = `<td href=${article.url}>${article.title}</td>`;
                    newRow.classList.add('articleLink');
                    newRow.onclick = this.routeChange;
                };
            };
        }
    }

    render() {
        const tableId = 'articleTable' + this.props.site;
        this.getArticles();
        return (
            <div className='news_banner'>
                <h2>{this.props.site}</h2>
                <table id={tableId}></table>
            </div>
        );
    }
}

export default NewsBanner;