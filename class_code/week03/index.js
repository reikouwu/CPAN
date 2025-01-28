import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/search',(req,res) => (
    console.log(req.url),
    console.log(req.headers),
    console.log(req.query),
    console.log(req.params),
    console.log(req.body),   
    res.send("You came to the /search route")
))

app.get('/item/:itemID',(req,res) => (
    console.log(req.url),
    console.log(req.headers), 
    console.log(req.query),
    console.log(req.params),
    console.log(req.body),   
    res.send("You came to the /item route")
))
app.get('/', (req, res) => {
    res.send('GET request received');
});

app.delete('/', (req, res) => {
    res.send('DELETE request received');
});

app.post('/', (req, res) => {
    res.send('POST request received');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});     