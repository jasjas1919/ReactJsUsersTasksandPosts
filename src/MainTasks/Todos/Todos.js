import React, { Component } from 'react';
import './todos.css';
import {connect} from 'react-redux';
import Todo from "./Todo";


class Todos extends Component {
    constructor(props){
        super(props);
        this.state={todos:[],clickedUserId:"",history:this.props.history};
    }

    static getDerivedStateFromProps(nextProps,nextState){

        if(nextProps!=nextState ){
            return{clickedUserId: nextProps.clickedUserId , todos:nextProps.data.todos}
        }else{
            return{clickedUserId: nextState.clickedUserId , todos:nextState.todos}
        }
    }

    componentDidMount(){
        this.props.dispatch({type:'GET-TODOS'})
    }

    completeTask=(x,y)=>{
        var newTodos = this.state.todos;
        var todoUserId = x;
        var todoId = y;

        for (var i in newTodos) {
            if (newTodos[i].userId == todoUserId && newTodos[i].id === todoId ) {
                newTodos[i].completed = true;
                break;
            }
        }
        this.props.dispatch({type:'GET-TODOS',todos:newTodos,todoId:todoUserId});
    };

    pushToURL=()=>{
        this.props.history.push(`/tasks/${this.state.clickedUserId}/addTodo`);
    };

    render() {

        var clicked = this.state.clickedUserId;
        var todosMap= this.state.todos.filter(x=>x.userId ==clicked).map((item,index)=>{
            return<div className='todoMapping' key={index}>
                <div>
                    <Todo userId={item.userId} id={item.id} title={item.title} completed={item.completed} isCompleted={this.completeTask} />
                </div>
            </div>
        });

        return (
            <div id="Todos">
                <div className='headlineDiv'>
                    <p>Todos - User {clicked}</p>
                    <input type='button' value='Add' className='add-btn' onClick={this.pushToURL}/>
                </div>
                {todosMap}
            </div>
        );
    }


}

const mapStateToProps = (state)=> {
    return {
        data: state
    }
};


export default connect(mapStateToProps)(Todos);