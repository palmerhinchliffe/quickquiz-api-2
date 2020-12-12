import { Command } from '@colyseus/command'
import { QuizRoomState, Player } from '../schema/QuizRoomState'

export class OnJoinQuiz extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[sessionId] = new Player()
    this.state.players[sessionId].connected = true
    this.state.players[sessionId].name = sessionId
    this.state.playersCount ++
  }
}

export class OnLeaveQuiz extends Command<QuizRoomState, { sessionId: string, consented: boolean }> {
  execute({ sessionId, consented }: any,) {
    this.state.players[sessionId].connected = false

    // Only remove player from room if disconnection consensual
    if (consented) {
      this.state.players[sessionId].delete()
    }
  }
}

export class OnPlayerConnect extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId}: any) {
    this.state.players[sessionId].connected = true
  }
}

export class OnPlayerDisconnect extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId}: any) {
    delete this.state.players[sessionId]
  }
}

export class OnPlayerSetName extends Command<QuizRoomState, { sessionId: string, name: string }> {
  execute({ sessionId, name }: any) {
    this.state.players[sessionId].name = name
  }
}

export class OnSetQuizLeader extends Command<QuizRoomState, { sessionId: string }> {
  execute({ sessionId }: any) {
    this.state.players[this.state.leaderId].isLeader = false // Unset current leader
    this.state.players[sessionId].isLeader = true // Set new leader
  }
}
