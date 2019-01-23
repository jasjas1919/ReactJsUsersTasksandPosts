import React, { Component } from 'react';
import './posts.css';
import {connect} from 'react-redux';
import Post from "./Post";


class Posts extends Component {
    constructor(props){
        super(props);
        this.state={posts:[],clickedUserId:"",history:this.props.history};
    }

    static getDerivedStateFromProps(nextProps,nextState){
        if(nextProps!=nextState){
            return{clickedUserId: nextProps.clickedUserId ,posts:nextProps.data.posts,urlPath:nextProps.history.location.pathname}
        }else{ return{clickedUserId: nextState.clickedUserId ,posts:nextState.posts,urlPath:nextState.history.location.pathname}}

    }

    componentDidMount(){}

    pushToURL=()=>{
        this.props.history.push(`/tasks/${this.state.clickedUserId}/addPost`);
    };

    render() {
        var clicked = this.state.clickedUserId;
        var postsMap= this.state.posts.filter(x=>x.userId ==clicked).map((item,index)=>{
            return<div className='postMapping' key={index}>
                <div>
                    <Post title={item.title} body={item.body}/>
                </div>
            </div>
        });

        return (
            <div id="Posts">
                <div className='headlineDiv'>
                    <p>Posts - User {clicked}</p>
                    <input type='button' value='Add' className="add-btn" onClick={this.pushToURL}/>
                </div>
                {postsMap}
            </div>
        );
    }


}


const mapStateToProps = (state)=> {
    return {
        data: state
    }
};


export default connect(mapStateToProps)(Posts);