export function fetchBoard() {
    return (dispatch, getState) => {
        const level = getState().level
        console.log(level)
        fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(res => res.json())
            .then( data => {
                
                dispatch({
                    type: 'fetch_board',
                    board: data.board,
                    boolBoard: data.board
                })
            })
            .catch(err => console.log(err))
    }
}

export function setGameLevel(level) {
    return (dispatch,getState) => {
        dispatch({
            type: 'set_level',
            level: level
        })
    }
    
}

export function setUserName(userName) {
    return(dispatch,getState) => {
        console.log(userName)
        dispatch({
            type: 'set_userName',
            userName: userName
        })
    }
}

export function submitAnswer(payload) {
    return(dispatch,getState) => {
        console.log('masuk submit answer==================',payload)
        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'post',
            body: payload,
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded'
            }
          })
            .then( res => res.json())
            .then( data => {
                console.log(data)
                dispatch({
                    type: 'submit_answer',
                    result: data.status
                })
            })
            .catch(err => console.log(err))
    }
}

export function setResult() {
    return(dispatch,getState) => {
        dispatch({
            type: 'set_result',
            result: 'unsolved'
        })
    }
}

export function setBoard(board) {
    return(dispatch,getState) => {
        dispatch({
            type: 'set_board',
            board: board
        })
    }
}