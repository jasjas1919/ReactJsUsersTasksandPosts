import React, { Component } from 'react';
import "./MainTasks.css"
import Todos from "./Todos/Todos";
import Posts from "./Posts/Posts";
import Add from "../Add/Add";
import {Link} from 'react-router-dom';

class MainTasks extends Component {
    constructor(props){
        super(props);
        this.state={clickedUserId:'',history:'',addClicked:"",urlID:""}
    }

    static getDerivedStateFromProps(nextProps,nextState){
        return{clickedUserId:nextProps.match.params.ID ,history:nextProps.history , addClicked:nextProps.history.location.pathname, urlID:nextProps.match.params.ID}
    }

    componentDidMount(){}


    render() {
        return (
            <div id="MainTasks" className="MainTasksClass">
                <Link to={`/`} className='goBack' />
                {this.state.addClicked === `/tasks/${this.state.urlID}/addTodo` ? <Add/> : <Todos clickedUserId={this.state.clickedUserId} history={this.props.history}/>}
                {this.state.addClicked === `/tasks/${this.state.urlID}/addPost` ? <Add/> : <Posts clickedUserId={this.state.clickedUserId} history={this.props.history}/>}

            </div>
        );
    }
}

export default MainTasks;
