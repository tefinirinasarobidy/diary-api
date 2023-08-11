const db = require('../models')
const fs = require('fs');

const Event = db.Event
const Media = db.Media

const allEvents = async (req,res) => {
    try {
        const events = await Event.findAll({include: [{
            model: db.User,
        },{
            model: Media,
        }
    ]})
        res.status(200).send({data:events})
    } catch (error) {
        res.status(500).send(error)
    }
}
const creatEvent = async (req,res) => {
    try {
        let request = {
            title: req.body.title,
            description: req.body.description,
            date:req.body.date,
            heur: req.body.heur,
            user_id: req.user.userId
        }
        const data = await Event.create(request)
        const file_name = saveImage(req.body.image)
        const media = await Media.create({
            file_name,
            event_id: data.id,
            type:'image'
        })
        console.log('event created',data);
        res.status(200).send({data})
    } catch (error) {
        res.status(500).send(error)
    }
}
const saveImage = (base64Image) => {
  

    // Remove the data:image/png;base64 part if present
    const base64Data = base64Image.split('base64,')[1];

    // Define the path and filename where you want to save the image
    const imagePath = './images/';
    const imageName =  Math.random().toString(36).substring(2) + '.png';

    // Create the 'images' directory if it doesn't exist
    if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath);
    }

    // Write the binary data to the file
    fs.writeFile(imagePath + imageName, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving the image:', err);
        } else {
            console.log('Image saved successfully!');
        }
    });
    return imageName;
}
module.exports = {
    allEvents,
    creatEvent
}