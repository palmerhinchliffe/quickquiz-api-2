import { Schema, MapSchema, type } from '@colyseus/schema'

export class Player extends Schema {
  @type('boolean')
  connected: boolean = false
  
  @type('string')
  name: string = ''

  @type('boolean')
  isLeader: boolean = false

  @type('number')
  score: number = 0
}

export class QuizRoomState extends Schema {
  @type('number')
  playersCount: number = 0
  
  @type('string')
  leaderId: string = ''

  @type({ map: Player })
  players = new MapSchema<Player>()
}
