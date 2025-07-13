import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface BoardButtonProps { 
  id: Number,
  title: String
}

export const BoardButton = ({ id, title }: BoardButtonProps): React.JSX.Element => {
	return (
			<Link style={styles.container} href={`/(tabs)/boards/${id}`} >{title}</Link>
	);
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#9069f9'
  }
})
