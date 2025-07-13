
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Task } from "@/src/components/Task/Task";

export default function TaskScreen() {
    const taskId: string = useLocalSearchParams().taskId[0];

    return (
        <View style={styles.container}>
            <Task id={taskId}/>
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
