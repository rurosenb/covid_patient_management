const mongoose=require('mongoose');

const vaccineSchema=new mongoose.Schema(
    {
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Patient'
        },
        manufacturer:{
            type: String,
            enum: ['Pfizer', 'Moderna', 'JJ'],
            default: 'Pfizer'
        },
        administerDate: {
            type: Date,
            required: true
        },
       
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("Vaccine", vaccineSchema);

