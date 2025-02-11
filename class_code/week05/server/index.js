/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
 
const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware

 
// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

//send data
app.get("/about", (req, res) => {   
    const data = {
        fname: "Doe",
        lname: "John",
    }
    res.send(data); 
});

 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
 