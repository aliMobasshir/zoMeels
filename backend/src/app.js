//create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute')
const foodRoutes = require('./routes/foodRoutes')
const foodPartnerRoutes = require('./routes/foodPartnerRoutes')
const cors = require('cors');

const app = express();

app.use(cors({
    origin : process.env.CLIENT_URL || "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res) => {
 res.send('hellu world');
})

app.use("/api/auth",authRoutes);
app.use("/api/food",foodRoutes)
app.use("/api/foodPartner",foodPartnerRoutes)

module.exports = app;