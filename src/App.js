import React from 'react';
import {Login} from './components/Login';
import {Shop} from './containers/Shop';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class App extends React.Component{
  constructor(){
super();
this.state = {islogin:false, userid: ''};
  }
  isAuth(loginState, uid=''){
    this.setState({islogin:loginState, userid: uid});
    console.log(this.state);
  }
 render() {
    return (
      
      <div className="container">
     { this.state.islogin?<Shop userid={this.state.userid} />:<Login updateLoginStatus={this.isAuth.bind(this)}/>}
  
      </div>  
    );
  }
}

