
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Board } from '@/src/components/Board/Board';

export default function BoardScreen() {
	const boardId: string = useLocalSearchParams().boardId[0];

	return (
		<View style={styles.container}>
			<Board id={boardId}/>
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
