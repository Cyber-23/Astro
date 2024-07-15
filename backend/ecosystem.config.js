module.exports ={
    apps:[
        {
            name:'astro',
            script:'server.js',
            instances:1,
            watch:true,
            autorestart:true,
            max_memory_restart:'1G',
        }
    ]
}