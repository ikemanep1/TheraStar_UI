import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Article from './components/Article';
import ArticleAdd from './components/ArticleAdd';
import ArticleList from './components/ArticleList';
import Mhp from './components/Mhp';
import Review from './components/Review';
import MhpList from './components/MhpList';
import ReviewAdd from './components/ReviewAdd';
import ReviewList from './components/ReviewList';
import NewArticleControl from './components/NewArticleControl';
import NewReviewControl from './components/NewReviewControl';
import Error404 from './components/Error404';
import {Switch, Route} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state1Items: [],
      state2Items: [],
      state3Items: [],
      isLoaded: false,
    }
    this.handleAddingNewArticleToList = this.handleAddingNewArticleToList.bind(this);
    this.handleAddingNewReviewToList = this.handleAddingNewReviewToList.bind(this);
  };

    componentDidMount() {
      fetch('https://infinite-basin-93540.herokuapp.com/mhps')
      .then(res => res.json())
      .then(json => {
        this.setState({
        isLoaded: true,
        state1Items: json,
      })
    });
      fetch('https://infinite-basin-93540.herokuapp.com/articles')
      .then(res => res.json())
      .then(json => {
        this.setState({
        isLoaded: true,
        state2Items: json,
      })
    });
      fetch('https://infinite-basin-93540.herokuapp.com/reviews')
      .then(res => res.json())
      .then(json => {
        this.setState({
        isLoaded: true,
        state3Items: json,
      })
    });
}

  handleAddingNewArticleToList(newArticle) {
    let newMasterArticleList = this.state.masterArticleList.slice();
    newMasterArticleList.push(newArticle);
    this.setState({masterArticleList: newMasterArticleList});
  }

  handleAddingNewReviewToList(newReview) {
    let newMasterReviewList = this.state.masterReviewList.slice();
    newMasterReviewList.push(newReview);
    this.setState({masterReviewList: newMasterReviewList});
  }
  render() {

        const mhpSingular = {
          margin: '40px',
          textAlign: 'center',
          backgroundColor: '#7a387a',
          padding: '20px',
          borderRadius: '100px',
          border: '3px solid #ddb0dd',
          fontFamily: 'luminari, fantasy',
          color: '#fdfdff'
        }
        const itemGrid = {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }
        const { isLoaded, state1Items, state2Items, state3Items } = this.state;
        if (!isLoaded) {
          return <div style={mhpSingular}>Loading</div>;
        }

        else {
    return (
      <div className="App">
      <div className="HomeStretch">
      <Header/>
      <header className="TheraStar">
      </header>
      <div>
      <Switch>
      <Route exact path='/' render={() =>< MhpList mhpTotal = {this.state.state1Items} />}/>
      <Route path='/articleadd' render={()=><NewArticleControl onNewArticleCreation={this.handleAddingNewArticleToList} />} />
      <Route path='/reviewadd' render={()=><NewReviewControl onNewReviewCreation={this.handleAddingNewReviewToList} />} />
      <Route exact path='/reviewlist' render={() =>< ReviewList reviewTotal = {this.state.state3Items} />}/>
      <Route exact path='/articlelist' render={() =>< ArticleList articleTotal = {this.state.state2Items} />}/>
      <Route component={Error404} />
      </Switch>
      <Footer/>
      </div>
      </div>
      </div>
    );
  }
}
}

export default App;
