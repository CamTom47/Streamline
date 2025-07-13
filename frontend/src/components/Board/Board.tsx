import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from 'expo-checkbox';

interface BoardParams {
	id: string;
}

export const Board = ({ id }: BoardParams): React.JSX.Element => {
  const [isChecked, setChecked] = useState(false);

	return (
		<ScrollView style={styles.scrollContainer}>
			<View style={styles.container}>
				<Text style={{ fontWeight: "bold", fontSize: 22 }}>Board {id}</Text>
				{/* Board Information */}
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Name</Text>
					<TextInput style={styles.input}>oihfdsa</TextInput>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Date Created</Text>
					<Text style={styles.input}>7/6/2025</Text>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Category</Text>
					<Text style={styles.input}>Learning</Text>
				</View>
			</View>
			<View style={styles.container}>
				<Text style={{ fontWeight: "bold", fontSize: 22 }}>Tasks</Text>
        	<View style={styles.taskContainer}>
					<Checkbox value={isChecked}
          onValueChange={setChecked}
          />
					<Text style={styles.input}>Task 1</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		width: "100%",
		height: "100%",
	},
	container: {
		display: "flex",
		alignItems: "center",
		rowGap: 20,

		padding: 20,
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		columnGap: 10,
		borderColor: "#f06919",
		backgroundColor: "white",
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		width: "100%",
		height: 60,
	},
	inputLabel: {
		fontSize: 16,
		fontWeight: "bold",
	},
	input: {
		backgroundColor: "white",
	},
  taskContainer: {
   	flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		columnGap: 10,
		padding: 10,
		width: "100%",
		height: 60,
  }
});
