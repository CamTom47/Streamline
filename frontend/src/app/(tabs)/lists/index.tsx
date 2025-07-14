import Button from "@/src/components/Button";
import { StyleSheet, Text, View } from "react-native";

import { BoardButton } from "@/src/components/BoardButton/BoardButton";

export default function HomeScreen() {
	// Data will load with different boards

	const boards = [
		{ id: 1, title: "board 1" },
		{ id: 2, title: "board 2" },
		{ id: 3, title: "board 3" },
	];

	const boardButtonComponents = boards.map((board) => {
		return <BoardButton key={board.id} id={board.id} title={board.title} />;
	});

	return (
		<View style={styles.container}>
			<Text>Boards</Text>
			{boardButtonComponents}
			<Button text='Create New Board' url='./new' color='green' />
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
