const express = require("express");
const { connectToMongoDB } = require("./connect");

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');

const app = express();
const path = require("path");
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Error is Connection"));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/', staticRoute);

app.use("/url", urlRoute);

app.get('/test', async(req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
    

})

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, 
        { $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        }, 
    }
    );
   res.redirect(entry.redirectURL);

});

app.listen(PORT, ()=> console.log(`Server started on PORT ${PORT}`));

