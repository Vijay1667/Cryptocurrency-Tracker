import React, { useEffect } from "react";
import '../App.css'
import { useParams } from "react-router-dom";
import { useState } from "react";
import Chart from "react-apexcharts";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
function EachCrypto(props) {
    const params = useParams();
    console.log(params)
    var [currentprices, setCurrentprices] = useState([]);
    var [dates, setDates] = useState([]);
    var [points, setPoints] = useState([]);
    var [currentdatac, setCurrentdatac] = useState([])
    var [currentdata, setCurrentdata] = useState([])
    var [value, setValue] = React.useState('one');
    var [interval1, setInterval1] = useState("1h");
    var [released, setReleased] = useState(false);
    async function handleChange(event, newValue) {
        setValue(newValue);
        // setCurrentdatac([]);
        console.log("EMOTY array"+currentdatac)
        // setCurrentdata([]);
        setReleased(true);
        console.log(newValue)
        if (newValue == "one") {
            setInterval1("1h")
            
            const response = await fetch(`http://localhost:3010/api/eachcrypto/${params.name}/`, {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, mode: 'cors', body: JSON.stringify({ interval: "1h", limit: 30 })
            });
            const jsonData = await response.json();
            console.log(jsonData)
            const newData = [];
            Object.entries(jsonData).map((doc) => {
                newData.push({ x: doc[1][0] * 1000, y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] });
            });
        
            setCurrentdata(newData);

            // Object.entries(jsonData).map((doc) => ((currentdatac.push({ x: (doc[1][0] * 1000), y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] }))))
            // setCurrentdata(currentdatac)
        }
        else if (newValue == "two") {
            setInterval1("1d")
            const response = await fetch(`http://localhost:3010/api/eachcrypto/${params.name}/`, {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, mode: 'cors', body: JSON.stringify({ interval: "1d", limit: 30 })
            });
            const jsonData = await response.json();
            console.log(jsonData)
            const newData = [];
            Object.entries(jsonData).map((doc) => {
                newData.push({ x: doc[1][0] * 1000, y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] });
            });
        
            setCurrentdata(newData);
            // Object.entries(jsonData).map((doc) => ((currentdatac.push({ x: (doc[1][0] * 1000), y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] }))))
            // setCurrentdata(currentdatac)
        }
        else {
            setInterval1("1w")
            const response = await fetch(`http://localhost:3010/api/eachcrypto/${params.name}/`, {
                method: "POST", headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, mode: 'cors', body: JSON.stringify({ interval: "1w", limit: 30 })
            });
            const jsonData = await response.json();
            console.log(jsonData)
            const newData = [];
            Object.entries(jsonData).map((doc) => {
                newData.push({ x: doc[1][0] * 1000, y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] });
            });
        
            setCurrentdata(newData);
            // Object.entries(jsonData).map((doc) => ((currentdatac.push({ x: (doc[1][0] * 1000), y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] }))))
            // setCurrentdata(currentdatac)
        }
        setCurrentdatac([]);
    };
    async function fetchPrices() {
        //     const req24 = await fetch(`https://api.wazirx.com/sapi/v1/klines?`+new URLSearchParams({
        //     symbol:params.name,
        //     limit:20,
        //     interval:"1h"
        // }))
        //         const resp24 = await req24.json()
        //         console.log(resp24)
        // setCurrentdatac([]);
        
        console.log("EMPTY aray"+currentdatac)

        // setCurrentdata([]);
        const response = await fetch(`http://localhost:3010/api/eachcrypto/${params.name}/`, {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, mode: 'cors', body: JSON.stringify({ interval: interval1, limit: 30 })
        });
        const jsonData = await response.json();
        console.log(jsonData)
        const newData = [];
        Object.entries(jsonData).map((doc) => {
            newData.push({ x: doc[1][0] * 1000, y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] });
        });
    
        setCurrentdata(newData);
        // Object.entries(jsonData).map((doc) => ((currentdatac.push({ x: (doc[1][0] * 1000), y: [doc[1][1], doc[1][2], doc[1][3], doc[1][4]] }))))
        // setCurrentdata(currentdatac)
        // setCurrentdatac([]);
    }
    useEffect(() => {
        
        const intervalId = setInterval(() => {
            // Your API call logic here
            fetchPrices()
          }, 15000);
      
          return () => {
            clearInterval(intervalId);
          };
    }, [interval1])

    
    return (
        <div style={{ fontFamily: "Open Sans" }}>
            <div className="text-end">
                Time is displayed in UTC
            </div>
            <div className="d-flex flex-column align-items-end">
                <div>
                    <Box sx={{ width: 'min-content' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="1h" />
                            <Tab value="two" label="1d" />
                            <Tab value="three" label="1w" />
                        </Tabs>
                    </Box>
                </div>
            </div>
            <div>
                <Chart
                type="candlestick"
                    options={{
                        chart: {
                            height: "100vh"
                        },
                        xaxis: {
                            type: 'datetime'
                        },
                        yaxis: {
                            scale: false,
                            splitArea: {
                                show: true
                            }
                        },
                        tooltip: {
                            show: false
                        },

                    }}
                    series={[{

                        name: 'candle',
                        type: 'candlestick',
                        data: currentdata
                    }]}
                    


                />
            </div>


        </div>
    )
}
export default EachCrypto;