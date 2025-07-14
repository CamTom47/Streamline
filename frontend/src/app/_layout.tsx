import { Stack } from "expo-router";

export default function RootLayout() {
	const loggedIn = true;

	return (
		<Stack
		screenOptions={{
			headerStyle: {
				backgroundColor: 'red'
			},
		}}>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen name='+not-found' />
		</Stack>
	);
}
