import * as dbManager from "./DatabaseManager";

import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";

() => dbManager.fetchData();

export default function MainScreen() {
  const [data, setData] = useState(dbManager.getData);

  useEffect(() => {
    dbManager.createDataBase();

    // we need some time to create and fetch database
    setTimeout(() => {
      setData(dbManager.getData);
    }, 500);
  }, []);

  return (
    <View style={styles.center}>
      <StatusBar showHideTransition={true} />
      <View style={styles.list}>
        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.itemsText}>list is empty</Text>
            </View>
          )}
          renderItem={(item) => (
            <View style={styles.items}>
              <Text style={styles.itemsText}>{item.item.text}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemsText: {
    fontSize: 18,
  },
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
