import * as dbManager from "./DatabaseManager";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

const delayTimeForUpdateList = 500;

export default function MainScreen() {
  const [data, setData] = useState(dbManager.getData);
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    dbManager.createDataBase();

    // we need some time to create and fetch database
    setTimeout(() => {
      setData(dbManager.getData);
    }, delayTimeForUpdateList);
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
        <TextInput
          style={styles.newItem}
          placeholder="new task"
          value={newItem}
          onChangeText={(text) => setNewItem(text)}
          onSubmitEditing={() => {
            dbManager.insertData(newItem);
            setTimeout(() => {
              setData(dbManager.getData);
            }, delayTimeForUpdateList / 5);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 20,
  },
  itemsText: {
    fontSize: 18,
  },
  items: {
    paddingVertical: 15,
  },
  list: {
    marginVertical: 20,
    width: "90%",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
});
