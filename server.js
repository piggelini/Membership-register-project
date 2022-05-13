import express from 'express';
const port = 3000;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


import { MongoClient, ObjectId } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();

const db = client.db('knitting-club');
const memberships = db.collection('members');

app.get('/', async (req, res) => {
    res.render('homepage');
});



app.get('/members', async (req, res) => {
    const members = await memberships.find({}).toArray();
    res.render('members', { members });
});

app.get('/members/ascend', async (req, res) => {
    const members = await memberships.find({}, { "title": 1, _id: 0 }).sort({ "name": 1 }).toArray();
    res.render('members', { members });
});

app.get('/members/descend', async (req, res) => {
    const members = await memberships.find({}, { "title": 1, _id: 0 }).sort({ "name": -1 }).toArray();
    res.render('members', { members });
});





app.get('/member/:id', async (req, res) => {
    const member = await memberships.findOne({ _id: ObjectId(req.params.id) });
    res.render('member', {
        name: member.name,
        email: member.email,
        number: member.number,
        joined: member.joined,
        level: member.level,
        id: member._id

    });
});

app.get('/member/:id/delete', async (req, res) => {
    await memberships.deleteOne({ _id: ObjectId(req.params.id) });
    res.redirect('/members');
});

app.get('/member/:id/update', async (req, res) => {
    const member = await memberships.findOne({ _id: ObjectId(req.params.id) });
    res.render('update', {
        name: member.name,
        email: member.email,
        number: member.number,
        joined: member.joined,
        level: member.level,
        id: member._id

    });
});

app.post('/member/:id/update/save', (req, res) => {
    memberships.findOneAndUpdate({ _id: ObjectId(req.params.id) }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            joined: req.body.joined,
            level: req.body.level
        }
    });
    res.redirect('/members');

});


app.get('/members/create', async (req, res) => {
    res.render('create');
});

app.post('/members/create', async (req, res) => {
    await memberships.insertOne(req.body);
    res.redirect('/members');
});





//Lyssna - längst ned
app.listen(port, () => console.log(`Listening on ${port}`));