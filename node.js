const http = require("http");
const fs = require("fs");
const requests = require("requests");
const { json } = require("body-parser");


const homepage = fs.readFileSync("home.html", "utf-8", () => {
    console.log("error in home page reading ");
})

const replacer = (tempdata, orgdata) => {
    let temp = tempdata.replace("{%temp%}", orgdata);
    return temp;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=faridabad&appid=5e60eb9582ef2348170c1ddad6afa800")
            .on("data", (chunks) => {
                console.log(typeof chunks);
                const obj_data = JSON.parse(chunks);
                
                console.log(obj_data.main.temp);
                const feh= (obj_data.main.temp) - 273.15;
                const fehrenn = feh.toFixed(2);
                const currenttemp = replacer(homepage,fehrenn);
                
                    
               res.end(currenttemp);
    
              
            
            })
          
            
    }
})
server.listen(2122, "127.0.0.1", () => {
    console.log("server started");
})