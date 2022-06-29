const collegeModel = require('../models/collegeModel')
const { isValidRequest, isValid, isValidUrl, isValidName } = require('../validator/validation')


const createCollege = async function(req, res){
    try {

        if (!isValidRequest(req.body)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Input" })
        }

        const { name, fullName, logoLink } = req.body;
        const collegeData = {}

        if (name) {
            if (!isValidName(name)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid Name" })
            }
            const isDuplicate = await collegeModel.find({ name })
            if (isDuplicate.length == 0) {
                collegeData.name = name
            } else return res
                .status(400)
                .send({ status: false, message: `${name} name already exist` })
        }else return res
                .status(400)
                .send({ status: false, message: "college name is required" })


        if(fullName){
            if (!isValid(fullName)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid fullName" })
            }else{
                collegeData.fullName = fullName
            } 
        }else return res
                .status(400)
                .send({ status: false, message: "fullName is required" })


        if(logoLink){
            if (!isValid(logoLink)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid logoLink url" })
            }
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

module.exports = { createCollege }