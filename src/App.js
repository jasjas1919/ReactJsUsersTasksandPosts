import React, { Component } from 'react';
import './App.css';
import Users from "./Users/Users";
import MainTasks from "./MainTasks/mainTasks";
import {Switch,Route,Link,withRouter} from 'react-router-dom';
import DAL from "./DALUtils";
import {connect} from "react-redux";
import Add from "./Add/Add";


class App extends Component {

    constructor(props){
        super(props);
        this.state={users:[],todos:[],posts:[],activeUser:"",usersDone:false,todosDone:false,clickedUserId:"",search:""};
    }

    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps!==nextState){
            return{usersDone:nextProps.data.usersDone , todosDone:nextProps.data.todosDone,clickedUserId:nextProps.data.clickedUserId}
        }

    }

    updateSearch(e){
        this.setState({search:e.target.value.substr(0,20)});
    }

    render() {
        return (
            <div className="App">

                {this.state.usersDone && this.state.todosDone ?
                    <div className='UsersContainer'>
                        <div className='info'><p className='btn-showMissions notCompleted'></p><span>User have uncompleted Tasks</span><br/>
                            <p className='btn-showMissions completed'></p><span>User has completed his Tasks</span>
                        </div>
                        <div className='usersWrap'>
                            Search: <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                            <Link to={'/addUser'}><input type="button" value="Add User" className='btn-addUser'/></Link>
                            <Users search={this.state.search}/>
                        </div>
                    </div>
                    : "loading"
                }
                <Switch>
                    <Route path='/tasks/:ID' component={MainTasks}/>
                    <Route path='/tasks/:ID/addTodo'  component={MainTasks}/>
                    <Route path='`/tasks/:ID/addPost' component={MainTasks}/>
                    <Route path='/addUser' component={Add}/>
                </Switch>
            </div>
        );
    }


    componentDidMount(){
        DAL.getData('https://jsonplaceholder.typicode.com/todos').
        then(res => this.props.dispatch({type:'GET-ALL-TODOS' , todos:res.data ,todosDone:res.data , clickedUserId:this.state.clickedUserId,})).
        catch(err => console.log(err));

        DAL.getData('https://jsonplaceholder.typicode.com/users').
        then(res => this.props.dispatch({type:'GET-ALL-USERS' , users:res.data })).
        catch(err => console.log("errr",err));

        DAL.getData('https://jsonplaceholder.typicode.com/posts').
        then(res => this.props.dispatch({type:'GET-ALL-POSTS' , posts:res.data ,clickedUserId:this.state.clickedUserId})).
        catch(err => console.log(err));

    }




}



const mapStateToProps = (state)=> {
    return {
        data: state
    }
};


export default withRouter(connect(mapStateToProps)(App));
