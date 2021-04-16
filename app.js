const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const cors = require("cors");
const axios = require("axios");



app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/geo', async (req, res) => {

	let ip = req.socket.remoteAddress;
	if (ip == "::1" || ip.includes("::ffff")) {
		ip = "184.148.208.226";
	}

	let loc = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=964721d838ca46b09c918ee9edf95832&ip=${ip}`);

	//res.json(loc);
	//res.json({ data: "this is data" });
	res.json(loc.data);
});


app.listen(port, () => {

	console.log(`listening on port: ${port}`);
});
