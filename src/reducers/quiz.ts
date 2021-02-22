import { AnyAction } from "redux";
import { TYPES } from "../actions/action-types"
import { IquizListItem, Action } from "../models";

export interface IquizInitialState {
    quizListItem : IquizListItem[]
}

const quizInitialState : IquizInitialState = {
    quizListItem: []
}

export const QuizReducer = (state = quizInitialState, action: AnyAction): IquizInitialState => {
    switch(action.type) {
        case TYPES.getQuizListItems :
            return {
                ...state,
                quizListItem : (action as Action<IquizListItem[]>).payload
            }
            break;
        default:
            return state
    }
}