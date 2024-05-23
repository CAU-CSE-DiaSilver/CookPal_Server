
const spawn = require('child_process').spawn;

let search = "감자";
if(search!=undefined){
    console.log(search);
    const racipe_list = spawn('python3', ['./crawling/search_list.py', search]);
    racipe_list.stdout.on('data', (result)=>{
        try{
            let result_list = result.toString()
            result_list = result_list.replace(/'/g, '"')
            console.log(JSON.parse(result_list))
            res.json(JSON.parse(result_list))
        }catch(error){console.log(error)}
    });
}
