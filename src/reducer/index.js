// Necessary Actions
import {
  LOAD_LIST,
  ADD_ITEM,
  COMPLETE_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  UPDATE_REQ,
} from "../actions";

// Initial State of App
const initialState = {
  list: [],
  edit: false,
};

// Update the store on each dispatching the action or state get changes
export default function ToDoLists(state = initialState, action) {
  switch (action.type) {
    // On load
    case LOAD_LIST:
      return {
        list: [...action.list],
        edit: false,
      };
    // Adding the todo
    case ADD_ITEM:
      return {
        list: [action.data, ...state.list],
        edit: false,
      };
    // On completing the task
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
    // On Removing the task
    case REMOVE_ITEM:
      let removedItem = [...state.list].filter((todo) => todo.id !== action.id);
      return {
        list: removedItem,
        edit: false,
      };
    // Updating the Task
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
    // Request for update
    case UPDATE_REQ:
      return {
        edit: action.edit,
        list: state.list,
      };
    // Default state
    default:
      return state;
  }
}
