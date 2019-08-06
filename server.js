const express = require('express');
const rateLimit = require('express-rate-limit');
const monk = require('monk');
const cors = require('cors');

const db = monk(process.env.MONGO_URI || 'localhost/chitter');
const chits = db.get('chits');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json({type: "application/json"}));

// TODO add cors origin for deployed environment, takes a RegExp or an Array to allow flexibility, ie /example\.com$/
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions));  

app.get('/chits', (req, res, next) => {
    chits
        .find()
        .then(chitData => {
            res.json(chitData);
        }).catch(next);
});

// Prevents users spamming responses
// app.use(rateLimit({
//     windowMs: 15 * 1000, // 15sec
//     max: 1
// }));

function isValidChit(chit) {
    const nameLengthLimit = 50;
    const chitLengthLimit = 140;
    return chit.name && chit.name.toString().trim() !== '' && chit.toString().trim().length <= nameLengthLimit &&
        chit.content && chit.content.toString().trim() !== '' && chit.content.toString().trim().length <= chitLengthLimit;
}


const createChit = (req, res, next) => {
    if (isValidChit(req.body)) {
        const chit = {
            name: req.body.name.toString().trim(),
            content: req.body.content.toString().trim(),
            created: new Date()
        };
        console.log(chit);
        chits
            .insert(chit)
            .then(createdChit => {
                console.log(createdChit);
                res.json(createdChit);
            }).catch(next);
    } else {
        res.status(422);
        res.json({
            message: 'Name and content are both required. Name and content must be less than 50 and 144 characters, respectively.'
        });
    }
};

app.post('/chits', createChit);

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
      message: error.message
    });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
