import TaskButton from "@/src/components/TaskButton/TaskButton";
import Button from '@/src/components/Button';
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const tasks = [
		{ id: 1, title: "task 1" },
		{ id: 2, title: "task 2" },
		{ id: 3, title: "task 3" },
	];

	const taskButtonComponents = tasks.map((task) => {
		return <TaskButton key={task.id} id={task.id} title={task.title} />;
	});

	const params = useLocalSearchParams<{ name?: string }>();

	return (
		<View style={styles.container}>
			<Text>Tasks</Text>
			{taskButtonComponents}
      <Button text='Add A Task' url='./new' color='green'/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		rowGap: 6,
		justifyContent: "center",
		alignItems: "center",
	},
});
