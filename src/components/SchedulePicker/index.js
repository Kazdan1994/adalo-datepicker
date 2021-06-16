import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class SchedulePicker extends Component {
	render() {
		const { color, text } = this.props

		return (
			<View style={styles.wrapper}>
				<Text style={{ color }}>{text}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default SchedulePicker
