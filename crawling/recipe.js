const express = require('express');
const router = express.Router();

const spawn = require('child_process').spawn;

router.post('/', (req, res)=>{
    let recipe_url = req.body.recipe_url;
    if(recipe_url!=undefined){
        const racipe_info = spawn('python3', ['./crawling/recipe_get.py', recipe_url]);
        try{
            racipe_info.stdout.on('data', (result)=>{
                console.log(recipe_url+"start")
                let result_recipe = result.toString()
                result_recipe = result_recipe.replace(/'/g, '"')
                res.json(JSON.parse(result_recipe))
                console.log(recipe_url+"finish")
            });
        }catch(error){}
    }
    
});

module.exports = router;  