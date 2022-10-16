import getData from "./DatabaseManager";

import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";

export default function MainScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData);
  }, []);

  return (
    <View style={styles.center}>
      <StatusBar showHideTransition={true} />
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={(item) => (
            <View style={styles.items}>
              <Text>{item.item.text}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    paddingVertical: 15,
  },
  list: {
    marginVertical: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
