import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface TaskParams {
	id: string;
}

export const Task = ({ id }: TaskParams): React.JSX.Element => {
	const [show, setShow] = useState(false); // Controls picker visibility
	const [date, setDate] = useState(new Date());
	const [selectedCategory, setSelectedCategory] = useState();

	const toggleShow = () => {
		setShow((oldState) => !oldState);
	};

	const categories = ["Learning", "Errands", "Financial", "Household"];

	const pickerSelectionComponents = categories.map( (category,idx) => {
		return (
			<Picker.Item key={idx} label={category} value={idx} style={{color: 'black', fontSize: 25}}/>
		)
	})

	const changeSelectedCategory = (itemValue: String, itemIndex: Number) => {
		console.log(itemIndex);
		console.log(itemValue);
	};

	return (
		<ScrollView style={styles.scrollContainer}>
			<SafeAreaView style={styles.container}>
				{/* Task Information */}
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Name</Text>
					<TextInput autoFocus={true} style={styles.input}>
						oihfdsa
					</TextInput>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Description</Text>
					<TextInput style={styles.input}>This is where the description goes</TextInput>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Date Created</Text>
					<DateTimePicker
						value={date}
						mode='date'
						display='default' // Or 'spinner' for iOS
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Time Created</Text>
					<DateTimePicker
						value={date}
						mode='time'
						display='default' // Or 'spinner' for iOS
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Due Date</Text>
					<DateTimePicker
						value={date}
						mode='date'
						display='default' // Or 'spinner' for iOS
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputLabel}>Due Time</Text>
					<DateTimePicker
						value={date}
						mode='time'
						display='default' // Or 'spinner' for iOS
					/>
				</View>
				{/* <View style={styles.inputContainer}> */}
					<Text style={styles.inputLabel}>Category</Text>
					<Picker
					style={{width: '100%', height: '100%'}}
						selectedValue={selectedCategory}
						onValueChange={(itemValue, itemIndex) =>
						setSelectedCategory(itemValue)}
					>
						{pickerSelectionComponents}
					</Picker>
				{/* </View> */}
			</SafeAreaView>
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
		justifyContent: "space-between",
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
	},
});
