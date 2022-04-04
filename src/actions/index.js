export const LOAD_LIST = "LOAD_LIST";
export const ADD_ITEM = "ADD_ITEM";
export const COMPLETE_ITEM = "COMPLETE_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const UPDATE_REQ = "UPDATE_REQ";

export function loadList(list) {
  return {
    list: list,
    type: LOAD_LIST,
  };
}

export function addedData(data) {
  return {
    data: data,
    type: ADD_ITEM,
  };
}

export function completeItem(itemId) {
  return {
    id: itemId,
    type: COMPLETE_ITEM,
  };
}

export function updateReq() {
  return {
    edit: true,
    type: UPDATE_REQ,
  };
}

export function updatereq() {
  return (dispatch) => {
    dispatch(updateReq());
  };
}
export function removeItem(itemId) {
  return {
    id: itemId,
    type: REMOVE_ITEM,
  };
}

export function updateItem(itemId, text) {
  return {
    id: itemId,
    title: text,
    type: UPDATE_ITEM,
  };
}

export function fetchList() {
  return (dispatch) => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadList(data));
      });
  };
}

export function addFetchItem(item, itemId) {
  return (dispatch) => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        data.id = itemId;
        dispatch(addedData(data));
      });
  };
}

export function completeFetchItem(itemId) {
  return (dispatch) => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ id: itemId, completed: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(completeItem(itemId));
      });
  };
}

export function removeFetchItem(itemId) {
  return (dispatch) => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(removeItem(itemId));
      });
  };
}

export function updateFetchItem(itemId, text) {
  return (dispatch) => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: itemId,
        title: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateItem(itemId, text));
      });
  };
}
