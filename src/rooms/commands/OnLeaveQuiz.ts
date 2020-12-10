import { Command } from '@colyseus/command'
import { QuizRoomState } from '../schema/QuizRoomState'

export class OnLeaveQuiz extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players.delete(sessionId)
  }
}
