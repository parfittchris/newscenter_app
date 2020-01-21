import React, { Component }from 'react';
import axios from 'axios';
import NewsBanner from './Components/NewsBanner/newsBanner'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {};
  }

  componentDidMount() {
    axios
      .get('https://newscenter-api.herokuapp.com/article/')
      .then(res => {
        let articles = res.data;

        let cnnArticles = [];
        let foxArticles = [];
        let nbcArticles = [];
        let nytArticles = [];
        let huffArticles = [];
        
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];

            switch(article.site) {
              case 'CNN':
                cnnArticles.push(article);
                break;
              case 'FOX':
                foxArticles.push(article);
                break;
              case 'NBC News':
                nbcArticles.push(article);
                break;
              case 'Huffington Post':
                huffArticles.push(article);
                break;
              case 'NYTimes':
                nytArticles.push(article);
                break;
              default:
                break;
            }

            this.setState({
              cnnArticles,
              foxArticles,
              nbcArticles,
              huffArticles,
              nytArticles
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <h1 id="app_header">News Center</h1>
        <div className="articles_container">
          <NewsBanner site='FOX' articles={this.state.foxArticles} />
          <NewsBanner site='CNN' articles={this.state.cnnArticles}/>
          <NewsBanner site='NBC News' articles={this.state.nbcArticles}/>
        </div>
        <div className="articles_container">
          <NewsBanner site='NYTimes' articles={this.state.nytArticles}/>
          {/* <NewsBanner site='Huffington Post' articles={this.state.huffArticles}/> */}
        </div>
      </div>
    );
  }
}

export default App;
