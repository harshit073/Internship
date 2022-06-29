const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const {isValidRequest, isValid} = require('../validator/validation')


const createIntern = async function(req, res){
    try{

        if (!isValidRequest(req.body)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Input" })
        }

        const {name, email, mobile, collegename}= req.body

    }
    catch(error){
        return res
            .status(500)
            .send({status: false, message: error.message})
    }
}