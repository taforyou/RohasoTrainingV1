import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			mapCoordinates: {
				latitude: 13.7649276,
				longitude: 100.5382926,
				latitudeDelta: 0,
				longitudeDelta: 0
			}
		}
	}
	render() {
		return (
			<View>
				<MapView
					style={{width: 400, height: 400}}
					region={this.state.mapCoordinates}
				/>
			</View>
		);
	}
}
