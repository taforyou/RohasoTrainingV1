import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
	render() {
		return (
			<View>
				<MapView
					style={{width: 400, height: 400}}
					region={{
						latitude: 13.7649276,
						longitude: 100.5382926,
						latitudeDelta: 0,
						longitudeDelta: 0
					}}
				/>
			</View>
		);
	}
}
