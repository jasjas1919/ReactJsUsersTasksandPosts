import axios from 'axios';

var getData =(url)=>{
     return axios.get(url);
};


var addNewData = (url , obj) =>{
    axios.post(url,obj);

};
var updateData = (url,obj)=>{

};

var deleteData = (url)=>{

};

var DAL = {
    getData,
    addNewData,
    updateData,
    deleteData
};

export default DAL;
