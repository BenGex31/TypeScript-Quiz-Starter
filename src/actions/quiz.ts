import axios from "axios"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { IquizList } from "../models"
import { TYPES } from "./action-types"

enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard"
}

export const getQuizListItem = (questionAmount : number, difficulty : "easy" | "medium" | "hard") => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const r = await axios.get<IquizList>(`https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${difficulty}&type=boolean`)
        dispatch({type: TYPES.getQuizListItems, payload : r.data.results})
    }
}