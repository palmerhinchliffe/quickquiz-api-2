import { Command } from '@colyseus/command'
import { QuizRoomState } from '../schema/QuizRoomState'

export class OnPlayerSetName extends Command<QuizRoomState, { sessionId: string, name: string }> {
  execute({ sessionId, name }: any) {
    this.state.players[sessionId].name = name
  }
}
