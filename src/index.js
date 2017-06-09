import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const tasks = [
    { id: 1, task: 'Pick up books', timeAdded: 1497048366 },
    { id: 2, task: 'Go to church', timeAdded: 1497048366 },
    { id: 3, task: 'Go to the gym', timeAdded: 1497048366 },
];

class TaskRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.task.id}</td>
                <td>{this.props.task.task}</td>
                <td><em>{this.props.task.timeAdded}</em></td>
                <td>
                    <a href={'delete/' + this.props.task.id} type="button" className="btn btn-danger btn-xs" aria-label="Remove Task">
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
        this.props.tasks.forEach(function(task) {
            rows.push(<TaskRow task={task} key={task.id} />)
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task</th>
                        <th>Time added</th>
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
    render() {
        return (
            <form action="#" className="form-horizontal">
                <div className="col-md-9">
                    <div className="form-group">
                        <input type="text" className="form-control" id="new-task" placeholder="Enter a new task..." />
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
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-default">
                          <div className="panel-heading">Todo List</div>
                          <div className="panel-body">
                            <AddTaskForm />
                          </div>
                          <TaskTable tasks={this.props.tasks} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <TodoList tasks={tasks} />,
    document.getElementById('root')
);