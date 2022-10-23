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
      <div class="container1">
        {patientInfo.firstName + " " + patientInfo.lastName} <br/>
        {patientInfo.street + " " + patientInfo.houseNumber + " APT: "+ patientInfo.apartmentNumber} <br/>
        
        {patientInfo.city + " " + patientInfo.zip} <br/>
       {"Mobile: " + patientInfo.mobilePhone + " Phone: " + patientInfo.phone} <br/>
       {"DOB: " + formatedDateOfBirth + " Sex: " + patientInfo.gender} <br/>
       {"Infection Date: " + formattedInfectionDate}<br/>
       {"Recovery Date: " + formattedRecoveryDate}<br/>
        
        
       <AddEditVaccine patient={patientInfo} id={id}/>
   </div>
   </div>
   </div>
    </div>
  )
}

export default ViewPatient