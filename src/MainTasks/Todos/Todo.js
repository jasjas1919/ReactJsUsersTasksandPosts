import React, { Component } from 'react';


class Todo extends Component {
    constructor(props){
        super(props);
        this.state={ userId:this.props.userId, title:this.props.title, completed:this.props.completed};
    }

    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps !== nextState) {
            return {userId: nextProps.userId, title: nextProps.title, completed: nextProps.completed}
        }
    }

    markAsCompleted =()=>{
        var y = this.props.id;
        var x = this.props.userId;
        this.props.isCompleted(x,y);
    };


    render() {
        return (
            <div id="Todo">
                <div>
                    <p><b>Title:</b> {this.state.title}</p>
                    <p><b>Completed:</b> { this.state.completed ?  "true" : "false" }</p>
                </div>
                <div>
                    { !this.state.completed ?  <input  type='button' className='btn-completed' value='Mark Completed' onClick={this.markAsCompleted.bind(this.props.id)}/> : null }
                </div>
            </div>
        );
    }
}

export default Todo;
