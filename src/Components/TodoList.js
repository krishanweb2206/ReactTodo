import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { connect } from "react-redux";
import {
  addFetchItem,
  completeFetchItem,
  removeFetchItem,
  updateFetchItem,
} from "../actions/";
import ReactPaginate from "react-paginate";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      editUser: false,
    };
  }

  addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    this.props.dispatch(addFetchItem(todo, todo.id));
  };

  updateTodo = async (id, value) => {
    if (!value.title || /^\s*$/.test(value.title)) {
      return;
    }
    this.props.dispatch(updateFetchItem(id, value.title));
    await this.setState({ editUser: true });
  };

  removeTodo = (id) => {
    this.props.dispatch(removeFetchItem(id));
  };

  completeTodo = (id) => {
    this.props.dispatch(completeFetchItem(id));
  };

  setCurrentPage = async ({ selected }) => {
    await this.setState({
      currentPage: selected,
    });
  };

  render() {
    const todoPerPage = 6;
    const pagesVisited = this.state.currentPage * todoPerPage;
    const currentPosts = this.props.list.slice(
      pagesVisited,
      pagesVisited + todoPerPage
    );

    const pageCount = Math.ceil(this.props.list.length / todoPerPage);

    return (
      <div>
        <h1>What's plan for today?</h1>
        <TodoForm onSubmit={this.addTodo} />
        <Todo
          todos={currentPosts}
          completeTodo={this.completeTodo}
          removeTodo={this.removeTodo}
          updateTodo={this.updateTodo}
        />
        {this.props.edit === false ? (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={this.setCurrentPage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    edit: state.edit,
  };
}

export default connect(mapStateToProps)(TodoList);
