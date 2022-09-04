const { default: mongoose } = require("mongoose")

const dashboardSchema = new mongoose.Schema({})
const Dashboard = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard