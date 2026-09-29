
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config();

const enquiryRoutes = require('./app/routes/web/enquiryRoutes');

let app = express();

app.use(cors());
app.use(express.json());

app.use('/api/website/enquiry', enquiryRoutes);

mongoose.connect(process.env.DBURL)
.then(() => {
    console.log("connect to mongoDB");

    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running ..");
    });
})
.catch((err) => {
    console.log(err);
});