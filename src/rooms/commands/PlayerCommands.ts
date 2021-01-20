import { Command } from '@colyseus/command'
import { RoomState } from '../schema/RoomState'
import { PlayerState } from '../schema/PlayerState'

/** When player joins a quiz room
*
**/
export class OnJoin extends Command<RoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId] = new PlayerState()
    this.state.players[sessionId].connected = true
    this.state.players[sessionId].name = sessionId
    this.state.playersCount ++
  }
}

/** When player disconnects from room (consensual)
*
**/
export class OnLeave extends Command<RoomState, { sessionId: string, consented: boolean }> {
  execute({ sessionId, consented }: any,) {
    this.state.players[sessionId].connected = false

    // Only remove player from room if disconnection consensual
    if (consented) {
      delete this.state.players[sessionId]
    }
  }
}

/** When a player (re)connects
*
**/
export class OnConnect extends Command<RoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId].connected = true
  }
}

/** When a player disconnects from the room (following re-connect timeout)
*
**/
export class OnReconnectTimeout extends Command<RoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    delete this.state.players[sessionId]
  }
}

/** When a player sets their name
*
**/
export class OnSetName extends Command<RoomState, { sessionId: string, name: string }> {
  execute({ sessionId, name }: any) {
    this.state.players[sessionId].name = name
  }
}

/** When a player sets their ready status
*
**/
export class OnSetReadyStatus extends Command<RoomState, { sessionId: string, readyStatus: string }> {
  execute({ sessionId, readyStatus }: any) {
    this.state.players[sessionId].isReady = readyStatus
  }
}

/** When a player answers the question
*
**/
export class OnAnswerQuestion extends Command<RoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId].hasAnswered = true
  }
}
