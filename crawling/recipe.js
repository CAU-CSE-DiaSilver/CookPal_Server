const express = require('express');
const router = express.Router();

const spawn = require('child_process').spawn;

router.post('/', (req, res)=>{
    let recipe_url = req.body.recipe_url;
    console.log(recipe_url)
    if(recipe_url!=undefined){
        const racipe_info = spawn('python3', ['./crawling/recipe_get.py', recipe_url]);
        console.log("test2")
        racipe_info.stdout.on('data', (result)=>{
            console.log("test1")
            let result_recipe = result.toString()
            console.log(result_recipe)
            result_recipe = result_recipe.replace(/'/g, '"')
            res.json(JSON.parse(result_recipe))
        });
    }
    
});

module.exports = router;  