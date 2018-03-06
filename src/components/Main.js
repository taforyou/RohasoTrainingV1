import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as NB from 'native-base'

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.root = {
			state: props.screenProps.rootState,
			method: props.screenProps.rootMethod,
		}
	}
	static navigationOptions = {
    header: null,
  };
	render() {
		return (
			<NB.Container>
				<NB.Button full block primary onPress={() => this.root.method.test()}>
					<Text style={{ color: 'white'}}>Next</Text>
				</NB.Button>
			</NB.Container>
		)
	}
}