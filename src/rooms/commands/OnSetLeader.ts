import { Command } from '@colyseus/command'
import { QuizRoomState } from '../schema/QuizRoomState'

export class OnSetLeader extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId].isLeader = true
  }
}
