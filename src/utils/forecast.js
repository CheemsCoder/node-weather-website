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
            
            callback(undefined,"At observation time:"+ body.current.observation_time+" .Weather is "+ body.current.weather_descriptions[0] + ". It is currently " +
            body.current.temperature + " degrees out. The humidity is " + body.current.humidity +"%."
            )
        }
    })

}

module.exports= forecast