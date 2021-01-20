import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


const initiateState = {
    board: [],
    level: '',
    userName: '',
    loading: true,
    result: '',
    boolBoard: []
}

function reducer(state = initiateState, action) {

    switch (action.type) {
        case 'fetch_board':
            return {...state, board:action.board, boolBoard: action.boolBoard}            
        
        case "set_level":
            return {...state, level:action.level}

        case "set_userName":
            return {...state, userName: action.userName}

        case 'submit_answer':
            return {...state, result: action.result}

        case 'set_result': 
            return {...state, result: action.result}

        case 'set_board':
            return {...state,board:action.board}

        default:
            return state
    }
    
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store