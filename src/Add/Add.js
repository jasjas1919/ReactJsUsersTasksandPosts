import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';
import "./Add.css"

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {title:"",body:"",newUname:"",newUemail:""}
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        return {urlID:nextProps.match.params.ID,urlPath:nextProps.location.pathname,todos:nextProps.data.todos,posts:nextProps.data.posts,users:nextProps.data.users}
    }

    componentDidMount(){}


    saveTitle=(e)=>{
        var title = e.target.value;
        this.setState({title:title});
    };

    saveBody=(e)=>{
        var body = e.target.value;
        this.setState({body:body});
    };

    saveNewUser=(e)=>{
        var inputName = e.target.name;
        var val = e.target.value;

        switch (inputName){
            case 'name':
                this.setState({newUname:val});
                break;
            case 'email':
                this.setState({newUemail:val});
                break;
            default:
                console.log("not matched");
        }
    };

    addFor=()=>{
        if(this.state.urlPath === `/tasks/${this.state.urlID}/addTodo`){
            this.addTodo();
        }else if(this.state.urlPath === `/tasks/${this.state.urlID}/addPost`){
            this.addPost();
        }else{
            this.addUser();
        }
    };

    addTodo=()=>{
        var todos = this.state.todos;
        var last = todos.slice(-1).pop().id+1;
        var title = this.state.title;
        var urlID =parseInt(this.state.urlID);
        if(title.length > 0){
            todos.push({userId:urlID,id:last,title:title,completed:false});
            this.props.dispatch({type:'ADD-TODO' , todos});
        }
    };

    addPost=()=>{
        var posts = this.state.posts;
        var last = posts.slice(-1).pop().id+1;
        var title = this.state.title;
        var body = this.state.body;
        var urlID =parseInt(this.state.urlID);
        if(title.length > 0 && body.length > 0 ){
            posts.push({userId:urlID,id:last,title:title,body:body});
            this.props.dispatch({type:'ADD-POST', posts});
        }
    };

    addUser=()=>{
        var users = this.state.users;
        var x = this.state.newUname;
        var y = this.state.newUemail;

        if(x.length > 0 && y.length > 0 ){
            users.push({id:11,name:x,email:y,completed:true,address:{city:"",street:"",zipcode:""}});
            this.props.dispatch({type:'ADD-USER', users});
        }
    };

    render() {
        var a = this.state.urlPath;
        var b = `/tasks/${this.state.urlID}`;
        var x = `/tasks/${this.state.urlID}/addPost`;
        var y = `/tasks/${this.state.urlID}/addTodo`;
        var u = '/addUser';


        return (
            <div className="addContainer">
                <div className='newInfo'>New { a === x && "Post"}{ a === y && "Todo"}{ a === u && "User"} - User : {this.state.urlID}<br/></div>
                <div className="addDiv">
                    <div>
                        {a === x || a=== y ?
                        <div>
                            <p>title:</p><input type="text" onChange={this.saveTitle}/>
                            { a === x &&
                            <div><p>body:</p><input type="text" onChange={this.saveBody}/></div>
                            }
                        </div>
                        :""}
                        {a === u &&
                        <div>
                            <p>Name:</p><input type="text" name='name' onChange={this.saveNewUser}/><br/>
                            <p>Email:</p><input type="text" name='email' onChange={this.saveNewUser}/><br/>
                        </div>
                        }
                    </div>
                    <div className="btns">
                        <Link to={a === u ? '/' : b}><input type="button" value="Cancel"/></Link>
                        <Link to={a === u ? '/' : b}><input type="button" value="Add" onClick={this.addFor}/></Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        data: state
    }
};


export default withRouter(connect(mapStateToProps)(Add));
