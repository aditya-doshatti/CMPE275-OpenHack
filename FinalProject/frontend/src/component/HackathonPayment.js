import React, { Component } from 'react';
import axios from 'axios';
import '../css/hackathonPayment.css'

var swal = require('sweetalert')

const url="http://localhost:8080"

class HackathonPayment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId:''
         }
    }

    componentWillMount(){
        console.log("localStorage",localStorage.getItem('user'))
        const email=JSON.parse(localStorage.getItem('user'));
        axios.get(url+`/user/profile/${email}`)
        .then((response) => {
                this.setState({
                    userId:response.data.id
                })
                console.log(response.data);
        });
    }

    markPaymentDone = e => {
        axios.post(url+`/user/${this.state.userId}/pay`)
        .then((response)=>{
            console.log(response.data)
            this.props.history.push('/payment')
        });
        swal("Payment Done","Make your teammates pay","success")
    }

    render() { 
        return ( 
        <div>
            <div id = "paymentDiv">
                <h1>
                    Hackathon Payment Form
                </h1>
                <br></br>
                <div class="card">                    
                    <div class="container">
                        <h4>Hackathon Details</h4>

                        <hr></hr>
                        <p>Hackathon Name:<span class="right-aligned">Spartan Dev</span></p>
                        <p>Start Date:<span class="right-aligned"> 06/10/2019</span></p>
                        <p>Number of Participants:<span class="right-aligned">4</span></p>

                        <hr></hr>
                        <h5><b>Your Total</b><span class="right-aligned">$30</span></h5>    

                        <hr></hr>     
                        <h4>Payment Method</h4>   
                        <br></br>              
                        <div id="paymentMethod">
                            <input type="radio" name="paytype" id="mastercard" />
                                <label for="mastercard"><img src={require("../images/mastercard.svg")} alt="Mastercard" class="payment-method-images" /></label>

                            <input type="radio" name="paytype" id="visa" />
                                <label for="happy"><img src={require("../images/visa3.jpg")} alt="Visa" class="payment-method-images" /></label>

                            <input type="radio" name="paytype" id="paypal" />
                                <label for="paypal"><img src={require("../images/paypal.png")} alt="PayPal" class="payment-method-images" /></label>
                                
                            <br></br>
                            <hr></hr>     
                            <button type="button" onClick={this.markPaymentDone} class="btn btn-dark">Make Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        );
    }
}
 
export default HackathonPayment;