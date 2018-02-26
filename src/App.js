import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import MapView , { Marker } from 'react-native-maps'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			mapCoordinates: {
				latitude: 13.7649276,
				longitude: 100.5382926,
				latitudeDelta: 0,
				longitudeDelta: 0
			},
			mapType: "standard",
			currentPlace: null,
		}
		this.onRegionChange = this.onRegionChange.bind(this)
		this.mapPressed = this.onMapPressed.bind(this)
	}

	reverseGeocodingRequest(request) {
		// Worked Now
		const fetchAPI = async (request) => {
			try {
				const response = await fetch(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${request}&key=AIzaSyBN0XoBo1UePyYSeCTjJayNdPx2DHk3Qy8`
				);
				const result = await response.json();
				if (result.status === 'OK') {
					return result.results;
				}
				return;
			} catch (err) {
				console.error(err);
			}
		}
		fetchAPI(request).then(result => {
			this.setState({currentPlace: result[0].formatted_address})
			console.log(this.state.currentPlace)
		})
	}
	onRegionChange(region) {
		// console.log('Latitude: ' + region.latitude + ' Longitude:' + region.longitude)
		this.setState({
			mapCoordinates: {
				latitude: region.latitude,
				longitude: region.longitude,
				latitudeDelta: region.latitudeDelta,
				longitudeDelta: region.longitudeDelta,
			}
		})
		let latlong = region.latitude + ',' + region.longitude
		this.reverseGeocodingRequest(latlong)
	}

	onMapPressed(value) {
	}

	render() {
		return (
			<Container style={{ flex: 1, backgroundColor: '#ffffff' }}>
				<TouchableOpacity
					activeOpacity={0.9}
					style={styles.mapView}
				>
					<MapView
						style={styles.map}
						provider="google"
						mapType={this.state.mapType}
						loadingEnabled={true}
						initialRegion={this.state.mapCoordinates}
						onRegionChangeComplete={this.onRegionChange}
					/>
				</TouchableOpacity>
				<Text>
					Latitude: {this.state.mapCoordinates.latitude} Longitude: {this.state.mapCoordinates.longitude}
				</Text>
				<Text>
					Address: {this.state.currentPlace}
				</Text>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
	},
	mapView: {
		flex: 0,
		height: '60%'
	}
});