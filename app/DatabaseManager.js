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
