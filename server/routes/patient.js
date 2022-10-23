const router=require('express').Router();
const patientController=require('../controllers/patientController');


router.get('/hi', (req, res)=>{
    res.end("Patient hi")
})


router.route('/')
.get(patientController.getPatients)
.post(patientController.postPatient)
.patch(patientController.updatePatient)
.delete(patientController.deletePatient);

router.post("/covidinfection" , patientController.addInfectionDate);

router.post("/covidrecovery", patientController.addRecoveryDate);



router.get('/:id', patientController.getPatient);


module.exports=router;