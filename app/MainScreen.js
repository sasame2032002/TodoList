import * as dbManager from "./DatabaseManager";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome5";

const delayTimeForUpdateList = 500;

export default function MainScreen() {
  const [data, setData] = useState(dbManager.getData);
  const [newItem, setNewItem] = useState(null);

  const [modalProps, setModalProps] = useState({
    visible: false,
    id: 0,
    index: 0,
  });
  const [editedText, setEditedText] = useState("");

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalProps.visible}
        onRequestClose={() => {
          setModalProps({ visible: !modalProps.visible });
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.background}
            onPress={() => setModalProps({ visible: false })}
          />
          <View
            style={[
              styles.modal,
              {
                top: 20 + modalProps.index * 46.15,
              },
            ]}
          >
            <TextInput
              autoFocus
              style={styles.modalInputText}
              value={editedText}
              onChangeText={(text) => setEditedText(text)}
              onSubmitEditing={() => {
                dbManager.updateData(modalProps.id, editedText);

                setTimeout(
                  () => setData(dbManager.getData),
                  delayTimeForUpdateList / 5
                );
                setModalProps({ visible: false });
              }}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.list}>
        <SwipeListView
          data={data}
          keyExtractor={(data) => data.id}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.itemsText}>list is empty</Text>
            </View>
          )}
          renderItem={(listItem) => (
            <Pressable
              style={styles.items}
              onPress={() => {
                setModalProps({
                  index: listItem.index,
                  id: listItem.item.id,
                  visible: true,
                });
                setEditedText(listItem.item.text);
              }}
            >
              <Text style={styles.itemsText}>{listItem.item.text}</Text>
            </Pressable>
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
  modalInputText: {
    fontSize: 18,
    color: "#eee",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: "#000C66",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: "90%",
    left: "5%",
    position: "absolute",
    height: 48,
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.5,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
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
    color: "#eee",
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
