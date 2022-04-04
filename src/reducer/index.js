import {
  LOAD_LIST,
  ADD_ITEM,
  COMPLETE_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  UPDATE_REQ,
} from "../actions";

const initialState = {
  list: [],
  edit: false,
};

export default function ToDoLists(state = initialState, action) {
  switch (action.type) {
    case LOAD_LIST:
      return {
        list: [...action.list],
        edit: false,
      };
    case ADD_ITEM:
      return {
        list: [action.data, ...state.list],
        edit: false,
      };
    case COMPLETE_ITEM:
      let updatedTodos = state.list.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        list: updatedTodos,
        edit: false,
      };
    case REMOVE_ITEM:
      let removedItem = [...state.list].filter((todo) => todo.id !== action.id);
      return {
        list: removedItem,
        edit: false,
      };
    case UPDATE_ITEM:
      let updatedItem = state.list.map((todo) => {
        if (todo.id === action.id) {
          todo.title = action.title;
        }
        return todo;
      });
      return {
        list: updatedItem,
        edit: false,
      };
    case UPDATE_REQ:
      return {
        edit: action.edit,
        list: state.list,
      };
    default:
      return state;
  }
}
