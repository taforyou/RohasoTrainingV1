import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainPage from './components/Main';
import MapPage from './components/Map';

const debug = true;
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
		};

		// Passing and binding method as props
		this.rootMethod = {
			test: this.test.bind(this),
			getSelectedLocation: this.getSelectedLocation.bind(this),
		};

		// Binding internal methods
	};

	// Methods to pass as props
	test() {
		Alert.alert(
			`Test calling root method from App component`,
			'Is that Okay!?',
			[
				{text: 'OK', onPress: () => console.log('OK!!')},
			],
			{ cancelable: false }
		);
	};

	getSelectedLocation(mode, data) {
		if(typeof debug !== 'undefined' && debug === true) {
			Alert.alert(
				`Get location from Map in mode "${mode}"`,
				JSON.stringify(data)
			)
		}
		if(typeof mode === 'string') {
			if(data.constructor === Object) {
				if(mode === "sender") {
					this.setState({
						senderLocation: Object.assign({},
							data
						)
					})
				}

				if(mode === "receiver") {
					this.setState({
						receiverLocation: Object.assign({},
							data
						)
					})
				}
			}
		}
	};

	// Methods internally use

	// Component Life-Cycles
	componentWillMount() {
		console.log('App Root Comp. @ componentWillMount');
		 
	// App Initializing processes : Todo -> Move to be a function
		// Get GPS data from device
		navigator.geolocation.getCurrentPosition((result, error) => {
			let resultCoords = {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				logitudeDelta: 0.05,
			};

			if(result) {
				if(result.hasOwnProperty('coords')) {
					resultCoords = result.coords
				}
			} else {
				console.log(error)
				resultCoords.error = error
			};

			this.setState({
				currentLocation: {
					...this.state.currentLocation,
					coords:
						Object.assign({}
							, this.state.currentLocation.coords
							, resultCoords
							, { flag: false }
						)
				}
			});
		});
	};

	componentDidMount() {
		console.log('App Root Comp. @ componentDidMount');
	};

	componentWillUpdate() {
		console.log('App Root Comp. @ componentWillUpdate');
	};

	componentDidUpdate() {
		console.log('App Root Comp. @ componentDidUpdate');
	};

	componentWillUnmount() {
		console.log('App Root Comp. @ componentWillUnmount');
	};

	render() {
		return (
			<Stack 
				// Passing root props via StackNavigation 
				screenProps={{ rootMethod: this.rootMethod, rootState: this.state }}
			/>
		);
	};
};
