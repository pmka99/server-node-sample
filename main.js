const http=require('http');
const qs=require('querystring');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    if(req.url=='/' && req.method=="GET"){
        res.write(`
            <html>
                <body>
                    <form action='' method="POST">
                        <input name='tt' type='text'></input>
                        <input type='submit'></input>
                    </form>
                </body>
            </html>`
        )
        res.end();
    }
    else if(req.url=='/' && req.method=='POST'){
        let body='';
        req.on('data',(data)=>{
            body=body+data;
        })
        req.on('end',()=>{
            let data=qs.parse(body).tt
            console.log(data)
            fs.writeFileSync('txt.text',data)
            res.writeHead(302,{'location':'/'})
            res.write(data)
            res.end();
        })
    }
})


server.listen(3000,'127.0.0.1',()=>{
    console.log('node is running .......')
})
