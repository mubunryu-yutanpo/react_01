import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import TodoCreator from './components/TodoCreater';
import Search from './components/Search';

class TodoApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample1',
          //宿題
          isDone: false
        },
        {
          id: this.createHashId(),
          text: 'sample2',
          isDone: false
        },
        {
          id: this.createHashId(),
          text: 'sample3',
          isDone: false
        }
      ],
      searchText: ''
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
    //宿題
    this.callBackToggleDone = this.callBackToggleDone.bind(this);
  }

  createHashId(){
    return Math.random().toString(36).slice(-16);
  }

  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }

  callBackRemoveTask(id){
    let data = _.reject(this.state.data, { 'id': id });
    this.setState({
      data: data
    });
  }

  callBackAddTask(val){
    let nextData = this.state.data;
    nextData.push({ id: this.createHashId(), text: val, isDone:false});
    this.setState({
      data: nextData
    });
  }

  filterCollection(elm){
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  //宿題
  callBackToggleDone(taskData) {
    //console.log('taskData');
    //console.log(taskData);

    //子コンポーネントから送られてきたIDを探すためにforで回す
    for(let i in this.state.data){
   
      //idが一致する場合
     if(this.state.data[i].id === taskData.id){
   
      console.log('チェックされたタスクのデータ');
      console.log(this.state.data[i]);
      this.setState({
        // データを書き換えてもreactの仕様上、反映されないパターンにハマる
        // なのでstateのデータを新しく作り直すという方法にしている
        data: this.state.data.map(
        obj => obj.id === this.state.data[i].id?
          Object.assign(obj, { isDone: !this.state.data[i].isDone })
          : obj )
        });
     }

    }
  }


  render() {
    console.log('appのrender');
    console.log(this.state.data);
    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    // ただし、検索して戻すとdone状態が外れてしまう

    return (
      <div>

        <TodoCreator callBackAddTask={this.callBackAddTask}/>

        <Search callBackSearch={this.callBackSearch} />

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask}
                  callBackToggleDone={this.callBackToggleDone} />

      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);