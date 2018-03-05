import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainPage from './components/Main';
import MapPage from './components/Map';

const Stack = StackNavigator(
	{
		Main: { screen: MainPage },
		Map: { screen: MapPage }
	},
	{
		initialRouteName: 'Main',
	}
);

export default class App extends Component {
	constructor(props){
		super(props);
		console.log("App @ constructor()")
		this.state = {
			currentLocation: {
				coords: {
					latitude: 0,
					longitude: 0,
					latitudeDelta: 0,
					longitudeDelta: 0,
				},
				address: [ {
					formatted_address: ''
				} ],
			},
			userLocation: {
				coords: {
					latitude: 0,
					longitude: 0,
					latitudeDelta: 0,
					longitudeDelta: 0,
				},
				address: [ {
					formatted_address: ''
				} ],
			},
			senderLocation: {
				coords: {
					latitude: 0,
					longitude: 0,
					latitudeDelta: 0,
					longitudeDelta: 0,
				},
				address: [ {
					formatted_address: ''
				} ],
			},
			receiverLocation: {
				coords: {
					latitude: 0,
					longitude: 0,
					latitudeDelta: 0,
					longitudeDelta: 0,
				},
				address: [ {
					formatted_address: ''
				} ],
			},
		}
		this.rootMethod = {
		}
	};
	// Methods to pass as props : bind

	// Methods internally use

	// Component Life-Cycles

	render() {
		return (
			<Stack screenProps={{ rootMethod: this.rootMethod, rootState: this.state }}/>
		);
	}
}
