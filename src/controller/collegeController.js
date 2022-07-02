const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const { isValidRequest, 
        isValidUrl, 
        isValidName, 
        isValidString} = require('../validator/validation')


//---------------------create College-------------------------------
const createCollege = async function(req, res){
    try {
        if (!isValidRequest(req.body)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Input" })
        }

        let { name, fullName, logoLink } = req.body;
        let collegeData = {}

        //name Validation
        if (name) {
            name = name.toLowerCase().trim()
            if (!isValidName(name)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid Name or enter just the abbreviation" })
            }

            //checking for duplicacy in database
            const isDuplicate = await collegeModel.findOne({name: name })

            if (isDuplicate) {
                return res
                .status(409)
                .send({ status: false, message: `${name} name already exist` }) 
            } else collegeData.name = name
        }else return res
                .status(400)
                .send({ status: false, message: "college name is required" })

        //fullName validation
        if(fullName){
            fullName = fullName.trim()
            if (!isValidString(fullName)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid fullName" })
            }else{
             collegeData.fullName = fullName
            } 
        }else return res
                .status(400)
                .send({ status: false, message: "fullName is required" })

        //logoLink validation
        if(logoLink){

            if(!isValidUrl(logoLink)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid logoLink url format" })
            } else {
             collegeData.logoLink = logoLink
            }
        }else return res
                .status(400)
                .send({ status: false, message: "logoLink is required" })

        //creating the college data
        const college = await collegeModel.create(collegeData)
        return res
            .status(201)
            .send({ status: true, data: college })
    }
    catch (error) {
        return res
            .status(500)
            .send({ status: false, message: error.message })
    }
}


//---------------------------displaying the list of interns from a particular college----------------------------
const collegeDetails = async function(req,res){
    try {
        if(!isValidRequest(req.query)){
            return res
                .status(400)
                .send({status:false, message:"Enter a valid query"})
        }
        
        let name = req.query.collegeName
        name = name.trim().toLowerCase() //converting the value in query params in lowercase as only lowercase is acceptable

        //name validation for college name
        if(!isValidName(name)){
            return res
                .status(400)
                .send({status:false, message:"Enter a valid query value"})
        }
        
        const college = await collegeModel.findOne({ name: name })

        if(!college){
            return res
                .status(404)
                .send({status:false, message:"No such college exist or try for abbreviation of same"})
        }

        //an object 'data' with the selective keys from college model
        const data = await collegeModel.findOne({ name: name}).select({_id:0, isDeleted:0, __v:0})

        const interns = await internModel.find({ collegeId: college._id }).select({collegeId:0, isDeleted:0, __v:0})
        
        //using .doc method to display the details of college along with that of interns
        if(!interns.length){
            //console.log(interns)
            data._doc["interns"] = `No interns exist for ${name} college`

        }else{ 
                data._doc["interns"] = interns
            }
        return res
            .status(200)
            .send({ status: true, data })
    }
    catch(error){
        return res
                .status(500)
                .send({status:false, message:error.message})
    }
}


module.exports = { createCollege, collegeDetails}
