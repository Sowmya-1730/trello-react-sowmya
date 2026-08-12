import axios from 'axios'

const trelloApi = axios.create({
  baseURL: 'https://api.trello.com/1',
})

export const getBoards = () => {
  return trelloApi.get('/members/me/boards', {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
    },
  })
}


export const createBoard = (name) => {
  return trelloApi.post('/boards', null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
    },
  })
}
