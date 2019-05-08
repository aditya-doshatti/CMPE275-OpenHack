import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AdminNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleLogout = () => {
       localStorage.removeItem('user')
       this.props.history.push("/login")
    }

    render() { 
        return ( 
        <div>
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    <img src={require('../images/2.png')} class="d-inline-block align-top" alt=""></img>
                    
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="ml-5"></div>
                <div className="ml-5"></div>
                <div className="ml-5"></div>
                <div className="ml-5"></div>
                <div className="ml-5"></div>
                <div className="ml-5"></div>

                <div class="collapse navbar-collapse float-right ml-5" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/admin/maindashboard"><b>Home</b> <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/profile"><b>|   Profile</b></a>
                    </li>      
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/maindashboard"><b>|  Dashboard</b></a>
                    </li>
                    <li class="nav-item">
                        <button class="btn ml-5 p-2 border text-dark" href="#" onClick = {this.handleLogout}><b>LogOut</b></button>
                    </li>             
                    </ul>
                   
                </div>
                </nav>


        </div>


         );
    }
}
 
export default AdminNavbar;
