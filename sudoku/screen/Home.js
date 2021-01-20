import React, { useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import {setUserName,setGameLevel} from '../store/action'
import {Picker} from '@react-native-picker/picker'

export default function Home (props) {
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [level , setLevel] = useState('')

    

    function goToGamePage(){
        dispatch(setGameLevel(level))
        dispatch(setUserName(name))
        props.navigation.navigate('Game')
    }

    return(
        <View style= {styles.container}>

            <View style = {styles.welcome}>
                <Text style= {styles.welcomeText}> Welcome To Sudoku Board Game</Text>
                <Text > Please Insert Your name</Text>
                <TextInput
                value= {name}
                onChangeText = {(value) => setName(value)}
                style = {{
                    borderWidth : 1,
                    borderColor: 'black',
                    width: 200,
                    height: 50,
                    textAlign:'center'
                }}
                ></TextInput>
                
                
                <Picker
                    style={{height: 50, width: 200}}
                    onValueChange={(itemValue, itemIndex) =>
                        setLevel(itemValue)
                    }
                    selectedValue= {level}
                    >
                    <Picker.Item label="Choose Your Level" value="" />
                    <Picker.Item label="Hard" value="hard" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Random" value="random" />
                </Picker>

            </View>
            <Button
                onPress= {goToGamePage}
                title = "Ready To Play"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    welcome : {
        // backgroundColor: 'aqua',
        height: 250,
        width: 250,
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign:'center'
    },
    welcomeText : {
        fontSize: 25,
        fontFamily: 'serif',
        textAlign:'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph: {
        fontSize: 15,
      },
      checkbox: {
        margin: 8,
      },
})