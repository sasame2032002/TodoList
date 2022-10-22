import * as dbManager from "./DatabaseManager";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";

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
        <SwipeListView
          data={data}
          keyExtractor={(data) => data.id}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.itemsText}>list is empty</Text>
            </View>
          )}
          renderItem={(item) => (
            <Animated.View style={styles.items}>
              <Text style={styles.itemsText}>{item.item.text}</Text>
            </Animated.View>
          )}
          renderHiddenItem={() => (
            <View>
              <Text>delete</Text>
            </View>
          )}
          rightOpenValue={-Dimensions.get("window").width}
          leftOpenValue={75}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          useNativeDriver={false}
          onSwipeValueChange={(swipeData) => {
            const { key, value } = swipeData;
            if (value < -Dimensions.get("window").width) {
              dbManager.deleteData(key);
              setTimeout(() => {
                setData(dbManager.getData);
              }, delayTimeForUpdateList / 10);
            }
          }}
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
            }, delayTimeForUpdateList / 10);
            setNewItem("");
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
