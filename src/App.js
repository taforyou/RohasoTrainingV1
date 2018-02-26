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
	onRegionChange(region) {
		// console.log('Latitude: ' + region.latitude + ' Longitude:' + region.longitude)
		setTimeout(function () {
			this.setState({
				mapCoordinates: {
						latitude: region.latitude,
						longitude: region.longitude,
						latitudeDelta: region.latitudeDelta,
						longitudeDelta: region.longitudeDelta,
				}
			})
		}.bind(this), 2000);
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