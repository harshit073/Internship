const collegeModel = require('../models/collegeModel')
const { isValid, isValidUrl } = require('../validations/collegeValidation')
const createCollege = async function (req, res) {
    try {
        const { name, fullName, logoLink } = req.body;
        const collegeData = {}

        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Name" })
        } else {
            const isDuplicate = await collegeModel.find({ name })
            if (isDuplicate.length == 0) {
                collegeData.name = name
            } else return res
                        .status(400)
                        .send({ status: false, message: `${name} name already exist` })
        }

        if (!isValid(fullName)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid fullName" })
        } else {
            const isDuplicate = await collegeModel.find({ fullName })
            if (isDuplicate.length == 0) {
                collegeData.fullName = fullName
            } else return res
                        .status(400)
                        .send({ status: false, message: `${fullName} fullName already exist` })
        }
        if (!isValid(logoLink)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid logoLink url" })
        } else if (!isValidUrl(logoLink)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid logoLink url format" })
        } else {
            collegeData.logoLink = logoLink
        }
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