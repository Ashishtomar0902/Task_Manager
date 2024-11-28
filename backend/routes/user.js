const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//SIGN IN APIs
router.post("/sign-in", async (req, res) => {
    try {
        const { username } = req.body
        const { email } = req.body
        const existingUser = await User.findOne({ username: username })
        const existingEmail = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" })
        }
        else if (username.length < 5) {
            return res.status(400).json({ message: "Username should have atleast 5 characters" })
        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({ username: req.body.username, email: req.body.email, password: hashpassword })
        await newUser.save()
        return res.status(200).json({ message: "SignIn successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Internal Server Error" })
    }
})


//LOGIN 
router.post("/log-in",async(req,res)=>{
    const { username,password } = req.body
    const existingUser = await User.findOne({ username: username })
    if (!existingUser) {
        return res.status(400).json({ message: "Username or password is incorrect." })
    }
    bcrypt.compare(password, existingUser.password,(err,data)=>{
        if(data)
        {
            const authClaims = [{name:username},{jti:jwt.sign({},"tcmTM")}]
            const token=jwt.sign({authClaims},"tcmTM",{expiresIn:"2d"});
            res.status(200).json({id:existingUser._id , token:token })
        }
        else{
            return res.status(400).json({ message: "Username or password is incorrect." })
        }
    })
})
module.exports = router