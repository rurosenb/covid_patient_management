import React from 'react'
import axios from '../../apis/axios'
import { useNavigate, Link  } from 'react-router-dom';
import '../../css/index.css'


const PatientListItem = ({item, callback}) => {
  const navigate=useNavigate ();

    
    const deletePatient=async(item)=>{
      await  axios.delete('/patient',{
            headers:{"Content-Type": "application/json"},
            data:{id: item._id}
        });
       await callback();
        
    }
    const editPatient=(item)=>{
      navigate('/createpatient', {state: item});
    }

  return (
  <table className="table">

  <tbody>

  <tr align= "center" key={item._id}>
    
      <td className='tdthird'> <Link to={`/viewpatient/${item._id}`}>
      {item.firstName} {item.lastName} </Link></td> 
      <td className='tdthird'><button className="btn btn-secondary btn-lg" onClick={()=>editPatient(item)}>Edit Patient</button> <button className="btn btn-secondary btn-lg" onClick={()=>deletePatient(item)}>Delete</button></td>
     
     </tr>
     </tbody>
     </table>
  )
}

export default PatientListItem