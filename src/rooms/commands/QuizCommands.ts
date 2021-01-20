import { Command } from '@colyseus/command'
import { RoomState } from '../schema/RoomState'
import * as openTrivia from '../../services/OpenTrivia'

/** When category is set
*
**/
export class OnSetCategory extends Command<RoomState, { categoryId: number }> {
  execute({ categoryId }: any) {
    const numberOfQuestions = this.state.quiz.options.numberOfQuestions
    const difficulty = this.state.quiz.options.difficulty

    // Fetch questions for category using default options
    openTrivia.getQuizQuestions(numberOfQuestions, categoryId, difficulty)
      .then(questions => this.state.quiz.questions = questions)
      .catch(error => console.log(error))
  }
}
