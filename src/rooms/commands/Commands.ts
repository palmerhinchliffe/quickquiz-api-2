import { Command } from '@colyseus/command'
import { QuizRoomState, Player } from '../schema/QuizRoomState'

/** When a quiz room is created
*
**/
export class OnCreateQuiz extends Command<QuizRoomState, { name: string }> {
  execute({ name }: any) {
    this.state.name = name
  }
}

/** When client joins a quiz room
*
**/
export class OnJoinQuiz extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId] = new Player()
    this.state.players[sessionId].connected = true
    this.state.players[sessionId].name = sessionId
    this.state.playersCount ++
  }
}

/** When client disconnects from room (consensual)
*
**/
export class OnLeaveQuiz extends Command<QuizRoomState, { sessionId: string, consented: boolean }> {
  execute({ sessionId, consented }: any,) {
    this.state.players[sessionId].connected = false

    // Only remove player from room if disconnection consensual
    if (consented) {
      delete this.state.players[sessionId]
    }
  }
}

/** When a player connects (i.e. after they have joined)
*
**/
export class OnPlayerConnect extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId].connected = true
  }
}

/** When a player disconnects from room (following re-connect timeout)
*
**/
export class OnPlayerReconnectTimeout extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    delete this.state.players[sessionId]
  }
}

/** When a player sets their name
*
**/
export class OnPlayerSetName extends Command<QuizRoomState, { sessionId: string, name: string }> {
  execute({ sessionId, name }: any) {
    this.state.players[sessionId].name = name
  }
}

/** When new quiz leader set
*
**/
export class OnSetQuizLeader extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[this.state.leaderId].isLeader = false // Unset current leader
    this.state.players[sessionId].isLeader = true // Set new leader
  }
}
