import React, { Component } from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid'
import Form from './Components/Form'
import axios from 'axios'
import Yelp from './Components/Yelp';


class App extends Component {
    state = {
      searchLocationQuery:'',

  }






onFormSubmit = (searchLocationQuery) => {
  this.setState({
    searchLocationQuery: searchLocationQuery
  })
}
render() {
    return (

      <div className="wrapper">
           

      <div className="main">
      <div width="100%" className="header-footer"></div>
      <h1>AJ Yelp App</h1>
      <h2 className="subtitle">Because food is love</h2>
      
         <Grid 
         container
         direction="row"
         justify="center"
         alignItems="center"
         >
         <Form 
         onFormSubmit = {this.onFormSubmit}/>

         <Yelp searchLocationQuery = {this.state.searchLocationQuery}/>
        </Grid>
        <Grid >
        </Grid>
     

     {
     
     }
        </div>
      </div>
      
    );
  }
}

export default App;
