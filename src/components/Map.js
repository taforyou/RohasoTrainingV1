import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import MapView from 'react-native-maps'
import * as NB from 'native-base'

export default class MapPage extends Component {
	constructor(props) {
		super(props)
		// Internal State
		this.state = {
			coords: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				longitudeDelta: 0,
			},
			address: [
				{
					formatted_address: null
				}
			],
			mapType: "standard",
			mode: "sender",
		}
		// Biding root props
		this.root = {
			state: props.screenProps.rootState,
			method: props.screenProps.rootMethod,
		}
		// Binding methods
		this.onRegionChange = this.onRegionChange.bind(this)
	}
	// React Navigation Options
	static navigationOptions = ({ navigation, navigationOptions }) => {
		const { params } = navigation.state;

		return {
			title: 'Select location',
			headerStyle: {
				backgroundColor: 'black',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
	};
	// Internal Methods
	onRegionChange(region) {
		let coords = { ...this.state.coords }
		coords.latitude = region.latitude
		coords.longitude = region.longitude
		this.setState({ coords })
	}
	// Component Life Cycles
	componentWillMount() {
		console.log("MapPage @ componentWillMount()")
	}
	componentWillReceiveProps(nextProps) {
	  console.log("MapPage @ componentWillReceiveProps()")
	}

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
								initialRegion={this.state.coords}
								onRegionChangeComplete={this.onRegionChange}
							>
							</MapView>
						</TouchableOpacity>
						</View>
						<View style={{ flex: 1, backgroundColor: '#ffffff' }}>
							<NB.Button full block success 
								onPress={() => this.getSelectedData()}
							>
								<Text
									style={{ color: "white" }}
								>Use this location</Text>
							</NB.Button>
							<Text>
								Latitude: {this.state.coords.latitude} Longitude: {this.state.coords.longitude}
							</Text>
							<Text>
								Address: {this.state.address[0].formatted_address}
							</Text>
						</View>
					</Container>
					: <Text>Error: Wrong mode</Text>
				}
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
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
})