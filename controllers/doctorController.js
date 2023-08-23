const Doctor= require("../models/doctor")

//Book Appointment

exports.bookAppointment = async (req,res)=>{
try{
    const appointment = new Doctor(req.body) ;
    await appointment.save();
res.status(201).json({message:"Appointment Booked"});
}catch(error){
    console.error("Error booking appointment",error);
    res.status(500).json({message:"Server Error"});
}
};

//Get ALl  Appointments 
exports.getAllDoctors = async (req,res)=>{
    try{
    const doctor= await Doctor.find();
    res.status(200).json(doctor);
    }catch(error){
        
        res.status(500).json({error: "Error fetching appointment info"});
    }
    };


    //get by id
    exports.getDoctorById = async (req,res)=>{
        
        const {id}= req.params ;
        try{
        const doctor= await Doctor.findById(id);
        if(!doctor){
        return res.status(404).json({error: "appointment not found"});
        }
        res.status(200).json({doctor});
        }catch(error){
            
            console.error("Error getting appointment",error);
            res.status(500).json({error: "Error fetching appointment info"});
            
        }
        };

        //Put-Update
           

        exports.updateAppointment = async (req,res)=>{
        
            const {id}= req.params ;
            try{
            const doctor= await Doctor.findByIdAndUpdate(id,req.body,{new:true});
            if(!doctor){
            return res.status(404).json({error: "appointment not found"});
            }
            res.status(200).json({message:"=Appointment updated successfully",doctor});
            }catch(error){
                
                console.error("Error udating appointment",error);
                res.status(500).json({error: "ServerError"});
                
            }
            };



        /// Delete 

            exports.deleteAppointment = async (req,res)=>{
        
                const {id}= req.params ;
                try{
                const doctor= await Doctor.findByIdAndDelete(id);
                if(!doctor){
                return res.status(404).json({error: "appointment not found"});
                }
                res.status(200).json({message:"=Appointment deleted successfully",doctor});
                }catch(error){
                    
                    console.error("Error deleting appointment",error);
                    res.status(500).json({error: "ServerError"});
                    
                }
                };

        //Filter


        
        exports.filterAppointment = async (req,res)=>{
        
            const {specialization}= req.query ;
            try{
            const filteredAppointments= await Doctor.find({specialization});
           
            res.status(200).json({filteredAppointments});
            
           
            }catch(error){
                res.status(500).json({error: "Error filtering "});
                
            }
            };

            //Sorting   
         

            exports.sortAppointment = async (req,res)=>{
        
                const {date}= req.query ;
                try{
                const sortededAppointments= await Doctor.find().sort({date:date});
               
                res.status(200).json({sortededAppointments});
                
               
                }catch(error){
                    res.status(500).json({error: "Error sorting "});
                    
                }
                };



            
        