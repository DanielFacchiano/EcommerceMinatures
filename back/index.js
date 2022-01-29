const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;
const shopping = require("./routes/shopping.js")
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola, Amigo')
})

app.use('/shopping', shopping)
app.listen(PORT, console.log(`Server running on local port ${PORT}`));
