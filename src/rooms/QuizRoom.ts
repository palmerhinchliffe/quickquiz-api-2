import { Room, Client } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { QuizRoomState } from './schema/QuizRoomState'
import * as Commands from './commands/Commands'

export class QuizRoom extends Room<QuizRoomState> {
  dispatcher = new Dispatcher(this)

  onCreate(options: any) {
    this.setState(new QuizRoomState())

    // Broadcast chat messages
    this.onMessage('message', (client, message) => {
      this.broadcast('messages', `${this.state.players[client.sessionId].name}: ${message}`)
    })

    // On player setting name
    this.onMessage('setPlayerName', (client, message) => {
      this.dispatcher.dispatch(new Commands.OnPlayerSetName(), {
        sessionId: client.sessionId,
        name: message,
      })

      // Broadcast name change to room chat
      this.broadcast('messages', `${client.sessionId} changed their name to ${message}`)
    })
  }

  onJoin(client: any) {
    this.dispatcher.dispatch(new Commands.OnJoinQuiz(), { sessionId: client.sessionId })

    // Broadcast joining to room chat
    this.broadcast('messages', `${client.sessionId} joined`)
  }

  async onLeave(client: Client, consented: boolean) {
    // Broadcast leaving to room chat
    this.broadcast('messages', `${this.state.players[client.sessionId].name} disconnected`)

    this.dispatcher.dispatch(new Commands.OnLeaveQuiz(), {
      sessionId: client.sessionId,
      consented,
    })

    // Player has lost connection
    if (!consented) {
      try {
        await this.allowReconnection(client, 60)

        // Regains connection
        this.dispatcher.dispatch(new Commands.OnPlayerConnect(), { sessionId: client.sessionId })
        this.broadcast('messages', `${this.state.players[client.sessionId].name} has returned!`)
      } catch {
        // ...or times out
        this.dispatcher.dispatch(new Commands.OnPlayerReconnectTimeout(), { sessionId: client.sessionId })
      }
    }

  }

  onDispose() {
  }

}
