import React, { Component }from 'react';
import axios from 'axios';
import NewsBanner from './Components/NewsBanner/newsBanner'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      selected: []
    };

    this.orgSelector = this.orgSelector.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://newscenterapi.herokuapp.com/')
      .then(res => {
        let articles = res.data;

        let foxArticles = [];
        let apArticles = [];
        let nytArticles = [];
        let politicoArticles = [];
        let reutersArticles = [];
        let buzzfeedArticles = [];

        
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];

            switch(article.site) {
              case 'Fox':
                foxArticles.push(article);
                break;
              case 'AP':
                apArticles.push(article);
                break;
              case 'Politico':
                politicoArticles.push(article);
                break;
              case 'nytimes':
                nytArticles.push(article);
                break;
              case 'Reuters':
                reutersArticles.push(article);
                break;
              case 'Buzzfeed':
                buzzfeedArticles.push(article);
                break;
              default:
                break;
            }

          this.setState({
            allArticles: {
                foxArticles,
                apArticles,
                politicoArticles,
                nytArticles,
                reutersArticles,
                buzzfeedArticles
              }
            });
          }
      })
      .catch(err => {
        console.log(err);
      });
  }

  orgSelector(e) {
    let orgs = this.state.selected;

    if (e.target.getAttribute('pressed') === 'false') {
      e.target.setAttribute('pressed', 'true')
      e.target.classList.remove('choiceBtn');
      e.target.classList.add('choiceBtnActive');

      const org = {
        name: e.target.getAttribute('name'),
        articles: e.target.getAttribute('value') + 'Articles'
      }
      orgs.push(org)
    } else {
      orgs = orgs.filter(el => el.name !== e.target.getAttribute('name'))
      e.target.setAttribute('pressed', 'false')
      e.target.classList.remove('choiceBtnActive');
      e.target.classList.add('choiceBtn');
    }

    this.setState({
      selected: orgs
    });
  }

  populateBoard() {
    const orgs = this.state.selected;
    return orgs.map((el, idx) => {
      return <NewsBanner key={idx} site={el.name} articles={this.state.allArticles[el.articles]} className="test"/>
    })
  }


  render() {
    return (
      <div className="App">
        <div className="articlesContainer">
          <div id="pickerSection">
            <div className="pickerItems">
              <h3 className="pickerTitle">Select News Sources</h3>
              <div className="choices">
                <div className="choiceBtn" onClick={this.orgSelector} pressed="false" value="fox" name="Fox">Fox News</div>
                <div className="choiceBtn" onClick={this.orgSelector} pressed="false" value="reuters" name="Reuters">Reuters</div>
                <div className="choiceBtn" onClick={this.orgSelector} pressed="false" value="buzzfeed" name="Buzzfeed">Buzzfeed</div>
                <div className="choiceBtn" onClick={this.orgSelector} pressed="false" value="ap" name="AP">AP News</div>
                <div className="choiceBtn" onClick={this.orgSelector} pressed="false" value="politico" name="Politico">Politico</div>
                <div className="choiceBtn" onClick={this.orgSelector} pressed="false" value="nyt" name="New York Times">NY Times</div>
              </div>
            </div>
          </div>
          <div>
            <h1 id="app_header">News Center</h1>
            <div className="articlesSection">
              {this.populateBoard()}
            </div>
          </div>
        </div>
        <div className="articles_container">
        </div>
      </div>
    );
  }
}

export default App;
