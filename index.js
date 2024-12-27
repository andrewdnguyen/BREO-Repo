const express = require('express');
require('dotenv').config({ path: '.env' })
const app = express()
const PORT = 8080;
const server = require('http').createServer(app);
const WebSocket = require('ws');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const wss = new WebSocket.Server({ server: server });

app.use(express.json())

server.listen(
    PORT,
    () => console.log(`app hosted on http://localhost:8080`)
);

wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');
  
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
  
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
      
    });
  });

async function getUser() {
    
}

app.get('/index', (req, res) => {
    getUser();
    try {
        const user = {
            username: process.env.WATTTIME_USER,
            password: process.env.WATTTIME_PW
        }
        console.log('Setting up auth')
        const authorization = Buffer.from(user.username + ":" + user.password).toString('base64');
        const apiResponse = fetch(
            'https://api.watttime.org/login', {
                headers: {
                    Authorization: 'Basic ' + authorization, 
                }
            }
        ).then((response) => {
            console.log(response)
            console.log('Sending token')
            return response.json();
        }).then(data => {
            console.log('Fetching data')
            return fetch(
                'https://api.watttime.org/v3/signal-index?region=LDWP&signal_type=co2_moer', {
                    headers: {
                        Authorization: 'Bearer ' + data.token, 
                    }
                }
            )
        }).then(response2 => {
            return response2.json()
        }).then(data2 => {
            console.log('Emitting data')
            res.status(200).send(data2);
        });
      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }
});

app.get('/index2', (req, res) => {
    getUser();
    try {
        const time = new Date();
        const time2 = new Date();
        time.setHours(time.getHours() - 1);
        time2.setHours(time2.getHours() + 1);
        const timeString = time.toISOString();
        const time2String = time2.toISOString();

        console.log('Setting up query')

        const startDate = timeString.slice(0,13)
        const endDate = time2String.slice(0,13)

        const query = 'https://www.airnowapi.org/aq/data/?' +
        'startDate=' + startDate + '&' +
        'endDate=' + endDate + '&' +
        'parameters=PM25&BBOX=-118.469196,33.916484,-118.134113,34.089531&dataType=A&format=application/json&verbose=0&monitorType=0&includerawconcentrations=0&API_KEY=' + process.env.AIRNOW_API;

        console.log('Fetching data')
        const apiResponse = fetch(query).then(response2 => {
            return response2.json()
        }).then(data3 => {
            console.log('Emitting data')
            console.log(data3);
            res.status(200).send(data3[0]);
        });
      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }
});

const API_KEY = process.env.KAITERRA_API

app.get('/index3', (req, res) => {
    try {

        const query = `https://api.kaiterra.com/v1/devices/0a77abd2-f253-46ea-b5fa-351f847da810/top?aqi=US&key=${API_KEY}`

        console.log('Fetching data')
        const apiResponse = fetch(query , {
        }).then(response2 => {
            return response2.json()
        }).then(data4 => {
            console.log('Emitting data')
            console.log(data4);
            res.status(200).send(JSON.stringify(data4));
        });
      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }
});

app.get('/index4', (req, res) => {
    try {

        const query = `https://api.kaiterra.com/v1/batch?key=${API_KEY}`

        const requestBody = [
            //18B 
            {
              "method": "GET",
              "relative_url": "/devices/b390e4c0-a782-48fb-b087-47bb4a935585/top?aqi=US"
            },
            //18D
            {
              "method": "GET",
              "relative_url": "/devices/0a77abd2-f253-46ea-b5fa-351f847da810/top?aqi=US"
            },
            //18U
            {
                "method": "GET",
                "relative_url": "/devices/9dfc1d04-4a31-4da0-8037-1676de552e4d/top?aqi=US"
            },
            //18S
            {
                "method": "GET",
                "relative_url": "/devices/d2e10877-3916-460b-a7a3-f800e596766f/top?aqi=US"
            },
            //18Print
            {
                "method": "GET",
                "relative_url": "/devices/e1c95afe-25be-4e6f-b1eb-5e07ba86c108/top?aqi=US"
            },
            //18BIM
            {
                "method": "GET",
                "relative_url": "/devices/94dfb7f9-5547-497b-8df5-ba3d0f419737/top?aqi=US"
            },
            //18StructuralElectrical
            {
                "method": "GET",
                "relative_url": "/devices/4e7575a9-010d-4f27-b99e-d8bebc6c7ea3/top?aqi=US"
              },
              //18PantryKitchen
              {
                "method": "GET",
                "relative_url": "/devices/72f3d7c6-a457-4a92-b936-b66c043e887e/top?aqi=US"
              },
              //18MechanicalSustainability
              {
                  "method": "GET",
                  "relative_url": "/devices/2465de81-fb9a-4455-ac49-0396ea9a3bd5/top?aqi=US"
              },
              //18Foresight
              {
                  "method": "GET",
                  "relative_url": "/devices/69eb4fa6-b51d-4252-b8dc-0ea110afa2e7/top?aqi=US"
              },
              //18A
              {
                  "method": "GET",
                  "relative_url": "/devices/d9e038b2-9d6e-4033-aa36-a4c1a25d530f/top?aqi=US"
              },
              //18ElectricalCorner
              {
                  "method": "GET",
                  "relative_url": "/devices/6350f7b9-1123-4005-8065-0acc2a3988eb/top?aqi=US"
              },
              //18R
              {
                "method": "GET",
                "relative_url": "/devices/422a5026-c43b-48d2-8eea-572b4ca1fc10/top?aqi=US"
              },
              //18P
              {
                "method": "GET",
                "relative_url": "/devices/ebb8e2e5-5508-407a-bfaa-3728b0759ee0/top?aqi=US"
              },
              //18J
              {
                "method": "GET",
                "relative_url": "/devices/8ba95a83-29a2-442a-b203-713d37c40db1/top?aqi=US"
              },
          ];

        console.log('Fetching data')
        const apiResponse = fetch(query , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(response2 => {
            return response2.json()
        }).then(data4 => {
            console.log('Emitting data')
            //console.log(data4);
            // let indexArray = []
            let highestMax = 0;
            data4.forEach(device =>{
                let maxScore = 0 
                parsedBody = JSON.parse(device.body)
                console.log(parsedBody)
                parsedBody.data.forEach(dataPoint => {
                    if(dataPoint && dataPoint.points && dataPoint.points[0] && dataPoint.points[0].aqi && dataPoint.points[0].aqi > maxScore) {
                        maxScore = dataPoint.points[0].aqi
                    }
                })
                // arrayObject = {
                //     deviceID: device.id,
                //     aqiScore: maxScore
                // }
                // indexArray.push(arrayObject);
                if (maxScore > highestMax) {
                    highestMax = maxScore;
                }
            })
            res.status(200).send(JSON.stringify(highestMax));
        });
      } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
      }
});