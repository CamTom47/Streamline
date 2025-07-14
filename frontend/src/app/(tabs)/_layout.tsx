import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name='home'
				options={{
					title: "Home",
					//Adding an icon
					// tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
				}}
			/>
      <Tabs.Screen
				name='tasks'
				options={{
					title: "Tasks",
					//Adding an icon
					// tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
				}}
			/>
      <Tabs.Screen
				name='lists'
				options={{
					title: "List",
					//Adding an icon
					// tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
				}}
			/>
		</Tabs>
	);
}
