
const deviceStatus = async (req, res) => {
    // Logic to get the current status of the smart plug
    const deviceStatus = {
      powerConsumption: '120W',
      temperature: '22°C',
      humidity: '45%'
    };
  
    res.json(deviceStatus);
}

module.exports = deviceStatus;