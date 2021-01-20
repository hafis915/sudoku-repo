import React, {useEffect, useState} from 'react';
import { StyleSheet, View , Button,Text} from 'react-native';
import Row from '../component/Row'
import {useDispatch,useSelector} from "react-redux"
import {fetchBoard,submitAnswer,setBoard} from '../store/action'

export default function Game(props) {
    const dispatch = useDispatch()
    const boardGame = useSelector((state) => state.board)
    const level = useSelector((state) => state.level)
    const result = useSelector((state) => state.result)


  useEffect(() =>{
    dispatch(fetchBoard())
    // setBoard(boardGame)
    console.log(boardGame, 'ini dari fetch')
    
  }, [])

  useEffect(() =>{
      console.log(result)
      if(result ==='solved') {
          props.navigation.navigate('Finish')
      }
  }, [result])

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');
  
  function submitData() {
    let answer = {
      board: boardGame
    }
    console.log(answer, '============ ini answer')
    answer = encodeParams(answer)
    dispatch(submitAnswer(answer))
  }

  function hintAnswer(params) {
      let answer = {
          board:boardGame
      }
      
      console.log(answer, '=======================')

      fetch('https://sugoku.herokuapp.com/solve',{
          method: 'post',
          body: encodeParams(answer),
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
          }
      })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            console.log('masuk')
            dispatch(setBoard(data.solution))
        })
        .catch(err => console.log(err))
  }

  return (
        <View style={styles.container}>
            {boardGame.length > 0 ? 
            <>
                <Text
                    style = {{
                        marginTop:30,
                        fontSize: 20,
                        fontFamily: 'serif',
                    }}
                    >Sudoku Board</Text>
                    <Text>{level}</Text>
                    <View style={styles.board}>
                      {boardGame.map((el,idx) => {
                        return <Row  
                          key={idx}
                         data = {el}
                        //  board = {boardGame} 
                         indexI = {idx}
                        //  setBoard = {setBoard}
                         ></Row>
                      })}
                    </View>
                    
                    <View style = {styles.button}>
                    <Button
                      onPress = {submitData}
                      title="Submit"
                    />        
                    <Button
                    onPress= {hintAnswer}
                    title="Hint"
                  />
                    </View>
            </>
                :
                <Text>Loading...</Text>
            }
        </View>

    //   <View style={styles.container}>
    //     <Text
    //     style = {{
    //         marginTop:30,
    //         fontSize: 20,
    //         fontFamily: 'serif',
    //     }}
    //     >Sudoku Board</Text>
    //     <Text>{level}</Text>
    //     <View style={styles.board}>
    //       {board.map((el,idx) => {
    //         return <Row  
    //           key={idx}
    //          data = {el}
    //          board = {board} 
    //          indexI = {idx}
    //          setBoard = {setBoard}
    //          ></Row>
    //       })}
    //     </View>
        
    //     <View style = {styles.button}>
    //     <Button
    //       onPress = {submitData}
    //       title="Submit"
    //     />        
    //     <Button
    //     onPress= {hintAnswer}
    //     title="Hint"
    //   />
    //     </View>
    //   </View>
  );




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
  },
  component : {
    width: 50,
    height:50,
  },
  board :{
    width : 400,
    height: 400,
    // backgroundColor:'aqua',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  button : {
      width:200,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
 
});
