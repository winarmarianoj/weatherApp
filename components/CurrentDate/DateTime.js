import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment-timezone';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemTitle}>{title}</Text>
            <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current, lat, lon, timezone}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])
    
    return (
        <View style={styles.container}>  
           <View>                
               <View>
                   <Text style={styles.heading}>{time}</Text>
               </View>
               <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View>
               <View style={styles.weatherItemContainer}>
                    <WeatherItem title="Humidity" value={current? current.humidity : ""} unit="%"/>
                    <WeatherItem title="Pressure" value={current? current.pressure : ""} unit="hPA"/>
                    <WeatherItem title="Sunrise" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem title="Sunset" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} unit="pm"/>                    
               </View>
               <View style={styles.rightAlign}>
                    <Text style={styles.timezone}>{timezone}</Text>
                    <Text style={styles.latlong}>{lat}N {lon}E</Text>
                </View>
           </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1.5,
        justifyContent:'space-between',
        padding: 20
    },
    heading: {
        fontSize: 45,
        color:'white',
        fontWeight: '100'
    },
    subheading: {
        fontSize: 25,
        color: '#eee',
        fontWeight: '300'
    },
    rightAlign: {
        textAlign:'center',
        marginTop: 20
    },
    timezone: {
        fontSize: 16,
        color:'white',
        fontWeight: '700'
    },
    latlong:{
        fontSize: 16,
        color:'white',
        fontWeight: '700'
    },
    weatherItemContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 25,
        marginTop: 10,
        width: 250,
        justifyContent: 'center',
        marginleft: 30
    }, 
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 160
    },
    weatherItemTitle: {
        color:'#eee',
        fontSize: 14,
        fontWeight: '100',
        marginleft: 10
    },
    textApp: {
        color: 'black',
        fontSize: 30,
        marginLeft: 15,
    },
})

export default DateTime
