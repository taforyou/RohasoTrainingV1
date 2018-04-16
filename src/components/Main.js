import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as NB from 'native-base';
const debug = true;

	// Todo: 
	// - Seperate menu button to be two
	// 		- Exoandable menu wheh get address from the API 
	//		- View Recent tasks (can get the recent location to re-send)
	//		- Select location on map (the old)
	// - Add menu to get messages to sender
	// - Next button with listener (Validation )
	// - Set roundtrip toggle

export default class Main extends Component {
	constructor(props) {
		super(props);
		console.log("Main Comp. @ constructor()");
		this.props = props;
		this.root = {
			state: props.screenProps.rootState,
			method: props.screenProps.rootMethod,
		};
	};
	static navigationOptions = {
    header: null,
	};
	// Component Life Cycles
	componentWillMount() {
		console.log('Main Comp. @ componentWillMount');
	};
	componentDidMount() {
		console.log('Main Comp. @ componentDidMount');
	};
	componentWillReceiveProps(props) {
		console.log('Main Comp. @ componentWillReceiveProps');
			if(debug) {
				console.log('-----= props =-----'); console.log(props);
			};
	};
	componentWillUpdate(nextProps, nextState) {
		console.log('Main Comp. @ componentWillUpdate');
			if(debug) {
				console.log('-----= nextProps =-----'); console.log(nextProps);
				console.log('-----= nextState =-----'); console.log(nextState);
			};
	};
	componentDidUpdate(prevProps, prevState) {
		console.log('Main Comp. @ componentDidUpdate')
			if(debug) {
				console.log('-----= prevProps =-----'); console.log(prevProps);
				console.log('-----= prevState =-----'); console.log(prevState);
			};
	};
	componentWillUnmount() {
		console.log('Main Comp. @ componentWillUnmount');
	};
	render() {
		return (
			<NB.Container>
				<View style={{ backgroundColor: "black", padding: 20 }}>
					<Text style={{ fontSize: 30, fontWeight: "bold", color: "white", textAlign: "center"}}>Rohaso Messenger Service</Text>
					<Text style={{ fontSize: 16, color: "white", textAlign: "center"}}>Deliver your package quickly and safely</Text>
				</View>
				<TouchableOpacity 
					style={[styles.menuFrame, {}]}
					onPress={() => this.props.navigation.navigate('Map', { mode: "sender", })}>
					<View style={styles.menuGroupLeft}>
						<Text style={styles.menuTitle}>SENDER</Text>
						<Text style={styles.menuDescription}>
						{
							this.root.state.senderLocation.address[0].formatted_address
							? this.root.state.senderLocation.address[0].formatted_address
							: 'Tab to search addresses'
						}
						</Text>
					</View>
					<View style={styles.menuGroupRight}>
						<Text style={styles.menuRecent}>
							RECENT
						</Text>
						<Text style={styles.menuNextButton}>{">"}</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity 
					style={[styles.menuFrame, {}]}
					onPress={() => this.props.navigation.navigate('Map', { mode: "receiver", })}>
					<View style={styles.menuGroupLeft}>
						<Text style={styles.menuTitle}>RECIPIENT</Text>
						<Text style={styles.menuDescription}>
						{
							this.root.state.receiverLocation.address[0].formatted_address 
							? this.root.state.receiverLocation.address[0].formatted_address
							: 'Tab to search addresses'
						}
						</Text>
					</View>
					<View style={styles.menuGroupRight}>
						<Text style={styles.menuRecent}>
							RECENT
						</Text>
						<Text style={styles.menuNextButton}>{">"}</Text>
					</View>
				</TouchableOpacity>
				<NB.Button full block primary>
					<Text style={{ color: 'white'}}>NEXT</Text>
				</NB.Button>
			</NB.Container>
		);
	};
};

const styles = StyleSheet.create({
	menuFrame: {
		borderStyle: "solid", 
		borderBottomColor: "#999999", 
		borderBottomWidth: 1,
		backgroundColor: "#dddddd",
		padding: 20,
		height: 120,
		display: "flex",
		flexDirection: "row"
	},
	menuGroupLeft: {
		width: '75%'
	},
	menuGroupRight: {
		width: '25%'
	},
	menuTitle: {
    color: 'black',
    fontWeight: 'bold',
		fontSize: 28,
		letterSpacing: 10,
		paddingTop: 10,
	},
	menuDescription: {
    color: 'black',
    fontSize: 16,
		paddingTop: 5,
	},
	menuRecent: {
		fontSize: 20,
		textDecorationLine: 'underline',
		paddingTop: 10,
	},
	menuNextButton: {
		fontSize: 20,
	},
});
