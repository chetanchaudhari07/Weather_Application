const express = require("express");
const fs = require("fs");
const cors = require("cors");


const server = express();

server.use(cors());

server.use(express.json());

server.get("/home",(req,res)=>{
    res.send("----");
});

server.get("/weather",(req,res)=>{
    const city = req.query.city;
    if(!city){
        return res.status(400).send("city query parameter is required");

    }
    fs.readFile("weather.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("error reading weather data");
        
        }

        const weatherData = JSON.parse(data);
        const cityWeather = weatherData.weather.find(w=>w.name.toLowerCase()===city.toLowerCase());

        if(cityWeather){
            res.json(cityWeather);
        }
        else{
            res.status(404).send("city not found");

        }
    });
});



server.listen(4508,()=>{
    console.log("server is running")
});