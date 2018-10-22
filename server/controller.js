const axios = require('axios');
require('dotenv').config();

module.exports={

    getGifs: (req, res, next) => {
        // console.log("I'm doing something.")
        let {searchParam} = req.params;
        let{API_KEY, BASEURL} = process.env
        // console.log(`${BASEURL}q=${searchParam}&key=${API_KEY}`);
        axios.get(`${BASEURL}q=${searchParam}&key=${API_KEY}&limit=5&contentfilter=medium`)
        .then((response) => {
            //pick the gif format here
            let gif = response.data.results.map((val) => val.media[0].tinygif.url)
            // console.log(gif);
            res.status(200).send(gif)})
        .catch(err => console.log(err))
    },

    addGifs: (req, res, next) => {
        let { gifInfo } = req.body;
        console.log(gifInfo);
        gifTile.push(...gifInfo)
    }

}