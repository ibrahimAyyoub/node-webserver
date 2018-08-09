const express = require("express");

//hbs = handlebars, its a great module for template rendering, it has a view too not just text.
const hbs = require("hbs");
const app = express();
const fs = require('fs');

//port will store a port that we need from heroku that will set for us. so we will use the port
const port = process.env.PORT || 3000;




/*THE MOST IMPORTANT THING I LEARNT IS THIS ".get()function
- it handles the requests and when i say request i mean lets say you are at www.ibrahimayyoub.com, and then you tpye next to ".com" the following "/resume" so like this. www.ibrahimayyoub.com/resume, there you're handling the requst that the user did, that is what "GET" function is, what will happen once they type that url, then  u can use either the req or res properties to do thigns such as res.send("Hello Employer you're looking at my resume");
*/


//============================================CODE THAT WAS FOR CONGUGARTION AND FOR SETUP===============================
//RENDERING TEMPLATES
//.set() is a key and value function kind of like hashmaps or dictiaoinreis, so that it tells node js to use this view engine, which is hbs for template rendering, basically we overrided the view engine to use hbs(handle bars)
app.set('view engine', 'hbs');
//notice how the __dirname is there, this will put the name of the directory and then u concate it to find all things we need
//for now its gona read "node-webserver/public"
//this is how u include all javascript and html and css files
//app.use() is the middleware where u pass in a function, and usually we pass an express function with the routes of our directoriers

//app.use() is also how we start a our server, like you know how i've alwyas done frontend stuff, like "ibrahimayyoub.com" and hosted it, but i never had an actual server. well this is howu  do backend + frontend, u use the app.use() which allows u to create the app and reads the index.html and starts the homepage from there, then u would add ur css and other stuff
app.use(express.static(__dirname + "/public"));


//hbs.registerParils the is the function will allow us to make dyamic footers and headers, like when we make a navigation bar or a footer, for our website. we dont want to make a whole new nativgagtino bar for each website, its just too much time and too much copy pasting, so what we do is we regigeter the code into a function call reigsterpartils and it takes the direcotry name where to get these "partials from" like peices of code put together
hbs.registerPartials(__dirname + "/views/partials")

//reigsterhelper takes two arugments, the name of the helper and the second arugment is the name of the function to run.
//also reigsterhelper  is for making things easier to injection, like when we need to use the date for all pages, why would we pass them in the render object, like res.render("aboutPage.hbs",{currentYear: 2018}). for all pages, why not just put it in a helper function where then we can use it in the actual .hbs files, like html
hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
})



//app.use() is how u reigster a middleware, and it takes a function as an arugment
//req is anything that comes from the client,wthere its a http request, or anything else
app.use((req,res,next)=>{
    let currentTime = new Date().toString();
    let log = `${currentTime}: ${req.method} ${req.url}`
    console.log(log);
    
    fs.appendFile("server.log", log + "\n", (err) =>{
       if(err){
           console.log("Cannot append to server.loogg filebn")
       } 
    });
    
    //when i make a middleware i have to call 'next()" method otherwise i wont ever be able to handle the GET requsts from the user or anything else in the program, so always right Next() at the end of the middleware
    next();
});




/*================================ ACTUAL CODE==========================================================================*/

app.get("/about",(req,res) =>{
   
    //Notice now how when the user types in the url after your domain name '/about' instead of us writing a html code or anything we're using the template/html code that we want to show our user. so in this case we use the ".render() function which displays the thing u want to showt he user.Also it automaticlly knows the path this is because we did a views folder.
   //also the second arugment is our object of how we make things dymanic for each page, like giving it the title, content, and much more once we set the things we wanted in the second arugment,now we can use it in the views file for the about.hbs file or any other future files
    res.render("about.hbs", {
        pageTitle: 'About Page',
      
    });
});

app.get("/bad",(req,res)=>{
   
    res.send({
        json: Error("Unable to read data")
    })
});


app.get("/",(req,res) =>{

    res.render("index.hbs",{
        pageTitle: "home page",
        
        message: "Welcome to home page"
    })
});

app.get("/projects",(req,res) =>{
    
   
    res.render("projects.hbs",{
        message:"I love this course"
    })
});



//Notice how after u wrote all that code, the backend still wont run until u start it on app. like this
//now the app will actually run and handle all the requests u did and also notice how there is "3000" as the port, that will make the server host locally, later on u can change it to actual realw-rold

app.listen(port);