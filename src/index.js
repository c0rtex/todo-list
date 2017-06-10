import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './index.css';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCoV3YtLEIzmjVI0wVH6yNzDFGrECL6ccQ",
    authDomain: "ncoa-brain-train.firebaseapp.com",
    databaseURL: "https://ncoa-brain-train.firebaseio.com",
    projectId: "ncoa-brain-train",
    storageBucket: "ncoa-brain-train.appspot.com",
    messagingSenderId: "185045133324"
};
firebase.initializeApp(config);

class TaskRow extends React.Component {
    render() {
        let date = new Date(this.props.task.timestamp);
        let timeAdded = `${date.toDateString()} ${date.toLocaleTimeString()}`;
        return (
            <tr>
                <td>{this.props.task.task}</td>
                <td><em>{timeAdded}</em></td>
                <td>
                    <a href={'delete/' + this.props.task.key} type="button" className="btn btn-danger btn-xs" aria-label="Remove Task">
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </td>
            </tr>
        );
    }
}

class TaskTable extends React.Component {
    render() {
        let rows = [];
        let task = {};
        for (let key in this.props.tasks) {
            task = this.props.tasks[key];
            task['key'] = key; // attach "key" to task object
            rows.push(<TaskRow task={task} key={key} />)
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Time Added</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.onTaskTextChange(e.target.value);
    }

    handleSubmit(e) {
        this.props.onAddTaskInput();
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <div className="col-md-9">
                    <div className="form-group">
                        <input type="text" className="form-control" id="new-task" 
                        placeholder="Enter a new task..." value={this.props.taskText} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-md-2 col-md-offset-1">
                    <div className="form-group">
                        <button type="submit" className="btn btn-default btn-success">Add Task</button>
                    </div>
                </div>
            </form>
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskText: '',
            tasks: []
        };
        this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
        this.handleAddTaskInput = this.handleAddTaskInput.bind(this);
        this.loadTasks = this.loadTasks.bind(this);
        this.loadTasks(); // pull tasks from Firebase
    }

    loadTasks() {
        let tasksRef = firebase.database().ref('tasks');
        tasksRef.on('value', (snapshot) => {
            this.setState({tasks: snapshot.val()});
        });
    }

    handleTaskTextChange(taskText) {
        this.setState({taskText});
    }

    handleAddTaskInput() {
        firebase.database().ref('tasks').push().set({
            task: this.state.taskText,
            timestamp: Date.now()
        });
        this.setState({taskText: ''});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-default">
                          <div className="panel-heading">Todo List</div>
                          <div className="panel-body">
                            <AddTaskForm
                                onAddTaskInput={this.handleAddTaskInput} 
                                onTaskTextChange={this.handleTaskTextChange}
                                taskText={this.state.taskText}
                            />
                          </div>
                          <TaskTable tasks={this.state.tasks} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);