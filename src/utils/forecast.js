const request = require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7395561109ab0241df690e8cb6dad7ca&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''
    
    request({url, json: true},(error, {body}) => {
        
        if(error) {
            callback('Unable to connect to weather service!')
        }
        else if(body.error) {
            callback('Unable to find location')
        }
        else{
            callback(undefined,{
                temparature: body.current.temperature,
                descriptions: body.current.weather_descriptions
            })
        }
    })

}

module.exports= forecast