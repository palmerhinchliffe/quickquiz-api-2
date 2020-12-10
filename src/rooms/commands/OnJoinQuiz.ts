import { Command } from '@colyseus/command'
import { QuizRoomState, Player } from '../schema/QuizRoomState'

export class OnJoinQuiz extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId] = new Player()
    this.state.players[sessionId].name = sessionId
  }
}
