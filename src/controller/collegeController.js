const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const { isValidRequest, 
        isValid, 
        isValidUrl, 
        isValidName } = require('../validator/validation')


//---------------------create College-------------------------------
const createCollege = async function(req, res){
    try {
        if (!isValidRequest(req.body)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Input" })
        }

        const { name, fullName, logoLink } = req.body;
        const collegeData = {}

        //name Validation
        if (name) {

            if (!isValidName(name)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid Name or enter just the abbreviation" })
            }

            //checking for duplicacy in database
            const isDuplicate = await collegeModel.findOne({name: name })
            if (isDuplicate) {
             collegeData.name = name.trim()
            } else return res
                .status(400)
                .send({ status: false, message: `${name} name already exist` })
        }else return res
                .status(400)
                .send({ status: false, message: "college name is required" })

        //fullName validation
        if(fullName){
            if (!isValid(fullName)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid fullName" })
            }else{
             collegeData.fullName = fullName.trim()
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
            .send({ status: true, college: college })
    }
    catch (error) {
        return res
            .status(500)
            .send({ status: false, message: error.message })
    }
}


//----------------------displaying the list of interns from a particular college----------------------------
const collegeDetails = async function(req,res){
    try {
        if(!isValidRequest(req.query)){
            return res
                .status(400)
                .send({status:false, message:"Enter a valid query"})
        }
        
        let name = req.query.collegeName || req.query.collegename || req.query.COLLEGENAME
        name = name.toLowerCase() //converting the value in query params in lowercase as only lowercase is acceptable

        //name validation for college name
        if(!isValid(name)){
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
        const interns = await internModel.find({ collegeId: college._id })
        if(!interns){
            return res
                .status(404)
                .send({status:false, message:"No intern exist from this college"})
        }

        //creating an object with the required keys to be displayed
        const data = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
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