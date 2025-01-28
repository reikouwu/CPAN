import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("welcome to the server");
    } else if (req.url === '/about') {
        if (req.method ==="GET"){
            let webpage = fs.readFileSync("about.htmk")
            rest.end(webpage)
        }
        let webpage = fs.readFileSync("about.html")
        res.end(webpage);
    } else if (req.url === '/login') {
        let webpage = fs.readFileSync("login.html")
        res.end(webpage);
    } else if (req.url === '/contact') {
        let webpage = fs.readFileSync("contact.html")
        res.end(webpage);
    } else {
        res.end("Page not found");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});