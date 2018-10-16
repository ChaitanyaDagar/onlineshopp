import React from 'react';
import * as firebase from 'firebase';
export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {msg:""};

    }
    doLogin(){
        var userid = this.refs.uid.value;
        var pwd = this.refs.pwd.value;
        var user = firebase.database().ref("users/"+userid);
        user.on('value',(snapshot)=>{
            var userObject = snapshot.val();
            if(userObject.pwd==pwd){
                this.setState({msg:'welcome'+userid});
                this.props.updateLoginStatus(true,userid);
            }
            else {
                this.setState({
                    msg:'invalid userid or password'
                })
                this.props.updateLoginStatus(false);
            }
        }
        )
       /* if(userid==pwd){
            this.setState({msg:"welcome"+userid});
            console.log(this.state);
        this.props.updateLoginStatus(true, userid);
        console.log(this.state);
        }else{
            this.setState({msg:"invalid userid or password"});
            this.props.updateLoginStatus(false);
        }*/

        
    }

    doClear(){
        this.refs.uid.value = "";
        this.refs.pwd.value = "";
        this.setState({msg:""});
    }

    add(){
        var userid = this.refs.uid.value;
        var pwd = this.refs.pwd.value;
        var userObject = {"userid":userid,"pwd":pwd}
        var promise = firebase.database().ref("users/"+userid).set(userObject);
        promise.then(data=>{
            this.setState({msg:"user added "})

        }).catch(err=>{
            this.setState({msg:"error in user id"})
        })

    }

    
    render(){
        return (
            <div>
                <h2 className="alert-info">Login Page</h2>
                <h3 className="alert-success">{this.state.msg}</h3>
                <div className="form-group">
                <label htmlFor="">User Id</label>
                <input type="text" className="form-control" placeholder="Enter your Username" ref="uid" />
                </div>
                <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" className="form-control" placeholder="Enter the password" ref="pwd" />
                </div>
                <div className="form-group">
                <button onClick={this.doLogin.bind(this)} className="btn btn-primary" >Login</button>
                &nbsp;
                <button className="btn btn-success" onClick={this.add.bind(this)}>Add</button>
                <button onClick={this.doClear.bind(this)} className="btn btn-danger">Clear</button>
                </div>
                

            </div>
        )

    }
}   