const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;

app.use(express.json({ extended: false }));

app.use('/api/parser', require('./backend/routes/parser'));

app.listen(port, () => console.log(`Server started on port ${port}`));