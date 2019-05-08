import React, { Component } from 'react';
import '../css/teamRegistration.css'

class TeamRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div id="registrationDiv">
                    <h1>
                        Team Registration Form
                    </h1>
                    <br></br>
                    <div className="card">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-3 input-labels" id="hackathonNameLabel">
                                <label for="FormControlSelectHackathon">Hackathon Name</label>                
                                </div>
                                <div class="form-group col-md-9">
                                    <select class="form-control" id="FormControlSelectHackathon" className="form-group col-md-3 forminputs">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        );
    }
}
 
export default TeamRegistration;