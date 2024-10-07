const cron = require('node-cron');

const automateActivity = async (req, res) => {
    const { action, time } = req.body;
  
    // Schedule a job to toggle the smart plug power
    cron.schedule(time, () => {
      // Logic to trigger Bluetooth command for the action
      console.log(`Scheduled task to ${action}`);
    });
  
    res.json({ message: 'Automation scheduled' });
}

module.exports = automateActivity;