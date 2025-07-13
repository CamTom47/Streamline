import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

interface TaskButtonProps {
	id: Number;
	title: String;
}
const TaskButton = ({ id, title }: TaskButtonProps): React.JSX.Element => {
	return (
		<Link style={styles.container} href={`/(tabs)/tasks/${id}`}>
			{title}
		</Link>
	);
};

export default TaskButton;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "90%",
		padding: 20,
		borderRadius: 10,
		backgroundColor: "#9069f9",
	},
});
