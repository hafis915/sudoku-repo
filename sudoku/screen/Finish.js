import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Text,View,StyleSheet} from 'react-native'
import { setResult } from '../store/action'

export default function Finish(params) {
    const dispatch = useDispatch()
    const userName = useSelector((state) => state.userName)

    useEffect(() => {
        dispatch(setResult())
    }, [])


    return(
        <View style= {styles.finish}>
            <Text
            style= {{
                fontSize: 40,
                textAlign:'center'
            }}
            >Congratulation {userName} You've finished the game</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    finish : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})