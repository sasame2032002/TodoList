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
import Icon from "react-native-vector-icons/FontAwesome5";

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
            <View style={styles.items}>
              <Text style={styles.itemsText}>{item.item.text}</Text>
            </View>
          )}
          renderHiddenItem={() => (
            <View style={styles.hiddenItem}>
              <Icon name="trash" size={20} style={styles.hiddenItemIcon} />
            </View>
          )}
          rightOpenValue={-Dimensions.get("window").width}
          disableRightSwipe
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
          placeholderTextColor="#aaaa"
          value={newItem}
          onChangeText={(text) => setNewItem(text)}
          onSubmitEditing={() => {
            dbManager.insertData(newItem);
            setTimeout(() => {
              setData(dbManager.getData);
            }, delayTimeForUpdateList / 5);
            setNewItem("");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenItemIcon: {
    justifyContent: "center",
    height: 25,
    paddingRight: 10,
  },
  hiddenItem: {
    backgroundColor: "#7EC8E3",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  newItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 20,
    borderColor: "#eee",
  },
  itemsText: {
    fontSize: 18,
    color: "#eee",
  },
  items: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#000C66",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  list: {
    marginVertical: 20,
    width: "90%",
    backgroundColor: "#000C66",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  center: {
    flex: 1,
    backgroundColor: "#0000FF",
    alignItems: "center",
  },
});
