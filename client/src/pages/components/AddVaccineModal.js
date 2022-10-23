import React, {useState} from 'react'
import '../../css/index.css'
import axios from '../../apis/axios';

const AddVaccineModal = ({showModal, setShowModal, userID}) => {
    const [vaccineManufacturer, setVaccineManufacturer]=useState('Pfizer');
    const [administerDate, setAdministerDate]=useState(new Date().getFullYear()+"-"+(new Date().getMonth() ).toString().padStart(2, "0")+"-"+(new Date().getDate() ).toString().padStart(2, "0"));
    const changeManufacturer=(event)=>{
        setVaccineManufacturer(event.target.value);
    }
    const submitVaccine=async()=>{
        const result=await axios.post('/vaccine',{userID, manufacturer:vaccineManufacturer,administerDate });
        console.log(result);
    }
   
        if (!showModal) return null;
        return (
          <div onClick={()=>setShowModal(false)} className='overlay'>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className='modalContainer'
            >
              
              <div className='modalRight'>
                <p className='closeBtn' onClick={()=>setShowModal(false)}>
                  X
                </p>
                <div className='content'>
                 <form>
                    <input type="radio" id="Pfizer" name="manufacturer" value="Pfizer" onChange={changeManufacturer} checked={vaccineManufacturer==='Pfizer'} />
                     <label for="html"> Pfizer </label>
                     <input type="radio" id="Moderna" name="manufacturer" value="Moderna" onChange={changeManufacturer} checked={vaccineManufacturer==='Moderna'} />
                     <label for="html"> Moderna </label>
                     <input type="radio" id="JJ" name="manufacturer" value="JJ" onChange={changeManufacturer} checked={vaccineManufacturer==='JJ'} />
                     <label for="html"> JJ </label>
                    <br/>
                    <input type='date' value={administerDate} onChange={(event)=>setAdministerDate(event.target.value)}/>
                    <div className='btnContainer'>
                  <button className='btnPrimary' onClick={submitVaccine}>
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

export default AddVaccineModal
