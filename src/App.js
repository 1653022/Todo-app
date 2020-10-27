import React, {Component} from 'react';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
import './App.css';
import {findIndex} from 'lodash'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditting: null,
      filter:{
        name:'',
        status:-1
      },
      keyword: '',
      sortBy:'name',
      sortValue: 1
    }
    
  }
  UNSAFE_componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  // onGenerate = () =>{
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: 'Học lập trình',
  //       status: true
  //     },
  //     {
  //       id: this.generateID(),
  //       name: 'Đi bơi',
  //       status: false
  //     },
  //     {
  //       id: this.generateID(),
  //       name: 'Đi học',
  //       status: true
  //     }
  //   ];
  //   this.setState({
  //     tasks:tasks
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));

  // }
 

  s4(){
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID(){
    return this.s4() +  '-' + this.s4();
  }

  onToggleForm=()=>{
    if(this.state.isDisplayForm && this.state.taskEditting !== null){
      console.log('aa');
      this.setState({
        isDisplayForm:true,
        taskEditting: null
      })
    }else{
      this.setState({
        isDisplayForm:!this.state.isDisplayForm,
        taskEditting: null
      })
    }
    
  }

  onCloseForm=()=>{
    this.setState({
      isDisplayForm: false
    })
  }

  onShowForm=()=>{
    this.setState({
      isDisplayForm: true
    })
  }

  closeForm =()=>{
    this.setState({
      isDisplayForm: false
    })
  }

  onSubmit=(data)=>{
    console.log(data);
    var {tasks} = this.state;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data
    }
    
    this.setState({
      tasks: tasks,
      taskEditting: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus=(id)=>{
    console.log(id);
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
   
  }

  onDeleteItem=(id)=>{
    var {tasks} = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks, (task) =>{
      return task.id === id;
    })
    if(index !== -1){
      tasks.splice(index,1);
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onUpdate=(id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditting = tasks[index]
    this.setState({
      taskEditting: taskEditting
    })
    console.log(taskEditting);
    this.onShowForm();
  }

  findIndex = (id) => {
    var {tasks} = this.state;
    var result = -1
    tasks.forEach((task, index) =>{
      if(task.id === id){
        result = index;
      }
    })

    return result;
  }

  onFilter = (filterName, filterStatus) =>{
    console.log(filterName, filterStatus);
    filterStatus = parseInt(filterStatus)
    this.setState({
      filter:{
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSearch = (keyword) =>{
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) =>{
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }

  render(){
    var {
          tasks, 
          isDisplayForm, 
          taskEditting, 
          filter, 
          keyword,
          sortBy,
          sortValue
        } = this.state;
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) =>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter((task) =>{
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }
    if(keyword){
      tasks = tasks.filter((task) =>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }
    if(sortBy === 'name'){
      tasks.sort((a, b) =>{
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      })
    }else{
      tasks.sort((a, b) =>{
        if(a.status > b.status) return sortValue;
        else if(a.status < b.status) return -sortValue;
        else return 0;
      })
    }
    var elmTaskForm = isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm}
                                                closeForm = {this.closeForm}
                                                onSubmit = {this.onSubmit}
                                                task = {taskEditting}
                                      /> : '';
                                               
                                                

    return(
      <div>
        <h1 className="text-center">Quản lý công việc</h1><hr/>
        <div className = "container">
          
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {/* form */}
              {elmTaskForm}
            </div>

            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              
              <button type="button" 
                      className="btn btn-primary"
                      onClick={this.onToggleForm}
              >
                <span className="fa fa-plus mr-5"></span>Thêm Công Việc
              </button>&nbsp;
              {/* <button type="button" 
                      className="btn btn-success" 
                      onClick = {this.onGenerate}
              >
                Generate
              </button> */}

              {/* Search - Sort  */}

              <Control onSearch = {this.onSearch}
                        onSort = {this.onSort}
                        sortBy = {sortBy}
                        sortValue = {sortValue}
              
              />

              <div className="row mt-15">
                
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  
                  <TaskList tasks={tasks}
                            onUpdateStatus = {this.onUpdateStatus}
                            onDeleteItem = {this.onDeleteItem}
                            onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                  />
                  
                </div>
                
              </div>

            </div>
            
          </div>
          
        </div>
        
      </div>
    )
  }
}

export default App;
