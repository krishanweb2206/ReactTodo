import React, { Component } from "react";
import { connect } from "react-redux";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      id: 200,
      title: this.props.editstate ? this.props.editstate.title : "",
      completed: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await this.setState({
      id: this.state.id + 1,
    });

    this.props.onSubmit({
      ...this.state,
    });

    if (!this.props.editstate) {
      this.setState({
        ...this.state,
        title: "",
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  componentWillUnmount() {
    if (this.props.editstate) {
      this.setState({
        ...this.state,
        title: "",
      });
    }
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        {this.props.editstate ? (
          <>
            <input
              type="text"
              placeholder="Add a todo"
              value={this.state.title}
              name="text"
              onChange={this.handleChange}
              className="todo-input"
              autoFocus={true}
            />
            <button className="todo-button">Update Todo</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Add a todo"
              value={this.state.title}
              name="text"
              onChange={this.handleChange}
              className="todo-input"
              autoFocus={true}
            />
            <button className="todo-button" disabled={this.props.edit}>
              Add Todo
            </button>
          </>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    edit: state.edit,
  };
}

export default connect(mapStateToProps)(TodoForm);
