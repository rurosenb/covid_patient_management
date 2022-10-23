const Patient=require('../model/Patient');
const asyncHandler=require('express-async-handler');

const getPatients=asyncHandler(async (req, res)=>{
    const result=await Patient.find().lean();
    res.status(200).json(result);
})
const getPatient=asyncHandler(async (req, res)=>{
    const id=req.params.id;
    const result=await Patient.find({_id:id}).lean();
    res.status(200).json(result);
});


const postPatient= asyncHandler(async (req, res)=>{
    const { 
    firstName,
    lastName,
    patientTZ,
    street ,
    houseNumber,
    apartmentNumber,
    city,
    zip,
    DOB,
    mobilePhone,
    phone,
    gender
    }= req.body;
    const patient=await Patient.find({patientTZ});
    console.log(patient);
    if(patient.length>0){
        return res.sendStatus(409);
    }

const result=await Patient.create({
    firstName,
    lastName,
    patientTZ,
    street ,
    houseNumber,
    apartmentNumber,
    city,
    zip,
    DOB,
    mobilePhone,
    phone,
    gender
})
   
     res.json({status: "Success"})
});
const updatePatient=asyncHandler(async( req, res)=>{
    const { 
        id,
        firstName,
        lastName,
        patientTZ,
        street ,
        houseNumber,
        apartmentNumber,
        city,
        zip,
        DOB,
        mobilePhone,
        phone,
        gender
    }= req.body;
    const result= await Patient.updateOne({
        "_id": id
    },{
         
            firstName,
            lastName,
            patientTZ,
            street ,
            houseNumber,
            apartmentNumber,
            city,
            zip,
            DOB,
            mobilePhone,
            phone,
            gender
        }
    );
    res.status(200).json(result);
});
const deletePatient=asyncHandler(async (req, res)=>{
    const {id}=req.body;
    console.log(id);
    const result=await Patient.deleteOne({_id:id});
    res.status(200).json(result);
});

const addInfectionDate=asyncHandler(async(req, res)=>{
    const {patientID, date}=req.body;
    const result=await Patient.updateOne({_id: patientID}, {infectionDate:date});
    res.json(result);




});
const addRecoveryDate=asyncHandler(async(req, res)=>{
    const {patientID, date}=req.body;
    const result=await Patient.updateOne({_id: patientID}, {recoveryDate:date});
    res.json(result);


})

module.exports={
    getPatients, getPatient,postPatient,deletePatient,updatePatient, addInfectionDate, addRecoveryDate
}


