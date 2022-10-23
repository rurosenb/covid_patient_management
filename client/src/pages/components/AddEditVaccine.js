import React, {useEffect, useState} from 'react'
import '../../css/index.css';
import axios from '../../apis/axios';
import AddVaccineModal from './AddVaccineModal';
import AddInfectionModel from './AddInfectionModel';
import AddRcoveryModel from './AddRecoveryModel';



const AddEditVaccine = ({patient}) => {
    const [vaccines, setVaccines]=useState([]);
    const [showModal, setShowModal]=useState(false);

    const [showModalI, setShowModalI]=useState(false);
    const [showModalR, setShowModalR]=useState(false);

    useEffect(()=>{
       
        const getVaccineInfo=async()=>{
            const result= await axios.get('/vaccine/'+patient._id);
            setVaccines(result.data);
        }
        getVaccineInfo();


    },[patient]);

const deleteVaccine=async (id) =>{
    const result=await axios.delete("/vaccine", {id});
    console.log(result);
}

  return (
    <>
    
    <AddVaccineModal showModal={showModal} setShowModal={setShowModal} userID={patient._id}/>
    <AddInfectionModel showModalI={showModalI} setShowModalI={setShowModalI} userID={patient._id}/>
    <AddRcoveryModel showModalR={showModalR} setShowModalR={setShowModalR} userID={patient._id}/>


   <table>
    <tbody>
        {vaccines.map(item=>{
            const date=new Date(item.administerDate);
            const formatedDate = (date.getDate() ).toString().padStart(2, "0")+"-"+(date.getMonth() +1).toString().padStart(2, "0")+"-"+date.getFullYear();
            return(
            <tr>
            <td>{item.manufacturer}</td>
            <td>{formatedDate}</td>
            {
            /* <td><button onClick={()=>deleteVaccine(item._id)}>Delete</button></td> */}
           
            </tr>
            )})}
       <td> <button class="btn btn-secondary btn-lg" disabled={vaccines.length>3}  onClick={()=>setShowModal(true)} >Add Vaccine</button> </td>
       <td> <button class="btn btn-secondary btn-lg" disabled={patient.infectionDate!=null}  onClick={()=>setShowModalI(true)} >Add Infection Date</button></td>
       <td> <button class="btn btn-secondary btn-lg" disabled={patient.recoveryDate!=null}  onClick={()=>setShowModalR(true)} >Add Recovery Date</button></td>
       </tbody>
    </table>
    </>
  )
}

export default AddEditVaccine