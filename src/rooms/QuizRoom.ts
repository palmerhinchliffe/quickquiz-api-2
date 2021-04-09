import { Room, Client } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { RoomState } from './schema/RoomState'
import * as PlayerCommands from './commands/PlayerCommands'
import * as QuizCommands from './commands/QuizCommands'

export class QuizRoom extends Room<RoomState> {
  dispatcher = new Dispatcher(this)

  onCreate({ options, client }: any) {
    this.setState(new RoomState())

    // Set quiz metadata using options from client (Name, ...)
    // this.setMetadata({ name: options.name })

    // Set quiz questions by retrieving questions using category ID, with default options
    this.dispatcher.dispatch(new QuizCommands.OnSetCategory(), { sessionId: client.sessionId, categoryId: options.category })

    // Broadcast chat messages
    this.onMessage('chat', (client, message) => {
      this.broadcast('chat', `${this.state.players[client.sessionId].name}: ${message}`)
    })

    // On changing category
    this.onMessage('setCategory', (client, message) => {
      this.dispatcher.dispatch(new QuizCommands.OnSetCategory(), { sessionId: client.sessionId, categoryId: options.category })
      this.broadcast('chat', `${this.state.players[client.sessionId].name}: ${message}`)
    })

    // On changing ready status
    this.onMessage('setPlayerReady', (client, message) => {
      this.dispatcher.dispatch(new PlayerCommands.OnSetReadyStatus(), { sessionId: client.sessionId, readyStatus: message })
    })

    // On player setting name
    this.onMessage('setPlayerName', (client, message) => {
      this.dispatcher.dispatch(new PlayerCommands.OnSetName(), {
        sessionId: client.sessionId,
        name: message,
      })

      // Broadcast name change to room chat
      this.broadcast('chat', `${client.sessionId} changed their name to ${message}`)
    })
  }

  onJoin(client: any) {
    this.dispatcher.dispatch(new PlayerCommands.OnJoin(), { sessionId: client.sessionId })

    // Broadcast joining to room chat
    this.broadcast('chat', `${client.sessionId} joined`)
  }

  async onLeave(client: Client, consented: boolean) {
    // Broadcast leaving to room chat
    this.broadcast('chat', `${this.state.players[client.sessionId].name} disconnected`)

    this.dispatcher.dispatch(new PlayerCommands.OnLeave(), {
      sessionId: client.sessionId,
      consented,
    })

    // Player has lost connection
    if (!consented) {
      try {
        this.allowReconnection(client, 60)

        // Regains connection
        this.dispatcher.dispatch(new PlayerCommands.OnConnect(), { sessionId: client.sessionId })
        this.broadcast('chat', `${this.state.players[client.sessionId].name} has returned!`)
      } catch {
        // ...or times out
        this.dispatcher.dispatch(new PlayerCommands.OnReconnectTimeout(), { sessionId: client.sessionId })
      }
    }

  }

  onDispose() {
  }

}
