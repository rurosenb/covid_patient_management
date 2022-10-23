import React, {useState} from 'react'
import '../../css/index.css'
import axios from '../../apis/axios';

const AddInfectionModel = ({showModalI, setShowModalI, userID}) => {
    const [infectionDate, setinfectionDate]=useState(new Date().getFullYear()+"-"+(new Date().getMonth() ).toString().padStart(2, "0")+"-"+(new Date().getDate() ).toString().padStart(2, "0"));
    


const submitInfection=async()=>{
        const result=await axios.post('/patient/covidinfection',{patientID:userID,date:infectionDate});
        console.log(result);
    }

if (!showModalI) return null;
    return (
      <div onClick={()=>setShowModalI(false)} className='overlay'>
        <div
          onClick={(e) => {
            e.stopPropagation();}}
          className='modalContainer'>
          
          <div className='modalRight'>
            <p className='closeBtn' onClick={()=>setShowModalI(false)}>
              X
            </p>
            <div className='content'>
             <form>
                <input type='date' value={infectionDate} onChange={(event)=>setinfectionDate(event.target.value)}/>
                <div className='btnContainer'>
              <button class="btn btn-secondary btn-lg" className='btnPrimary' onClick={submitInfection}>
                <span className='bold'>Submit</span>
              </button>
             
            </div>
             </form>
             {/*{new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()}*/}
            </div>
           
          </div>
        </div>
      </div>
       );
    };

export default AddInfectionModel

