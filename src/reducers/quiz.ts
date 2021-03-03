import { AnyAction } from "redux";
import { TYPES } from "../actions/action-types"
import { IquizListItem, Action } from "../models";

export interface IquizInitialState {
    quizListItem : IquizListItem[],
    currentQuizItemIndex : number,
    score : number
}

const quizInitialState : IquizInitialState = {
    quizListItem: [],
    currentQuizItemIndex : 0,
    score : 0
}

export const QuizReducer = (state = quizInitialState, action: AnyAction): IquizInitialState => {
    switch(action.type) {
        case TYPES.getQuizListItems :
            return {
                ...state,
                quizListItem : (action as Action<IquizListItem[]>).payload
            }
        case TYPES.incrementScore :
            return {
                ...state,
                score: state.score + 1
            }
        case TYPES.setNextQuestion :
            return {
                ...state,
                currentQuizItemIndex: state.currentQuizItemIndex + 1
            }
            case TYPES.restart :
            return {
                ...state,
                currentQuizItemIndex : 0,
                score : 0
            }
        default:
            return state
    }
}