import { Command } from '@colyseus/command'
import { QuizRoomState } from '../schema/QuizRoomState'

export class OnCreateQuiz extends Command<QuizRoomState, { options: any }> {
  execute() {
    console.log(this.state)
  }
}
