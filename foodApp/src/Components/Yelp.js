import React, { Component } from 'react'
import axios from 'axios'

class yelp extends Component{
    state={
        results:[],
        errorState: null,
        loading: false,

    }

    componentDidUpdate (prevProps, prevState) {
      if(this.props.searchLocationQuery !== prevProps.searchLocationQuery) {
          this.setState({
              results: [], 
          }, () => this.getRestaurants(this.props.searchLocationQuery))
      }
  }

  getRestaurants = (locationSearched) => {
    this.setState({ loading: true })

    
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=vancouver&limit=10&term=${locationSearched}&locale=en_CA`, {
    headers: {
        //to get the API from the .env file use process.env.{variable name}
        Authorization: `Bearer ${process.env.key}`
    },
  
    })
    .then((res) => {
        console.log(res.data.businesses)
       
        this.setState({ results: res.data.businesses, loading: false })
    })
    .catch((err) => {
        this.setState({ errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`, loading: false })
    })
}

renderEmptyState () {
  return (
      <h2 className = "heading-tertiary">`Hang tight! We are working on getting you the list of best brunch spots in your neighbourhood! `</h2>
  )
}

renderRestaurantInfo () {
  
  const RestaruantList = this.state.results.map((result) => {
      
      return (    
          <div 
              className = "RestaurantInfo"
              key = {result.id}
          >
              <img src = {result.image_url} alt = "" className = "RestaurantInfo__img" />
              <h2 className = "heading-tertiary RestaurantInfo__name">{result.name}</h2>
              
              <p className = "RestaurantInfo__para">
                 
                  {result.location.display_address[0]}, {result.location.display_address[1]}
              </p>
              
              <p className = "RestaurantInfo__para">
                 
                  {result.phone}
              </p>

   

              <p className = "RestaurantInfo__reviewCount"> Based on {result.review_count} Reviews</p>
         
              <a 
                  href= {result.url} 
                  className = "RestaurantInfo__website">
                      More information on Yelp
              </a>

          
          </div>  
      );
  });

  return(
      <div className="RestuarantList__gallery">{RestaruantList}</div>
  )
}

render() {
  return (
      
      <section className="RestuarantList">
          {this.state.results.length ? this.renderRestaurantInfo() : this.renderEmptyState()}

          {/*conditional rendering for error state - when this.state.errorState is not true*/}
          {!!this.state.errorState &&
              <h1>{this.state.error}</h1>
          }   
      </section>
  )}

}

    

export default yelp;
