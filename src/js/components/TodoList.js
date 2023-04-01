import React from 'react';
import Task from './Task';
import _ from '../../../node_modules/lodash';

export default class TodoList extends React.Component {

  constructor(props){
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggleDone = this.handleToggleDone.bind(this);
  }
  handleRemove(id){
    this.props.callBackRemoveTask(id);
  }
  handleToggleDone(taskData){
    //console.log('これは発火してるのかい？');
    
    this.props.callBackToggleDone(taskData);
  }

  render() {
    let tasks = [];
    for(let i in this.props.data){
      tasks.push(<Task key={this.props.data[i].id}
                       id={this.props.data[i].id}
                       text={this.props.data[i].text}
                       isDone={this.props.data[i].isDone}
                       onRemove={this.handleRemove}
                       //宿題
                       onToggle={this.handleToggleDone} />
                );
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}