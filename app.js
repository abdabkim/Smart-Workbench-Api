const express = require('express');

const authRoutes = require('./routes/authRoutes');
const controlPanelRoutes = require('./routes/controlPanelRoutes');
const monitoringRoutes = require('./routes/monitoringRoutes');
const automationRoutes = require('./routes/automationRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const devicesRoutes = require("./routes/deviceRoutes");
const path = require("path");


const dbConnect = require("./config/dbConfig");

//Middlewares
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join('uploads')));

dbConnect();

// Routes
app.use('/auth', authRoutes);
app.use('/device', devicesRoutes)
app.use('/control-panel', controlPanelRoutes);
app.use('/monitoring', monitoringRoutes);
app.use('/automation', automationRoutes);
app.use('/settings', settingsRoutes);


app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});