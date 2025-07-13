import { Link, RelativePathString } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ButtonProps {
	text: String;
	url: RelativePathString;
	color: String;
}


const Button = ({ text, url, color }: ButtonProps): React.JSX.Element => {
	return (
		<View>
			<Link style={styles.success} href={url} push asChild>
				<Text>{text}</Text>
			</Link>
		</View>
	);
};

const styles = StyleSheet.create({
	success: {
		backgroundColor: "lightblue",
		padding: 5,
		borderRadius: 5,
		fontSize: 16
	},
	error: {
		backgroundColor: "red",
		padding: 5,
		borderRadius: 5,
		fontSize: 16
	},
});

export default Button;
