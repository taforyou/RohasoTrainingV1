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
		initialRouteName: 'Map',
	}
);

export default class App extends Component {
	constructor(props){
		super(props);
		console.log("App Root Comp. @ constructor()")
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
			test: this.test.bind(this)
		}
	};
	// Methods to pass as props : bind
	test() {
		Alert.alert(
			`Test calling root method from App component`,
			'Is that Okay!?',
			[
				{text: 'OK', onPress: () => console.log('OK!!')},
			],
			{ cancelable: false }
		)
	}
	// Methods internally use

	// Component Life-Cycles
	componentWillMount() {
		console.log('App Root Comp. @ componentWillMount')
	}
	componentDidMount() {
		console.log('App Root Comp. @ componentDidMount')
	}
	componentWillUpdate() {
		console.log('App Root Comp. @ componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('App Root Comp. @ componentDidUpdate')
	}
	componentWillUnmount() {
		console.log('App Root Comp. @ componentWillUnmount')
	}
	render() {
		return (
			<Stack 
				// Passing root props via StackNavigation 
				screenProps={{ rootMethod: this.rootMethod, rootState: this.state }}
			/>
		);
	}
}
