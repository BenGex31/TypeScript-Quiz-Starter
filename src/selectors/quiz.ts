import { IquizListItem } from "../models";
import { IStore } from "../reducers";

export function getCurrentQuizListItem(state: IStore): IquizListItem | undefined {
    if (state.quiz.quizListItem.length > 0) {
        return state.quiz.quizListItem[state.quiz.currentQuizItemIndex]
    }
}