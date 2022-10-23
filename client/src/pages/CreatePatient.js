import React, {useState, useEffect} from 'react';
import axios from '../apis/axios';
import AppNavBar from './components/AppNavBar';
import PatientList from './PatientList';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/index.css";
import moment from 'moment';




const CreatePatient = () => {
  let {state} = useLocation();
  const navigate=useNavigate();
  let isEdit=false;
  
    if(state){
      isEdit=true
      console.log('EDITING', state)
    }
    else{
      state={}
      console.log("New Patient")
    }
  
    const [firstName, setFirstName]=useState(state.firstName);
    const [lastName, setLastName]=useState(state.lastName);
    const [patientTZ, setPatientTZ]=useState(state.patientTZ);
    const [street, setStreet]=useState(state.street);
    const [houseNumber, setHouseNumber]=useState(state.houseNumber);
    const [apartmentNumber, setApartmentNumber]=useState(state.apartmentNumber);
    const [city, setCity]=useState(state.city);
    const [zip, setZip]=useState(state.zip);
    const [DOB, setDOB]=useState(moment(new Date(state.DOB)).format("YYYY-MM-DD"));
    const [mobilePhone, setMobilePhone]=useState(state.mobilePhone);
    const [phone, setPhone]=useState(state.phone);
    const [gender, setGender]=useState(state.gender);
    const [patientList, setPatientList]=useState([]);

    const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i]);

    const getPatients=async()=>{
      const results=await axios.get('/patient');
      console.log(results.data.length, patientList.length)
   //  if(results.data.length!==patientList.length){
    if(equals(results.data, patientList)){
          setPatientList(results.data);
      }
            
  }

    useEffect(()=>{
    
     
     getPatients();

  },[patientList]);


    const submitForm=async(event)=>{
      console.log("FORM SUBMITED");
        event.preventDefault();
        console.log(lastName, firstName)
        var result;
        if(isEdit){
          result =await axios.patch('/patient', {id: state._id, firstName, lastName, patientTZ, street, houseNumber, apartmentNumber, city, zip, DOB, mobilePhone, phone, gender} )
        }
        else{
         result= await axios.post('/patient', {firstName, lastName, patientTZ, street, houseNumber, apartmentNumber, city, zip, DOB, mobilePhone, phone, gender} )
        }
       console.log(result);
       //getPatients();
       if(isEdit){

        alert(`Patient  ${firstName} ${lastName} was updated!`);
       }
       else{
        if(result.data['status']==='Success'){
          alert(`Patient  ${firstName} ${lastName} was added`);
        }
        
       }
       
       navigate("/patientlist");
    }

    const changeGender=(event)=>{
      setGender(event.target.value);
    }
   
  return (
<>
      <AppNavBar/>
         

        <form onSubmit={submitForm}>
           <div class="row">
     <div class="col-75">
      <div class="container1">
      {isEdit?<div><h3>Editing</h3></div>:<div><h3>New Patient</h3></div>}<br></br>
      <div class="row">
          <div class="col-50">
          <table className="table">
          <tbody>
              <tr>
          <td align='left'> <label htmlFor='firstName' class="form-label">First Name</label></td>
          <td>  <input  type='text' id='firstName' value={firstName} onChange={(val)=>setFirstName(val.target.value)}/><br/></td>
          </tr>
          <tr>
          <td> <label  htmlFor='lastName'>Last Name</label></td> 
          <td>  <input  type='text' id='lastName' value={lastName} onChange={(val)=>setLastName(val.target.value)}/><br/></td>
            </tr>
            <tr>
         <td>   <label htmlFor='patientTZ'>Patient TZ </label></td>
         <td>  <input type='text' pattern='[0-9]{9}' id='patientTZ' value={patientTZ} onChange={(val)=>setPatientTZ(val.target.value)} /><br/></td> 
            </tr>
            <tr>
         <td>   <label htmlFor='street'>Street</label></td>
         <td>     <input type='text' id='street' value={street} onChange={(val)=>setStreet(val.target.value)}  /><br/></td>
            </tr>
            <tr>
            <td><label htmlFor='houseNumber'>House Number</label></td>
            <td><input type='text' id='houseNumber' value={houseNumber} onChange={(val)=>setHouseNumber(val.target.value)} /><br/></td>
            </tr>
            <tr>
          <td> <label htmlFor='apartmentNumber'>apartment Number</label></td> 
          <td>  <input type='text' id='apartmentNumber' value={apartmentNumber} onChange={(val)=>setApartmentNumber(val.target.value)} /><br/></td> 
            </tr>
            <tr>
         <td>   <label htmlFor='city'>City</label></td>
         <td>   <input type='text' id='city' value={city} onChange={(val)=>setCity(val.target.value)} /><br/></td>
            </tr>
            <tr>
         <td>   <label htmlFor='zip'>Zip</label></td>
         <td>  <input type='text' id='zip' value={zip} onChange={(val)=>setZip(val.target.value)} /><br/></td>
            </tr>
            <tr>
           <td> <label htmlFor='DOB'>DOB</label></td>
           <td>   <input type='date' id='DOB' value={DOB} onChange={(val)=>setDOB(val.target.value)}/><br/></td>
            </tr>
            <tr>
          <td>  <label htmlFor='mobilePhone'>Mobile Phone</label></td>
          <td>  <input type='text' id='mobilePhone' value={mobilePhone} onChange={(val)=>setMobilePhone(val.target.value)}/><br/></td>
            </tr>
            <tr>
           <td><label htmlFor='phone'>Phone</label></td> 
           <td>   <input type='text' id='phone' value={phone} onChange={(val)=>setPhone(val.target.value)}/><br/></td> 
            </tr>
<tr>
  <td><label htmlFor='gender'>Gender</label></td>
  <td>
   <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" onChange={changeGender} checked={gender==='male'}/>
      <label class="form-check-label" for="inlineRadio1">Male</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" onChange={changeGender} checked={gender==='female'}/>
      <label class="form-check-label" for="inlineRadio2">Female</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="other" onChange={changeGender} checked={gender==='other'}/>
      <label class="form-check-label" for="inlineRadio3">Other</label>
    </div>
            <br></br>
            </td>
            </tr>
            <button class="btn btn-secondary btn-lg">Submit</button>
</tbody>
</table>
</div>
</div>
            </div>

     </div>
     </div>
        </form>
    
        </>
       
  )
}

export default CreatePatient