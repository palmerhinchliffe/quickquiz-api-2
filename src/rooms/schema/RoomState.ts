import { Schema, MapSchema, type } from '@colyseus/schema'
import { PlayerState } from './PlayerState'
import { QuizState } from './QuizState'

export class Category extends Schema {
  @type('number')
  id: number

  @type('string')
  name: string
}

export class RoomState extends Schema {
  @type('string')
  name: string
  
  @type('number')
  playersCount: number
  
  @type('string')
  leaderId: string

  @type({ map: PlayerState })
  players = new MapSchema<PlayerState>()

  @type(Category)
  category: Category = new Category()

  @type(QuizState)
  quiz: QuizState = new QuizState()
}
