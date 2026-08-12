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

export const getBoard = (boardId) => {
  return trelloApi.get(`/boards/${boardId}`, {
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

export const updateBoard = (boardId, name) => {
  return trelloApi.put(`/boards/${boardId}`, null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
    },
  })
}

export const deleteBoard = (boardId) => {
  return trelloApi.delete(`/boards/${boardId}`, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
    },
  })
}


export const getBoardLists = (boardId) => {
  return trelloApi.get(`/boards/${boardId}/lists`, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
    },
  })
}


export const createList = (name, boardId) => {
  return trelloApi.post('/lists', null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
      idBoard: boardId,
    },
  })
}


export const updateList = (listId, name) => {
  return trelloApi.put(`/lists/${listId}`,null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
    },
  })
}

export const updateListClosed = (listId, closed) => {
  return trelloApi.put(`/lists/${listId}/closed`, null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      value: closed,
    },
  })
}



export const getListCards = (listId) => {
  return trelloApi.get(`/lists/${listId}/cards`, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN
    },
  })
}

export const createCard = (name, listId) => {
  return trelloApi.post('/cards', null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
      idList: listId,
    },
  })
}

export const updateCard = (cardId, name) => {
  return trelloApi.put(`/cards/${cardId}`, null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
    },
  })
}

export const updateCardClosed = (cardId, closed) => {
  return trelloApi.put(`/cards/${cardId}/closed`, null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      value: closed,
    },
  })
}



export const getCardChecklists = (cardId) => {
  return trelloApi.get(`/cards/${cardId}/checklists`, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
    },
  })
}

export const createChecklist = (cardId, name) => {
  return trelloApi.post(`/cards/${cardId}/checklists`, null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
    },
  })
}

export const updateChecklist = (checklistId, name) => {
  return trelloApi.put(`/checklists/${checklistId}`, null, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
      name,
    },
  })
}

export const deleteChecklist = (checklistId) => {
  return trelloApi.delete(`/checklists/${checklistId}`, {
    params: {
      key: import.meta.env.VITE_TRELLO_API_KEY,
      token: import.meta.env.VITE_TRELLO_TOKEN,
    },
  })
}