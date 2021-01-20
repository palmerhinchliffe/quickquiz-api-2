import { Schema, ArraySchema, type } from '@colyseus/schema'

export class Options extends Schema {
  @type('number')
  numberOfQuestions: number = 10

  @type('string')
  difficulty: string

  @type('boolean')
  isTimer: boolean = false

  @type('number')
  timerLength: number = 0
}

export class Questions extends Schema {
  @type('string')
  question: string
}

export class QuizState extends Schema {
  @type(Options)
  options: Options = new Options()

  @type([ Questions ])
  questions = new ArraySchema<Questions>()

  @type('number')
  questionCount: number
}
