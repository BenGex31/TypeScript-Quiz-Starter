import React, { Component } from "react";
import { Container, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { StyledButtonTrue, StyledButtonFalse } from "./style";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IStore } from "./reducers";
import { getQuizListItem } from "./actions/quiz";
import { IquizListItem } from "./models";
import { getCurrentQuizListItem } from "./selectors/quiz";

interface OwnProps {

}

interface StateProps {
  currentQuizItem? : IquizListItem;
  currentQuizItemIndex : number;
  quizListLength : number,
  score :number
}

interface DispatchProps {
  getQuizListItem : typeof getQuizListItem
}

type Props = OwnProps & StateProps & DispatchProps;

export class App extends Component<Props> {
  componentDidMount() {
    this.props.getQuizListItem(10, "easy")
  }

  private renderHeader = () => {
    return (<Grid container direction="row" justify="space-between" alignItems="flex-start">
      <Box mt={10} fontWeight="fontWeightBold" fontSize={40} >
        <div style={{ color: "#e55fff" }}>Easy</div>
        <div style={{ color: "#2858fb" }} >Quizy</div>
      </Box>
      <Box mt={10} fontSize={20} className="txt"> Score : {this.props.score} / {this.props.quizListLength}</Box>
    </Grid>)
  }

  private renderQuestionInfo = () => {
    const { quizListLength, currentQuizItemIndex, currentQuizItem } = this.props
    return (<Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '40vh' }}>
      <div className="txt question_number">Question N° {currentQuizItemIndex} / {quizListLength} </div>
      <div className="txt question_number"> Category {currentQuizItem!.category} </div>
      <div className="txt" dangerouslySetInnerHTML={{ __html : currentQuizItem!.question}} ></div>
    </Grid>)
  }

  private renderButton = () => {
    return (
      <Grid container direction="row" alignItems="center" justify="space-evenly" >
        <StyledButtonTrue>TRUE</StyledButtonTrue>
        <StyledButtonFalse >FALSE</StyledButtonFalse>
      </Grid>
    )
  }

  render() {
    return (
      <Container maxWidth="lg" >
        {this.renderHeader()}
        {this.props.currentQuizItem && this.renderQuestionInfo()}
        {this.renderButton()}
      </Container >
    );
  }
}

const mapStateToProps = (state: IStore): StateProps => {
  const s = state as IStore;
  return {
    currentQuizItem : getCurrentQuizListItem(s),
    currentQuizItemIndex : s.quiz.currentQuizItemIndex,
    quizListLength : s.quiz.quizListItem.length,
    score : s.quiz.score
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    getQuizListItem : (questionAmount : number, difficulty : "easy" | "medium" | "hard") => dispatch(getQuizListItem(questionAmount, difficulty))

  }
}

export default connect<StateProps,DispatchProps,OwnProps, IStore>(mapStateToProps, mapDispatchToProps)(App)