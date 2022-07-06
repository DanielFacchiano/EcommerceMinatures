const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;

// the routes and their locations which we will use
const shopping = require("./routes/shopping.js")
const orders = require("./routes/orders.js")
const orderItem = require("./routes/orderItem.js")
const items = require("./routes/items.js")
const auth = require("./routes/auth.js")
const verification = require("./routes/verification.js")



// set up application to use correct dependancies
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hola, Amigo')
})

// use the routes we previously imported
app.use('/shopping', shopping)
app.use('/orders', orders)
app.use('/orderItem', orderItem)
app.use('/items', items)
app.use('/auth', auth)
app.use('/verification', verification)

// listen on this port
app.listen(PORT, console.log(`Server running on local port ${PORT}`));
