import express from 'express';

const app = express();

const WSServer = require('express-ws')(app);

const PORT = process.env.PORT || 3001;

// app.ws('/', (ws, req) => {
//   console.log('connection is established');
// });

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
