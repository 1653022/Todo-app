import React, {Component} from 'react';


class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            status: false
        }
    }

    UNSAFE_componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        }else if (nextProps && nextProps.task === null){
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }

    }

    onCloseForm=()=>{
        this.props.onCloseForm();
    }
    clearForm=()=>{
        this.setState({
            name:'',
            status: false
        })
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        //this.clearForm();
        //this.onCloseForm();
    }
    
  render(){
    var {id} = this.state;
    return(
        <div className="panel panel-warning">
            <div className="panel-heading">
            <h3 className="panel-title">
                {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'} &nbsp;
                <span 
                className="fa fa-times-circle text-right"
                onClick = {this.onCloseForm}
                ></span>
            </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên: </label>
                    <input type="text" 
                            name="name"
                            className="form-control" 
                            value ={this.state.name}
                            onChange={this.onChange}
                        />

                    <label>Trạng Thái</label>
                    
                    <select name="status" 
                            className="form-control"
                            value = {this.state.status}
                            onChange = {this.onChange}
                    >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>

                    </select><br/>

                    <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        <span className="fa fa-plus mr-5"></span>Lưu Lại
                    </button>&nbsp;
                    
                    <button type="button" 
                            className="btn btn-success"
                            onClick = {this.clearForm}
                    >
                        <span className="fa fa-close mr-5"></span>Hủy Bỏ
                    </button>
                    

                    </div>
                    
                </div>
                </form>
            </div>
        </div>
    )
  }
}

export default TaskForm;
