import { Room, Client } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { QuizRoomState } from './schema/QuizRoomState'

import { OnCreateQuiz } from './commands/OnCreateQuiz'
// import { OnJoinQuiz } from './commands/OnJoinQuiz'

export class QuizRoom extends Room {
  dispatcher = new Dispatcher(this)

  onCreate (options: any) {
    this.setState(new QuizRoomState())

    console.log(options)
    
    // This is where I can access options from client e.g. options.category, options.mode
    // use those to make API call to opentrivia DB for questions and add to state?
    this.dispatcher.dispatch(new OnCreateQuiz(), {
      options: options
    })

    this.onMessage('message', (client, message) => {
      console.log('ChatRoom received message from', client.sessionId, ':', message)

      // Broadcoast message to all
      this.broadcast('messages', `${client.sessionId}: ${message}`)
    })
  }

  onJoin (client: Client, options: any) {
    this.broadcast('messages', `(Server): ${client.sessionId} joined`)

    /*
    this.dispatcher.dispatch(new OnJoinQuiz(), {
      options: options
    })
    */
  }

  async onLeave (client: Client, consented: boolean) {
    // flag client as inactive for other users
    this.state.players[client.sessionId].connected = false

    try {
      if (consented) {
        throw new Error('consented leave')
      }

      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 20)

      // client returned! let's re-activate it.
      this.state.players[client.sessionId].connected = true

    } catch (e) {
      // 20 seconds expired. let's remove the client.
      delete this.state.players[client.sessionId]
    }
  }

  onDispose() {
  }

}
