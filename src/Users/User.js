import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class User extends Component {
    constructor(props){
        super(props);
        this.state={ activeUser:"",userId:this.props.userId, name: this.props.name, email: this.props.email, street:this.props.street, city:this.props.city, zipcode:this.props.zipcode,completed:this.props.completed,active:""};
    }

    static getDerivedStateFromProps(nextProps,nextState){

        if(nextState.userId !== nextProps.userId){
            return{activeUser:nextProps.activeUser,userId:nextProps.userId, name:nextProps.name, email:nextProps.email, street:nextProps.street, city:nextProps.city, zipcode:nextProps.zipcode, completed:nextProps.completed}
        }else{
            return{activeUser:nextState.activeUser,userId:nextState.userId, name:nextState.name, email:nextState.email, street:nextState.street, city:nextState.city, zipcode:nextState.zipcode,completed:nextState.completed}
        }
    }


    componentDidUpdate(prevState,prevProps){
        if(prevState===prevProps){
            return false;
        }
    }

    active=()=>{
        if( this.state.active.length <= 0){
            this.setState({active:"active"});
        }else{
            this.setState({active:""});
        }
    };

    showOtherDataOnHover=()=>{
        if(window.screen.width > 800){
            this.setState({active:"active"});
        }
    };

    updateUserDetails=(e)=>{
        let inputName = e.target.name;
        var el = e.target.value;
        switch (inputName){
            case 'name':
                this.setState({name:el});
                break;
            case 'email':
                this.setState({email:el});
                break;
            case 'street':
                this.setState({street:el});
                break;
            case 'city':
                this.setState({city:el});
                break;
            case 'zipcode':
                this.setState({zipcode:el});
                break;
            default:
                console.log("not matched");

        }
    };

    updateUserInArray=()=>{
        let thisUserId = this.props.userId;
        let NewUserName = this.state.name;
        let NewUserEmail = this.state.email;
        let NewUserStreet = this.state.street;
        let NewUserCity = this.state.city;
        let NewUserZipcode = this.state.zipcode;

        this.props.onUpdate(thisUserId,NewUserName,NewUserEmail,NewUserStreet,NewUserCity,NewUserZipcode)
    };

    deleteUserInArray=()=>{
        let thisUserId = this.props.userId;
        this.props.onDelete(thisUserId);
    };

    userColorActive=(x)=>{
        var activeId = this.props.userId;
        this.props.onActiveUser(activeId);


    };

    render() {

        return (
            <div id="User">
                <div className="headlineDiv">
                    <p className='p-id'>ID : <b>{this.state.userId}</b></p>
                    <Link to={`/tasks/${this.props.userId}`} className={`btn-showMissions ${this.props.completed ? "completed" : "notCompleted"}`} onClick={this.userColorActive.bind(this.props.userId)}/>
                </div>
                <p>Name :</p><input type='text' name="name" value={this.state.name} onChange={this.updateUserDetails}/><br/>
                <p>Email :</p><input type='text' name="email" value={this.state.email} onChange={this.updateUserDetails}/><br/>
                <input  type='button' className='user-btn btn-other' value='Other Data' onMouseEnter={this.showOtherDataOnHover} onClick={this.active}  />
                <div id='otherData' className={this.state.active}>
                    <p>Street :</p><input type='text' name="street" value={this.state.street} onChange={this.updateUserDetails}/><br/>
                    <p>City :</p><input type='text' name="city" value={this.state.city} onChange={this.updateUserDetails}/><br/>
                    <p>Zipcode :</p><input type='text' name="zipcode" value={this.state.zipcode} onChange={this.updateUserDetails}/><br/>
                </div>
                <input  type='button' className='user-btn btn-update' value='Update' onClick={this.updateUserInArray}/>
                <Link to={"/"}><input  type='button' className='user-btn btn-delete' value='Delete' onClick={this.deleteUserInArray}/></Link>
            </div>
        );
    }
}


export default User;
