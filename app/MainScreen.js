import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function MainScreen() {
  return (
    <View style={styles.center}>
      <Text>Index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
