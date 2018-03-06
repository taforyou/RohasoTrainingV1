import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as NB from 'native-base';

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
				<NB.Button full block primary onPress={() => this.root.method.test()}>
					<Text style={{ color: 'white'}}>Next</Text>
				</NB.Button>
			</NB.Container>
		);
	};
};