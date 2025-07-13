import { Stack } from "expo-router";

export default function HomeLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerBackButtonDisplayMode: "minimal",
        headerBackTitle: 'Back',
        // headerSearchBarOptions: {}
        headerTitle: '',
        headerTransparent: true
			}}></Stack>
	);
}
