import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to the lab router");
});

router.get('/name', (req, res) => {
    res.send("Nicole");
});

router.get('/greeting', (req, res) => {
    res.send("Hello");
});

router.get('/add/:x/:y', (req, res) => {
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);
    res.send(`${x + y}`);
});

router.get('/calculator/:a/:b/:operator', (req, res) => {
    let a = parseFloat(req.params.a);
    let b = parseFloat(req.params.b);
    let operator = req.params.operator;
    let result;

    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b === 0 ? "Cannot divide by zero" : a / b;
            break;
        default:
            result = "Invalid operation";
            break;
    }

    res.send(`${result}`);
});

export default router;