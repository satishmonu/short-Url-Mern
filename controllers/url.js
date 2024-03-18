 const shortid  = require("shortid");
 const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res){
    
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "Url is Required"});
    
    const shortID = shortid();
      
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitorHistory: [],
    });

  return res.render('home', {
      id: shortID,
  })
   

}

async function handleGetInfoShortURL(req, res){
    
    const shortId = req.params.shortId;
    
    const result = await URL.findOne({ shortId});

    return res.status(200)
    .json(
        {totalclicks: result.vistHistorty.length, 
        analytics : result.vistHistorty });



}

module.exports = {
    handleGenerateNewShortURL,
    handleGetInfoShortURL
}