

const mainReducer = (
    state = {users:[], todos:[],posts:[],clickedUserId:"",usersDone:false,todosDone:false},  actionData) =>
{
    switch (actionData.type)
    {
        /***TODOS***/
        case 'GET-ALL-TODOS':{
            return Object.assign({},state,
                ...state.todos,
                {todos:actionData.todos,todosDone:true}
            );
        }

        case 'GET-TODOS':{
            return Object.assign({},state,
                ...state.todos,
                {todos:state.todos ,todosDone:true}
            );
        }


        case 'ADD-TODO': {
            return Object.assign({},state,
                ...state.todos,
                {todos:state.todos}
            );
        }

        /***USERS***/
        case 'GET-ALL-USERS':{
            return Object.assign({},state,
                ...state.users,
                {users:actionData.users ,usersDone:true,todos:state.todos}
            );
        }

        case 'GET-USERS':{
            return Object.assign({},state,
                ...state.users,
                {users:state.users ,usersDone:true}
            );
        }

        case 'ADD-USER':
        {
            return Object.assign({},state,
                ...state.users,
                {users:actionData.users}
            );
        }
        case 'DELETE-USER':{
            return Object.assign({},state,
                ...state.users,
                {users:actionData.usersArr}
            );
        }

        /***POSTS***/
        case 'GET-ALL-POSTS':{
            return Object.assign({},state,
                ...state.posts,
                {posts:actionData.posts}
            );

        }
        case 'ADD-POST': {
            return Object.assign({},state,
                ...state.posts,
                {posts:state.posts}
            );
        }

        default:
            return state
    }
};

export default mainReducer;
