# Cryptocurrency-Tracker


# Technology Stack:

## Front-end
React.js, Bootstrap
## Back-end: 
Node.js, Express.js 
## Database: 
Google Firebase
Cryptocurrency Price API: WazirX API.
## Additional:
Apache echarts for Reactjs for graph visualisation

## Start Frontend

```
cd frontend
npm start
```

## Start Backend

```
cd server
npm run devstart
```


# IMPLEMENTATION

1. Login: I have used firebase authentication which uses gmail login, it is secure and google makes sure of it,
2. API: I have used wazirx free API for retriving the data.

I have used express js as backend, I have made sure that API is not leaked on the frontend side. All requests are made to backend and from the backend to wazirx API

The API call is sent to backend express.js and from that it sent to wazirxAPI. The API call is sent for every 15 sec so that data on frontend is updated every 15sec.

The data on the graphs is also updated and visualised for every 15sec using setInterval() method

fronend <--> backend <--> wazirxAPI 


https://github.com/Vijay1667/Cryptocurrency-Tracker/assets/95224492/f20142e8-e4dd-4ddb-b163-50e2c49438b8

