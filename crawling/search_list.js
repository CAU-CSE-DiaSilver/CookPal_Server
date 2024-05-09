const express = require('express');
const router = express.Router();

const spawn = require('child_process').spawn;

router.post('/', async(req, res)=>{
    let search = req.body.recipe_name;
    console.log(search)
    if(search!=undefined){
        console.log("commit_test1")
        const racipe_list = spawn('python3', ['./crawling/search_list.py', search]);
        racipe_list.stdout.on('data', async(result)=>{
            console.log("commit_test2")
            let result_list = result.toString()
            console.log(result_list)
            result_list = result_list.replace(/'/g, '"')
            res.json(JSON.parse(result_list))
        });
    }
});

module.exports = router;  