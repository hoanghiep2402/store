import axios from  'axios';

const  instance=axios.create({
    baseURL:'https://react-burger-760f2.firebaseio.com/',
    timeout: 2000,

});

export default instance;