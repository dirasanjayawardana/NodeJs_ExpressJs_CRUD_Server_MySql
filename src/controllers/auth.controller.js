const authModel = require("../models/auth.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/env.config");

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            // check email already use or not
            const checkEmail = await authModel.findByEmail({ email });
            if (checkEmail.length > 0) {
                return res
                    .status(400)
                    .json({ message: "Email is already used!" });
            }

            const hashPassword = await argon2.hash(password);
            await authModel.saveUser({ email, password: hashPassword });

            return res.status(201).json({ message: "register success" });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // check email is registered
            const checkEmail = await authModel.findByEmail({ email });
            if (checkEmail.length == 0) {
                return res.status(400).json({ message: "User not found!" });
            }

            // check password is match
            const userData = checkEmail[0];
            const checkPass = await argon2.verify(userData.password, password);
            if (!checkPass) {
                return res.status(401).json({ message: "Bad credentials" });
            }

            // sending response token
            const token = jwt.sign(
                {
                    id: userData.id,
                    email: userData.email,
                    status: "success",
                },
                JWT_SECRET,
                { expiresIn: "6h" }
            );
            return res.status(200).json({
                messages: "login success",
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
};
