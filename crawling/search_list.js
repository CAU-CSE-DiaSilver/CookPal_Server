const express = require('express');
const router = express.Router();

const spawn = require('child_process').spawn;

router.post('/', (req, res)=>{
    let search = req.body.recipe_name;
    if(search!=undefined){
        console.log(search);
        const racipe_list = spawn('python3', ['./crawling/search_list.py', search]);
        racipe_list.stdout.on('data', (result)=>{
            try{
                let result_list = result.toString()
                result_list = result_list.replace(/'/g, '"')
                res.json(JSON.parse(result_list))
            }catch(error){console.log(error)}
        });
    }
});

module.exports = router;  