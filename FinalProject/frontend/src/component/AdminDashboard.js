import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal'
import AdminNavbar from './AdminNavbar';
import {NavLink} from 'react-router-dom';
import {Redirect} from 'react-router';

import "../css/hackathonTable.css"

const url="http://localhost:8080"


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            listed:[],
            adminId:0,
            error_status:" ",
            openCreate: false,
            openLeave: false,
            openJoin: false,
            openSponsor:true
        }
    }

    async componentDidMount() {
              const email=JSON.parse(localStorage.getItem('user'));
              await axios.get(url+`/user/profile/${email}`)
                .then((response) => {
                        this.setState({
                            adminId:response.data.id,
                        })
                        console.log(response.data);
                })

                var adminId=this.state.adminId;
             axios.get(url+`/hackathons/${adminId}`)
            .then((response, error) => {
                this.setState({
                    listed : this.state.listed.concat(response.data),
                    error_status:" "
                })
                console.log("listed"+this.state.listed)
            }).catch((error) => {
                console.log("Error",error)
                console.log("Error response",error.response.data)
                this.setState({error_status:error.response.data})
            });

    }

    onOpenJoinModal = (e) => {
        e.preventDefault();
        this.setState({ openJoin: true });
      };

      onOpenSponsorModal = (e) => {
        e.preventDefault();
        this.setState({ openSponsor: true });
      };

      onCloseSponsorModal = (e) => {
        e.preventDefault();
        this.setState({ openSponsor: false });
    };

      onCloseCreateModal = (e) => {
        e.preventDefault();
        this.setState({ openJoin: false });
    };


    render() {   
        let redirectVar = null;
        if(!localStorage.getItem("user")){
            redirectVar = <Redirect to= "/login"/>
        }
        var a,b
        let listdetails = this.state.listed.map((row) => {
           a=row.judges.map(detail=>{return(<h5 className="text-background">{detail.name} <span className="text-muted">  Screen Name:</span>{detail.screenName}</h5>)})
           b=row.sponsors.map(detail=>{return(<h5 className="text-background">{detail.name}</h5>)})


            return(                
                
                <tr>                    
                    <td className="text-primary">{row.name}</td>
                    <td className="text-primary">({row.startDate}) - ({row.endDate})</td>
                    <td className="text-primary">{row.regFees}/{row.discount}</td>
                    <td className="text-primary">{row.minTeamSize}/{row.maxTeamSize}</td> 
                    <td>
                        <button className="btn btn-info" onClick={this.onOpenJoinModal}>Judges</button>
                        <button className="btn btn-info ml-2"  onClick={this.onOpenSponsorModal}>Organizers</button>
                        <button className="btn btn-info ml-2">Teams</button>
                    </td> 
                    <td className="text-primary">
                        <button className="btn btn-secondary">Close</button>
                        <button className="btn btn-secondary ml-2">Finalize</button>
                    </td>              
                </tr>
            )
        })

        return ( 
        <div>
            {redirectVar}
            <AdminNavbar />
            <div>               
                <div class="card">
                
                    <table class="table mt-4 bg w-100 border rounded shadow-lg">
                        <thead>
                            <tr>
                                <th><em>Hackathon Name</em></th>
                                <th><em>Start Date /<br></br> End Date</em></th>
                                <th><em>Registration <br></br>Fees / Discount(%)</em></th>
                                <th><em>(Min/Max)<br></br>Team Member</em></th>
                                <th><em>View</em></th>
                                <th><em>Update</em></th>
                            </tr>  
                        </thead>
                        <tbody>
                            {listdetails}                        
                        </tbody>
                    </table>
                </div> 

                <Modal  className="w-100" open={this.state.openJoin} onClose={this.onCloseCreateModal} focusTrapped>
                <div className="w-100">
                <h4  className="text-info">View Judges:</h4><hr></hr>
                     {a}
                </div>
                </Modal>

                <Modal className="w-75" open={this.state.openSponsor} onClose={this.onCloseSponsorModal} focusTrapped>
                <div className="w-25" >
                <h4 className="text-info">View Organizations:</h4><hr></hr>
                     {b}
                </div>
                </Modal>

            </div>            
        </div> 
        );
    }
}
 
export default AdminDashboard;
