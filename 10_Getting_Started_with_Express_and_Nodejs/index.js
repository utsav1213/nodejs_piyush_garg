const express=require("express")
const app = express();

app.get('/', (req, res) => {
   return res.send("hello there");
})
app.get('/about', (req, res) => {
     return res.send(`hello ${req.query.name}`)
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log('server is started')
})