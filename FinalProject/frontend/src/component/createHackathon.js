import React, { Component } from 'react';
import axios from 'axios';
import "../css/createHackathon.css"
import Navbar from './Navbas';
import swal from 'sweetalert';

const url="http://localhost:8080"
class CreateHackathon extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputHackathonName:'',
            inputStartTime:'',
            inputendTime:'',
            inputDescription:'',
            inputfee:0,
            inputJudgeOne:'',
            inputJudgeTwo:'',
            inputMaxSize:0,
            inputMinSize:0,
            inputSponsor:'',
            inputSponsorDiscount:0,
            adminId:0,
            organization:[],
            orgID:[],
            org_name:[],
            user:[],
            userID:[],
            judges:[],
            sponsors:[],
            user_name:[]
         }
         this.setField=this.setField.bind(this);
         this.submitForm=this.submitForm.bind(this);
         this.setSponser=this.setSponser.bind(this);
         this.setJudge=this.setJudge.bind(this);
    }

    componentWillMount(){
        console.log("localStorage",localStorage.getItem('user'))
        const email=JSON.parse(localStorage.getItem('user'));
        axios.get(url+`/user/profile/${email}`)
        .then((response) => {
                this.setState({
                    adminId:response.data.id,
                })
                console.log(response.data);
        })

        axios.get(url+`/organizations`)
        .then((response) => {
                this.setState({
                   organization:response.data,
                })
                console.log("Inside organization list")
                console.log(response.data);
        });

        axios.get(url+`/users`)
        .then((response) => {
                this.setState({
                   user:response.data,
                })
                console.log("Inside organization list")
                console.log(response.data);
        });
    }

    setField(e){
        let target=e.target
        let name=target.name;
        this.setState({
            [name]:target.value    
        });
        console.log(target.value)
        console.log("set field for hackathon event")
    }

    setSponser(e){
        console.log("value",e.target.value)
        console.log("name",e.target.name)
        var sponsors = this.state.sponsors.concat([{id:e.target.value}]);
        var joined = this.state.orgID.concat(e.target.value);
        var joined_name = this.state.org_name.concat(e.target.id);

        const uniqueTags = [];
        const uniqueTag_name = [];

        joined.map(img => {
            if (uniqueTags.indexOf(img) === -1) {
                uniqueTags.push(img)
            }
        }); 

        joined_name.map(img => {
            if (uniqueTag_name.indexOf(img) === -1) {
                uniqueTag_name.push(img)
            }
        });

        this.setState({
            orgID:uniqueTags,
            sponsors:sponsors
        })
    }
        
        setJudge(e){
            console.log("value",e.target.value)
            console.log("name",e.target.name)
            var judges = this.state.judges.concat([{id:e.target.value}]);
            console.log("tetst",judges)
            var joined = this.state.userID.concat(e.target.value);
            var joined_name = this.state.org_name.concat(e.target.id);
    
            const uniqueTags = [];
            const uniqueTag_name = [];
    
            joined.map(img => {
                if (uniqueTags.indexOf(img) === -1) {
                    uniqueTags.push(img)
                }
            }); 
    
            joined_name.map(img => {
                if (uniqueTag_name.indexOf(img) === -1) {
                    uniqueTag_name.push(img)
                }
            });


        console.log(joined)
        this.setState({
            userID:uniqueTags,
            user_name:uniqueTag_name,
            judges:judges
        })
      
    }

    submitForm(e){
        e.preventDefault();
        const id=this.state.id
        if(this.state.name==""||this.state.description==""||this.state.startDate==""||this.state.endDate==""||this.state.regFees==""||this.state.minTeamSize==""||this.state.maxTeamSize==""||this.state.judges==""){
            swal("Fill all the required fields","Fill again","error")
        }else if(this.state.startDate>this.state.endDate){
            swal("Start Date can't be later than end date","Input again","error")
        }else if(this.state.minTeamSize==0||this.state.maxTeamSize==0){
            swal("Team Size must be atleast 1","Input again","error")
        }else{
        const data=({
            name: this.state.inputHackathonName,
            description: this.state.inputDescription,
            startDate: this.state.inputStartTime,
            endDate: this.state.inputendTime,
            regFees: this.state.inputfee,
            isOpen:true,
            minTeamSize:this.state.inputMaxSize,
            maxTeamSize: this.state.inputMinSize,
            discount:this.state.inputSponsorDiscount,
            sponsors:this.state.sponsors,
            judges: this.state.judges,
            adminId:this.state.adminId
        })
        
        axios.post(url+'/hackathon',data)
        .then((response) => {
                console.log(response.data);
                swal("Hackathon created!","View ","success")
        });
        }
    }

    render() { 
        var organizationList
        console.log("here in render")
        console.log(this.state.organization)
        if(this.state.organization!=null){
        organizationList=this.state.organization.map((org) => {
            return(
                <option value={org.id} name={org.name}>{org.name}</option>
            )
        })
    }

    var userList
    console.log("here in render for user list")
    console.log(this.state.user)
    if(this.state.user!=null){
    userList=this.state.user.map((u) => {
        return(
            <option value={u.id}>{u.name} : ({u.email})</option>
        )
    })
}

        

        return ( 
        <div>
            <Navbar />
        <div className="container bg-light mb-4">
                    <br></br>
                    <h2 className="text-primary text-center ">
                        Create Hackathon:<hr></hr>
                    </h2>         
        
            <br></br>
            <form onSubmit={this.submitForm}>
            <p className="text-danger">* Corresponds to required fields.</p>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="hackathonNameLabel">
                    <label for="inputHackathonName" className="font-weight-bold">Hackathon Name:<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="text" class="form-control hackInputs w-50" name="inputHackathonName" id="inputHackathonName" placeholder="Event Name"
                    onChange={this.setField} ></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="startTimeLabel">
                    <label for="inputStartTime" className="font-weight-bold">Start Date:<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="date" class="form-control hackInputs w-50" id="inputStartTime" name="inputStartTime" placeholder="Time" onChange={this.setField}></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels w-50" id="endTimeLabel">
                    <label for="inputendTime"className="font-weight-bold">End Date:<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="date" class="form-control hackInputs w-50" id="inputendTime" name="inputendTime" placeholder="Time" onChange={this.setField}></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="descriptionLabel">
                    <label for="inputDescription" className="font-weight-bold">Description<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <textarea class="form-control" id="inputDescription" name="inputDescription" rows="3"  onChange={this.setField}></textarea>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="feeLabel">
                    <label for="inputfee" className="font-weight-bold">Participation Fee(USD)<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="number" class="form-control hack-inputs" id="inputfee" name="inputfee" placeholder="Participation Fee"  onChange={this.setField}></input>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="judgeOneLabel">
                    <label for="inputJudgeOne" className="font-weight-bold">Judges:<span className="text-danger">*<h6>Specify atleast one</h6></span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <select id="inputSponsor" name="inputSponsor" className="w-50 btn-md"  onChange={this.setJudge}>
                    {/* <option default>--default--</option> */}
                       {userList}
                    </select>
                    <h6 className="ml-4 mr-2 text-primary">{this.state.userID}</h6>
                    </div>
                </div>
    
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels w-25" id="maxSizeLabel">
                    <label for="inputMaxSize" className="font-weight-bold">Maximum team size<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="number" class="form-control hack-inputs w-25" id="inputMaxSize" name="inputMaxSize" placeholder="Maximum"  onChange={this.setField}></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="minSizeLabel">
                    <label for="inputMinSize" className="font-weight-bold">Minimum team size<span className="text-danger">*</span></label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="number" class="form-control hack-inputs w-25" id="inputMinSize" name="inputMinSize" placeholder="Minimum" onChange={this.setField}></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="sponsorLabel">
                    <label for="inputSponsor" className="font-weight-bold">Sponsor Organization</label>                
                    </div>
                    <div class="form-group col-md-8">
                    <select id="inputSponsor" name="inputSponsor" className="w-50 btn-md"  onChange={this.setSponser}>
                        <option default>--default--</option>
                       {organizationList}
                    </select>
                    <h6 className="ml-4 mr-2 text-primary">{this.state.orgID}</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4 input-labels" id="sponsorDiscountLabel">
                    <label for="inputSponsorDiscount" className="font-weight-bold">Sponsor Discount(In percent)</label>                
                    </div>
                    <div class="form-group col-md-8">
                    <input type="text" class="form-control hack-inputs w-25" id="inputSponsorDiscount" name="inputSponsorDiscount" placeholder="Discount"  onChange={this.setField}></input>
                    </div>
                </div>
                <div className="text-center">
                 <button className="btn btn-primary btn-lg mt-3 mb-3">Create Hackathon</button>
                </div>
            </form>

            <ul>
 <li onclick="this.parentNode.removeChild(this);">
  <input type="hidden" name="ingredients[]" value="Cheese" />
  Cheese
 </li>
 <li onclick="this.parentNode.removeChild(this);">
  <input type="hidden" name="ingredients[]" value="Ham" />
  Ham
 </li>
 <li onclick="this.parentNode.removeChild(this);">
  <input type="hidden" name="ingredients[]" value="Mushrooms" />
  Mushrooms
 </li>
</ul>
<select onchange="selectIngredient(this);">
 <option value="Cheese">Cheese</option>
 <option value="Olives">Olives</option>
 <option value="Pepperoni">Pepperoni</option>
 ...
</select>

            
            
        </div> 
        </div>
        );
    }
}
 
export default CreateHackathon;