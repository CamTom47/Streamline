import { Stack } from "expo-router";

export default function BoardsLayout() {
	return (
		<Stack
			screenOptions={{
        headerShown: false
	
      }}>
			<Stack.Screen name='index' />
		</Stack>
	);
}
