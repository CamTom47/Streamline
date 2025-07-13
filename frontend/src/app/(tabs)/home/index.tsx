import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const currentUser = "Cameron"
	return (
		<View style={styles.container}>
			<Text>Home View</Text>
			<Text>Welcome back {currentUser}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
