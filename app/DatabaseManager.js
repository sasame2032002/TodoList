import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todos");

export let getData = [];

export const fetchData = () => {
  db.transaction((tx) =>
    tx.executeSql(
      "SELECT * FROM todos",
      null,
      (txObj, { rows: { _array } }) => {
        getData = _array;
        console.log("fetchData: Done( rows: ", _array.length, ")");
      },
      (txObj, error) => console.warn("fetchData:\n", error)
    )
  );
};

export const createDataBase = () => {
  db.transaction((tx) =>
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, complate boolean)",
      null,
      () => console.log("createDataBase: Done"),
      (txObj, error) => console.warn("createDataBase:\n", error)
    )
  );
  fetchData();
};

export const insertData = (text) => {
  db.transaction((tx) =>
    tx.executeSql(
      "INSERT INTO todos(text, complate) VALUES(?, false)",
      [text],
      (txObj, result) =>
        console.log("insertData: Done( rows: ", result.rowsAffected, ")"),
      (txObj, error) => console.warn("insertData:\n", error)
    )
  );
  fetchData();
};

export const deleteData = (id) => {
  db.transaction((tx) =>
    tx.executeSql(
      "DELETE FROM todos WHERE id=?",
      [id],
      (txObj, result) => console.log("deleteData: Done"),
      (txObj, error) => console.warn("deleteData:\n", error)
    )
  );
  fetchData();
};

export const updateData = (id, text) => {
  db.transaction((tx) =>
    tx.executeSql(
      "UPDATE todos SET text=? WHERE id=?",
      [text, id],
      (txObj, result) =>
        console.log("updateData: Done( rows: ", result.rowsAffected, ")"),
      (txObj, error) => console.warn("updateData:\n", error)
    )
  );
};
