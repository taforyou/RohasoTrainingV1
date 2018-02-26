import React, { Component } from 'react'

class GoogleMapAPI extends Component {
    constructor(props) {
      super(props)
        this.state = {
          coordinate: null
        }
        this.fetchMapCoordinate = this.fetchMapCoordinate.bind(this)
    }
    fetchMapCoordinate() {
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Central+Plaza+Ladprao&key=AIzaSyD_Jb7F4G48ZKkeCoNzMj664f-MEUHXAcU')
      .then((response) => {
        console.log("After fetch()")
        console.log(response)
        if(response.ok) {
          const result = response.json()
          console.log("After json()")
          console.log(result)
          result.then( done => {
            console.log("After result promise")
            console.log(done)
            if(done.status === "OK") {
              this.setState({ coordinate: done.results })
            }
          })
        }
      }).catch(err => {
        console.err(err)
      })
    }
    componentDidMount() {
      this.fetchMapCoordinate()
    }
    render(){
      let mapList 
      if(this.state.coordinate) {
        mapList = this.state.coordinate.map((coordinate, key) => {
          return <p key="{key}">{ coordinate.formatted_address }</p>
        })
      }
      return(
        <div>
          <p>Google Map API Component</p>
          <p>{ this.state.coordinate ? this.state.coordinate[0].formatted_address
              : 'No Address'
          }</p>
          <div>{ mapList }</div>
        </div>
      )
    }
  }

  export default GoogleMapAPI