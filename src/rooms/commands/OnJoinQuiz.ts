import { Command } from '@colyseus/command'
import { QuizRoomState } from '../schema/QuizRoomState'

export class OnJoinQuiz extends Command<QuizRoomState, { options: any }> {
  execute() {
    console.log(this.state)
  }
}
