import React, {useState} from 'react'
import '../../css/index.css'
import axios from '../../apis/axios';

const AddRcoveryModel = ({showModalR, setShowModalR, userID}) => {
    const [recoveryDate, setrecoveryDate]=useState(new Date().getFullYear()+"-"+(new Date().getMonth() ).toString().padStart(2, "0")+"-"+(new Date().getDate() ).toString().padStart(2, "0"));
    


const submitRcovery=async()=>{
    const result=await axios.post('/patient/covidrecovery',{patientID:userID,date:recoveryDate});
        console.log(result);
    }

if (!showModalR) return null;
    return (
      <div onClick={()=>setShowModalR(false)} className='overlay'>
        <div
          onClick={(e) => {
            e.stopPropagation();}}
          className='modalContainer'>
          
          <div className='modalRight'>
            <p className='closeBtn' onClick={()=>setShowModalR(false)}>
              X
            </p>
            <div className='content'>
             <form>
                <input type='date' value={recoveryDate} onChange={(event)=>setrecoveryDate(event.target.value)}/>
                <div className='btnContainer'>
              <button className='btnPrimary' onClick={submitRcovery}>
                <span className='bold'>Submit</span>
              </button>
             
            </div>
             </form>
             {new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()}
            </div>
           
          </div>
        </div>
      </div>
       );
    };

export default AddRcoveryModel