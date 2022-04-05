// Importing the Components
import React, { Component } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoForm from "./TodoForm";
import { connect } from "react-redux";
import { updatereq } from "../actions/";

// Class Component-TODO
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
    };
  }
  // SetEdit the id and title in local state of todo
  setEdit = async (idVal, valueVal) => {
    this.props.dispatch(updatereq());
    await this.setState({
      id: idVal,
      title: valueVal,
    });
  };

  // update the and call the function which is pass by via props
  submitUpdate = (value) => {
    this.props.updateTodo(this.state.id, value);
    this.setEdit(null, "");
  };

  render() {
    const { todos, completeTodo, removeTodo } = this.props;

    if (this.state.id) {
      return <TodoForm editstate={this.state} onSubmit={this.submitUpdate} />;
    }

    return todos.map((todo, index) => (
      <div
        className={todo.isComplete ? "todo-row complete" : "todo-row"}
        key={todo.id}
      >
        <div key={todo.id}>{todo.title}</div>
        <div className="icons">
          <input
            type="checkbox"
            onChange={() => completeTodo(todo.id)}
            checked={todo.completed}
            className="input-check"
          />
          <RiCloseCircleLine
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => this.setEdit(todo.id, todo.title)}
            className="edit-icon"
          />
        </div>
      </div>
    ));
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    edit: state.edit,
  };
}

export default connect(mapStateToProps)(Todo);
