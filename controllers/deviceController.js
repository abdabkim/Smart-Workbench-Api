const Device = require("../models/deviceModel");


const newDevice = async (req, res) => {
    
    try {
        const {deviceName, category, status} = req.body;

        if (!deviceName || !category) {
            res.status(400);
            throw new Error("Please fill all fields");
        } 

        const device = new Device({userId: req.id, deviceName,category,status});

        await device.save();

        res.status(201).json({message: "Device Saved", deviceID: device._id});

    } catch(error) {
        next(error.message);
    }

}

const getDevices = async (req, res) => {

    try {
        const devices = await Device.find({userId: req.id});
        console.log(devices);

        res.status(200).json({devices});

    } catch (error) {
        next(error.message);
    }

}

const updateStatus = async (req, res) => {

    try {
        const deviceID = req.params.id;
        const {status} = req.body;

        if (!status) {
            res.status(400);
            throw new Error("Status field missing");
        }

        await Device.findByIdAndUpdate(deviceID, {$set: {status: status}});

        res.status(200).json({message: "update successful"});

    } catch(error) {
        next(error.message);
    }
}

const removeDevice = async (req, res) => {

    try {

        const deviceID = req.params.id;

        await Device.findByIdAndDelete(deviceID);

        res.status(200).json({message: "Delete successful"});

    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    newDevice,
    getDevices,
    updateStatus,
    removeDevice
}