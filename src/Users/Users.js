import React, { Component } from 'react';
import './users.css';
import User from "./User";
import {connect} from 'react-redux';


class Users extends Component {
    constructor(props){
        super(props);
        this.state={users:[],activeUser:"" ,clickedUserId:"",todos:[],search:this.props.search};
    }

    componentDidMount(){
        this.props.dispatch({type:'GET-USERS'});
    }


    static getDerivedStateFromProps(nextProps,nextState){
        return{users:nextProps.data.users,activeUser:nextState.activeUser,todos:nextProps.data.todos}
    }


    updateUser =(newId,newName,newEmail,newStreet,newCity,newZipcode)=>{
        let newUsers = this.state.users;
        let thisUserId = newId;
        let NewUserName = newName;
        let NewUserEmail = newEmail;
        let NewUserStreet = newStreet;
        let NewUserCity = newCity;
        let NewUserZipcode = newZipcode;

        for (let i in newUsers) {
            if (newUsers[i].id === thisUserId) {
                newUsers[i].name = NewUserName;
                newUsers[i].email = NewUserEmail;
                newUsers[i].address.street = NewUserStreet;
                newUsers[i].address.city = NewUserCity;
                newUsers[i].address.zipcode = NewUserZipcode;
                break; //Stop this loop, we found it!
            }
        }

        this.setState({users:newUsers});


    };

    deleteUser=(id)=>{
        var Id = id;
        let usersArr= this.state.users;
        let found = usersArr.find(function(x) {
            return x.id === Id ;
        });
        let index2 = usersArr.indexOf(found);
        usersArr.splice(index2, 1);
        this.setState({users:usersArr});
        this.props.dispatch({type:'DELETE-USER' , usersArr});
    };

    userActive=(x)=>{
        let userSelected = x;
        this.setState({activeUser:userSelected});
    };




    render() {

        let filterdUsers = this.state.users.filter(
            (user)=>{
                let nameAndEmail = user.name.toLowerCase()+user.email.toLowerCase();
                return nameAndEmail.indexOf(this.props.search.toLowerCase()) !== -1;
            }
        );

        let todos = this.state.todos;

        let usersMap= filterdUsers.map((item,index)=>{
            let userItem = item;
            let thisIdArr = todos.filter(x=>x.userId === item.id);

            for(let i = 0; i< thisIdArr.length; i++){
                if(thisIdArr[i].completed === false){
                    userItem["completed"]=false;
                    break;
                }else{
                    userItem["completed"]=true;
                }
            }

            return<div className={`usrsMapping ${this.state.activeUser === item.id ? 'grey-bg' : ''}`}  key={index}>
                    <User
                        userId={item.id} name={item.name} email={item.email}
                        street={item.address.street} completed={item.completed}
                        city={item.address.city} zipcode={item.address.zipcode}
                        onUpdate={this.updateUser} onDelete={this.deleteUser} onActiveUser={this.userActive}
                    />
                </div>
        });

        return (
            <div id="Users">
                {usersMap}
            </div>
        );
    }


}


const mapStateToProps = (state)=> {
    return {
        data: state
    }
};


export default connect(mapStateToProps)(Users);