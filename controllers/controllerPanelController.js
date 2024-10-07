
const togglePower = async (req, res) => {
    // Logic to send Bluetooth command to smart plug to toggle power
    const { deviceId, powerState } = req.body;
  
    // Assuming you send the command to the smart plug using Bluetooth
    // e.g., noble.write(deviceId, 'toggle-power', powerState);
  
    res.json({ message: `Power toggled to ${powerState}` });
}

module.exports = togglePower;