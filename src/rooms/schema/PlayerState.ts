import { Schema, type } from '@colyseus/schema'

export class PlayerState extends Schema {
  @type('boolean')
  connected: boolean = false
  
  @type('string')
  name: string = ''

  @type('boolean')
  isLeader: boolean = false

  @type('boolean')
  isReady: boolean = false

  @type('boolean')
  hasAnswered: boolean = false

  @type('number')
  score: number = 0
}
