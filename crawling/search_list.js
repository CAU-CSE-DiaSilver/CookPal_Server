const express = require('express');
const router = express.Router();

const spawn = require('child_process').spawn;

router.post('/', (req, res)=>{
    let search = req.body.recipe_name;
    console.log(search)
    if(search!=undefined){
        const racipe_list = spawn('python3', ['./crawling/search_list.py', search]);
        racipe_list.stdout.on('data', (result)=>{
            try{
                let result_list = result.toString()
                result_list = result_list.replace(/'/g, '"')
                console.log(result_list)
                res.json(JSON.parse(result_list))
            }catch(error){}
        });
    }
});

module.exports = router;  