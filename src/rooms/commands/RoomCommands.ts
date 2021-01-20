import { Command } from '@colyseus/command'
import { RoomState } from '../schema/RoomState'

/** When new room leader set
*
**/
export class OnSetLeader extends Command<RoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[this.state.leaderId].isLeader = false // Unset current leader
    this.state.players[sessionId].isLeader = true // Set new leader
  }
}
