import React, {useState} from "react"
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet, TextInput, View ,Text} from 'react-native';
import {setBoard} from '../store/action'



export default function Row( { data, indexI} ) {
    const board = useSelector(state => state.board)
    const boolBoard = useSelector(state => state.boolBoard)
    const dispatch = useDispatch()
    function submitData (value, idxJ) {
        console.log(value, indexI, idxJ)
        let newBoard = JSON.parse(JSON.stringify(board))
        newBoard[indexI][idxJ] = +value
        dispatch(setBoard(newBoard))
    }

    return (
        <View style= {styles.row}>
            {data.map((el,idxJ) => {
                    return <TextInput 
                    key={idxJ} 
                    style= {styles.box}
                    value = {el === 0 ? '' : String(el)}
                    editable= {boolBoard[indexI][idxJ] === 0 ? true:false}
                    textAlign= 'center'
                    onChangeText= {(value) => submitData(value,idxJ)}
                    ></TextInput>
            

            })}
      </View >
    )
}

const styles = StyleSheet.create({
    row: {
        // backgroundColor: 'deeppink',
        flexDirection:'row',
        borderColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center'
      },
      box: {
        width:35,
        height:35,
        textAlign:'center',
        borderWidth:1,
        fontSize:30
      }
})