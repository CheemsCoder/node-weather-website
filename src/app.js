const path=require('path')
const express=require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000

// Define paths for Express Config

const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('views',viewspath)
app.set('view engine','hbs')
hbs.registerPartials(partialpath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Vikramjit Dutta'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Vikramjit Dutta'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Section',
        example: 'Welcome to the help section',
        name: 'Vikramjit Dutta'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error,forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
    
    
})
app.get('/products',(req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Vikramjit Dutta',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Vikramjit Dutta',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})