const asyncHandler=require('express-async-handler');
const Vaccine=require('../model/Vaccine');

const getVaccineDetails=asyncHandler(async(req, res)=>{
    const id=req.params.id;
   const result= await Vaccine.find({userID:id}).lean();
   res.json(result);
});

const addVaccineDetails=asyncHandler(async(req, res)=>{
    const {userID, manufacturer, administerDate}=req.body;
    const previousVaccines=await Vaccine.find({userID});
    console.log("Previus vaccines count = ", previousVaccines.length)
    if(previousVaccines.length>=4){
        return res.sendStatus(409);
    }
    const result=await Vaccine.create({userID, manufacturer, administerDate});
    res.json({userID, manufacturer, administerDate})
});

const deleteVaccineDetails=asyncHandler(async(req, res)=>{
    const {id}=req.body;
    
   
    const result=await Vaccine.deleteOne({_id:id});
    res.json({result})
});

module.exports={
    getVaccineDetails,
    addVaccineDetails,
    deleteVaccineDetails
}