const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const nodemailer = require('nodemailer');
// const User = require('../models/user');
require('dotenv').config();
const User = db.User




const register = async (req, res) => { 
    try {
        const saltRounds = 10;
        let info = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password:await bcrypt.hash(req.body.password, saltRounds),
            code_validation: Math.floor(100000 + Math.random() * 900000)
        }
        console.log('drerere',User)
        const customer = await User.create(info)
        // sendMail(req.body.email,info.code_validation)
        res.status(200).send(customer)
        // console.log(customer)
    } catch (error) {
        res.status(500).send({message:error})
    }
}
const login = async (req,res) => {
    try {
        const customer = await User.findOne({ where: { email: req.body.email }})
        if (customer) {
            bcrypt.compare(req.body.password, customer.password, (err, isMatch) => {
                if (err) {
                    res.status(500).send({message:err})
                } else if (isMatch) {
                  const token = generateToken(customer.id)
                  
                  res.send({token:token,customer})
                } else {
                    res.send({message:'mot de pass incorrect'})
                }
              });
        } else {
            res.send({message:'user not exist'})
        }
    } catch (error) {
        res.status(500).send({error})
    }
}
function generateToken(userId) {
    // Replace 'YOUR_SECRET_KEY' with your own secret key
    const secretKey = process.env.JWT_KEY;
  
    // Specify the payload
    const payload = {
      userId: userId,
    };
  
    // Options for the token (optional)
    const options = {
      expiresIn: '1d', // Token will expire in 1 hour
    };
  
    // Generate the token
    const token = jwt.sign(payload, secretKey, options);
    return token;
  }

const sendMail= (email,code) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fanomezantsoatefinirina@gmail.com',
            pass: 'fslpgmfhxtmqcxje'
        }
    });
    
    const mailOptions = {
        from: 'fanomezantsoatefinirina@gmail.com',
        to: email,
        subject: 'Hello',
        text: 'code de validation compte',
        html: `<b>votre code est : ${code} </b>`
    };

    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });
}



module.exports = {
    register,
    login
}