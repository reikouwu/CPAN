import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';


const router = express.Router();

router.post("/register", (req, res) => {
    {
        const { email, password } = req.body;
        bcrypt.hash(password, 10)
            .then((hasedPassword) => {
                let newUser = new User({
                    email,
                    password: hasedPassword,
                });
                newUser.save()
                    .then(() => {
                        res.json({ message: "User Registered Successfully" });
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.json({ message: "Error Creating Account" })
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

router.post("/login", (req, res) => {
    {
        const { email, password } = req.body;
        User.findOne({ email: email }).then((findings) => {
            if (!findings) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            bcrypt.compare(password, findings.password).then((comparedResults) => {
                if (!comparedResults) {
                    return res.status(400).json({ message: "Invalid Credentials" });
                }
            })
        })
            .catch((error) => {
                console.log(error);
                console.log("Error Finding Account");
            });
    }
});

export default router;  