import React, {useState, useEffect} from 'react';
import axios from '../../apis/axios';
import { useParams } from 'react-router-dom';
import AppNavBar from './AppNavBar';
import AddEditVaccine from './AddEditVaccine';



const ViewPatient = () => {
    const [patientInfo, setPatientInfo]=useState({});
    const {id}=useParams();
    
    useEffect(()=>{
        const getPatient=async ()=>{
            const result=await axios.get(`/patient/${id}`);
            setPatientInfo(result.data[0]);
            console.log(result.data)
        }
        getPatient();
    },[]);
    const dateOfBirth=new Date(patientInfo.DOB);
            const formatedDateOfBirth = (dateOfBirth.getDate() ).toString().padStart(2, "0")+"-"+(dateOfBirth.getMonth() +1).toString().padStart(2, "0")+"-"+dateOfBirth.getFullYear();
            let formattedInfectionDate="";
            let formattedRecoveryDate="";
            if(patientInfo.infectionDate){
              const infectionDate=new Date(patientInfo.infectionDate);
               formattedInfectionDate = (infectionDate.getDate() ).toString().padStart(2, "0")+"-"+(infectionDate.getMonth() +1).toString().padStart(2, "0")+"-"+infectionDate.getFullYear();
            }
            if(patientInfo.recoveryDate){
              const recoveryDate=new Date(patientInfo.recoveryDate);
              formattedRecoveryDate = (recoveryDate.getDate() ).toString().padStart(2, "0")+"-"+(recoveryDate.getMonth() +1).toString().padStart(2, "0")+"-"+recoveryDate.getFullYear();
            }
          
  return (
    <div>
    <AppNavBar/>
    <div class="row">
     <div class="col-75">
      <div class="container2">
        <h3>Patient Deatails:</h3>
        <table>
          <tbody>
          <tr>
       <td> {"Name: " }</td>
       <td> {patientInfo.firstName + " " + patientInfo.lastName } <br/></td>
        </tr>
        <tr>
       <td> {"Address: "} </td>
       <td>{patientInfo.street + " " + patientInfo.apartmentNumber} <br/></td>
        </tr>
        <tr>
          <td>{"City: "}</td>
          <td>{patientInfo.city}</td> <br/>
        </tr>
        <tr>
      <td> {"Mobile Phone: "}</td>
      <td>{patientInfo.mobilePhone} <br/></td>
       </tr>
       <tr>
      <td> {"Date Of Birth: "}</td>
      <td>{formatedDateOfBirth } <br/></td>
       </tr>
       <tr>
      <td> {"Gender: " } </td>
      <td>{patientInfo.gender} <br/></td>
       </tr>
       <tr>
       <td>{"Infection Date: " }</td>
       <td>{ formattedInfectionDate}<br/></td>
       </tr>
       <tr>
       <td>{"Recovery Date: " } </td>
       <td>{formattedRecoveryDate}<br/></td>
       </tr>
       </tbody>
       </table>

       <h3>Patient Vaccination List:</h3>

       <AddEditVaccine patient={patientInfo}/>

   </div>
   </div>
   </div>
    </div>
  )
}

export default ViewPatient