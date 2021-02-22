import axios from "axios"
import { Dispatch } from "redux"
import { IquizList } from "../models"
import { TYPES } from "./action-types"

enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard"
}

export const getQuizListItem = (questionAmount : number, difficulty : Difficulty) => {
    return async (dispatch: Dispatch) => {
        const r = await axios.get<IquizList>(`https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${Difficulty}&type=boolean`)
        dispatch({type: TYPES.getQuizListItems, payload : r.data.results})
    }
}