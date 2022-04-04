import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchList } from "./actions/";
import TodoList from "./Components/TodoList";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchList());
  }
  render() {
    return (
      <div className="todo-app">
        {this.props.list.length === 0 ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border text-warning"
              style={{ height: "5em", width: "5em" }}
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <TodoList />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}

export default connect(mapStateToProps)(App);
