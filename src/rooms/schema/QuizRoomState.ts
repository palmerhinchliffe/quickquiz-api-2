import { Schema, MapSchema, type } from '@colyseus/schema'

export class Player extends Schema {
  @type('string')
  name: string = 'name'
}

export class QuizRoomState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()

  @type('string')
  mySynchronizedProperty: string = 'Hello world'
}
