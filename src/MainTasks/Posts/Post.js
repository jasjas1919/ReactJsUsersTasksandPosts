import React, { Component } from 'react';


class Post extends Component {
    constructor(props){
        super(props);
        this.state={ title: this.props.title, body: this.props.body};
    }

    static getDerivedStateFromProps(nextProps,nextState){
            return{ title:nextProps.title, body:nextProps.body}
    }

    render() {
        return (
            <div id="Post">
                <p><b>Title:</b> {this.state.title}</p>
                <p><b>Body:</b> {this.state.body}</p>
            </div>
        );
    }
}

export default Post;
