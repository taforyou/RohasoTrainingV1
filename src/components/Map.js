import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import MapView from 'react-native-maps';
import * as NB from 'native-base';
const debug = true;

// Todo:
// - Search by location name (string)
// 		- Marks of locations with seperated types (eg. recent location)
//		- View nearby messengers
// - Touch on map to mark

// Todos in next stage component
// - Message to driver
// - Send feedback to system provider
// - Better home screen for app
// - Authentication

// Todos on backend
// - Data pattern for tasks

export default class MapPage extends Component {
	constructor(props) {
		super(props);
		console.log("Map Comp. @ constructor()");
		// Internal State
		this.state = {
			currentLocation: {
				coords: {
					latitude: 0,
					longitude: 0,
					latitudeDelta: 0.05,
					longitudeDelta: 0,
				},
				address: [
					{
						formatted_address: null
					}
				],
			},
			mapType: "standard",
			mode: null,
		};
		// Initializing
		console.log("Map comp @ Initializing in constructor()")
		if(props.navigation.state.hasOwnProperty('params')) {
			if(props.navigation.state.params.hasOwnProperty('mode')) {
				this.state.mode = props.navigation.state.params.mode;
			};
		};

		// Biding root props
		this.root = {
			state: props.screenProps.rootState,
			method: props.screenProps.rootMethod,
		};

		// Binding methods
		this.onRegionChange = this.onRegionChange.bind(this);
		this.getSelectedLocation = this.getSelectedLocation.bind(this);
	};

	// React-Navigation Options
	static navigationOptions = ({ navigation, navigationOptions }) => {
		let mode = null
		if(navigation.state.hasOwnProperty('params')) {
			if(navigation.state.params.hasOwnProperty('mode')) {
				mode = navigation.state.params.mode;
			}
		}
		
		return {
			title: mode === "sender" ? "Select address to receive packages"
			: mode === "receiver" ? "Select address to send packages"
			: 'Select location',
			headerStyle: {
				backgroundColor: 'black',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		};
	};
	// Internal Methods
	async onRegionChange(updatedRegion) {
		if (updatedRegion 
		 && updatedRegion.hasOwnProperty('latitude') 
		 && updatedRegion.hasOwnProperty('longitude')
		) {
			// Get Address from API (fetching reverse geocoding)
			const updatedAddress = await this.requestReverseGeocoding(updatedRegion.latitude + ',' + updatedRegion.longitude)
			
			// Update in states
			this.setState({
				currentLocation: {
					...this.state.currentLocation,
					coords:
						Object.assign({}
							, this.state.currentLocation.coords
							, updatedRegion
							, { flag: false }
						),
					address:
						Object.assign({}
							, this.state.currentLocation.address
							, updatedAddress
							, { flag: false }
						),
					
				}
			}, () => { console.log(this.state) })
		}

	};

	async requestReverseGeocoding(latlong) {
		const fetchAPI = async (latlong) => {
			try {
				const response = await fetch(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlong}&key=AIzaSyBN0XoBo1UePyYSeCTjJayNdPx2DHk3Qy8`
				);
				const result = await response.json();
				if (result.status === 'OK') {
					return result.results;
				}
				return [ { formatted_address: '' }]
			} catch (err) {
				console.error(err);
			}
		}
		return fetchAPI(latlong);
	}

	getSelectedLocation () {
		this.props.navigation.navigate('Main')
		this.root.method.getSelectedLocation(this.state.mode, this.state.currentLocation)
	}

	// Component Life Cycles
	componentWillMount() {
		console.log('Map Comp. @ componentWillMount')
	};
	componentDidMount() {
		console.log('Map Comp. @ componentDidMount')
	};
	componentWillReceiveProps(props) {
		console.log('Map Comp. @ componentWillReceiveProps')			
		if(debug) {
			console.log('-----= props =-----'); console.log(props);
		};
	};
	componentWillUpdate(nextProps, nextState) {
		console.log('Map Comp. @ componentWillUpdate')
			if(debug) {
				console.log('-----= nextProps =-----'); console.log(nextProps);
				console.log('-----= nextState =-----'); console.log(nextState);
			};
	};
	componentDidUpdate(prevProps, prevState) {
		console.log('Map Comp. @ componentDidUpdate')
			if(debug) {
				console.log('-----= prevProps =-----'); console.log(prevProps);
				console.log('-----= prevState =-----'); console.log(prevState);
			};
	};
	componentWillUnmount() {
		console.log('Map Comp. @ componentWillUnmount')
	};

	render() {
		return (
			<Container style={{ flex: 3, backgroundColor: '#ffffff' }}>
				{ this.state.mode !== null ?
					<Container>
						<View style={{ flex: 3, opacity: 0.8, alignContent: 'center'}}>
						<TouchableOpacity
							activeOpacity={0.9}
							style={styles.mapView}
						>
							<Text style={{ fontSize: 80, color: 'red', flex: 1, textAlign: 'center'}} >+</Text>
							<MapView
								style={styles.map}
								provider="google"
								mapType={this.state.mapType}
								loadingEnabled={true}
								initialRegion={this.root.state.currentLocation.coords}
								onRegionChangeComplete={this.onRegionChange}
							>
							</MapView>
						</TouchableOpacity>
						</View>
						<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
							<NB.Button full block success 
								onPress={() => { this.getSelectedLocation() }}
							>
								<Text
									style={{ color: "white" }}
								>Use this location</Text>
							</NB.Button>
							<Text>
								Latitude: {this.state.currentLocation.coords.latitude} Longitude: {this.state.currentLocation.coords.longitude}
							</Text>
							<Text>
								Latitude Delta: {this.state.currentLocation.coords.latitudeDelta} Longitude Delta: {this.state.currentLocation.coords.longitudeDelta}
							</Text>
							<Text>
								RootProps Coords: 
									{this.root.state.currentLocation.coords.latitude},
									{this.root.state.currentLocation.coords.longitude},
									{this.root.state.currentLocation.coords.latitudeDelta},
									{this.root.state.currentLocation.coords.longitudeDelta},
							</Text>
							<Text>
								Address: {this.state.currentLocation.address[0].formatted_address}
							</Text>
						</View>
					</Container>
					: <Text>Error: Wrong mode</Text>
				}
			</Container>
		);
	};
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
	},
	mapView: {
		flex: 0,
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
