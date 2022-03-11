const express = require('express');
const booksController = require("../controllers/books-controller");
const router = express.Router();
const User = require('../model/userSchema')
const Otp = require('../model/otp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//router.get('/', booksController.getAllBooks);
router.post('/addbook',booksController.addBook);
router.get('/:id', booksController.getById);
router.put('/:id',booksController.updateBook);
router.delete('/:id',booksController.deleteBook);
router.post('/addToCart/:id',booksController.addtoCart);
router.get('/showCart/:id',booksController.showCart);
router.delete('/deleteCart/:id',booksController.deleteCart);

router.post('/register', async (req, res) => {

    try {
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) {
            return res.status(400).json("Email already exist")
        }

        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hash
        })
        
         const data = await user.save()
         res.json(user)
      
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
  
})


router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email });
        const role = userData.role;
        const fullName = userData.fullName;
        if (!userData) {
            return res.status(400).json("Email not exist");
        }
        const validPsw = await bcrypt.compare(req.body.password, userData.password);
        if (!validPsw) {
            return res.status(400).json("Password not valid")
        }
        
        //create token for user
        const userToken = jwt.sign({ email: userData.email }, 'success')
        res.header('user', userToken).json({
            "token":userToken,
            "role":role,
            "fullName":fullName,
            "email": userData.email,
            "_id": userData.id
        })
        console.log(role)
    } catch (err) {
        console.log(400).json(err)
    }
})
const validUser = (req, res, next) => {
    const token = req.header('user');
    req.token = token;
    next();
}

router.post('/email-send', async(req,res)=>{
    
    const data = await User.findOne({email: req.body.email});
  
    console.log(data)
    const responseType = {};
    if(data){
        const otpCode = Math.floor((Math.random()*10000)+1);
        const otpData = new Otp({
            email: req.body.email,
            code:otpCode,
            expireIn: new Date().getTime() + 300*1000
        })
        const otpResponse = await otpData.save();
        console.log(otpResponse)
        responseType.statusText = "Success"
        responseType.message = "Check Your Email";
    }else{
        responseType.statusText = "Error"
        responseType.message = "Invalid Email";
    }
    res.status(200).json(responseType)
})

router.post('/change-password', async(req,res)=>{
    const data = await Otp.findOne({code:req.body.otpCode});
    console.log(req.body.otpCode)
    const responseType = {}
    if(data){
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if(diff < 0){
            responseType.message = "Token Expire";
            responseType.statusText = "error"
        }else{
            const user = await User.findOne({email:req.body.email})
            const hash = await bcrypt.hash(req.body.password, 10)
            user.password = hash;
            user.save();
            responseType.message = "Password changed Successfully";
            responseType.statusText = "Success";
            
        }
    }else{
        responseType.message = "Incorrect Otp"
        responseType.statusText = "error"
    }
    res.status(200).json(responseType);
})

module.exports = router;