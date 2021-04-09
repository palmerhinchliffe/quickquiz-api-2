import axios from 'axios'
import * as Utils from '../utils/Utils'

export const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://opentdb.com/api_category.php')
      .then(response => {
        resolve(response.data.trivia_categories)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Incorporate getAvailableQuestions into this to return category data in 1 promise?
export const getCategoryById = (id: string) => {
  return new Promise((resolve, reject) => {
    axios.get('https://opentdb.com/api_category.php')
      .then(response => {
        const category = response.data.trivia_categories.filter(entry => {
          return entry.id === parseInt(id)
        })
        resolve(category[0])
      })
      .catch(error => {
        reject(error)
    })
  })
}

export const getAvailableQuestions = (id: number) => {
  return new Promise((resolve, reject) => {
    axios.get('https://opentdb.com/api_count.php?category=' + id)
      .then(response => {
        let data = response.data.category_question_count

        let availableQuestions = {
          easy: data.total_easy_question_count,
          medium: data.total_medium_question_count,
          hard: data.total_hard_question_count,
          total: data.total_question_count
        }

        resolve(availableQuestions)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getQuizQuestions = (amount: number, category: string, difficulty: string) => {
  return new Promise((resolve, reject) => {
    if (difficulty !== undefined) {
      difficulty = '&difficulty=' + difficulty
    } else {
      difficulty = ''
    }

    axios.get('https://opentdb.com/api.php?category=' + category + '&amount=' + amount + difficulty)
      .then(response => {
        if (response.data.response_code == 0) {
          resolve(response.data.results)
        } else {
          reject(new Error(Utils.stringifyResponseCode(response.data.response_code)))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const newSessionToken = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://opentdb.com/api_token.php?command=request')
      .then(response => {
        if (response.data.response_code == 0) {
          resolve(response.data)
        } else {
          reject(Utils.stringifyResponseCode(response.data.response_code))
        }
      })
      .catch(error => {
        reject(error)
    })
  })
}

export const resetSessionToken = (token: string) => {
  return new Promise((resolve, reject) => {
    axios.get('https://opentdb.com/api_token.php?command=reset&token=' + token)
      .then(response => {
        if (response.data.response_code == 0) {
          resolve(response.data)
        } else {
          reject(Utils.stringifyResponseCode(response.data.response_code))
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
