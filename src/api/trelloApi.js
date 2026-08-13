import axios from 'axios'
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY
const API_TOKEN = import.meta.env.VITE_TRELLO_TOKEN

const trelloApi = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key: API_KEY,
    token: API_TOKEN
  },
})

export const getBoards = () => {
  return trelloApi.get('/members/me/boards')
}

export const getBoard = (boardId) => {
  return trelloApi.get(`/boards/${boardId}`)
}

export const createBoard = (name) => {
  return trelloApi.post('/boards', null, {
    params: {
      name,
    },
  })
}

export const updateBoard = (boardId, name) => {
  return trelloApi.put(`/boards/${boardId}`, null, {
    params: {
      name,
    },
  })
}

export const deleteBoard = (boardId) => {
  return trelloApi.delete(`/boards/${boardId}`)
}


export const getBoardLists = (boardId) => {
  return trelloApi.get(`/boards/${boardId}/lists`)
}


export const createList = (name, boardId) => {
  return trelloApi.post('/lists', null, {
    params: {
      name,
      idBoard: boardId,
    },
  })
}


export const updateList = (listId, name) => {
  return trelloApi.put(`/lists/${listId}`,null, {
    params: {
      name,
    },
  })
}

export const updateListClosed = (listId, closed) => {
  return trelloApi.put(`/lists/${listId}/closed`, null, {
    params: {
      value: closed,
    },
  })
}



export const getListCards = (listId) => {
  return trelloApi.get(`/lists/${listId}/cards`)
}

export const createCard = (name, listId) => {
  return trelloApi.post('/cards', null, {
    params: {
      name,
      idList: listId,
    },
  })
}

export const updateCard = (cardId, name) => {
  return trelloApi.put(`/cards/${cardId}`, null, {
    params: {
      name,
    },
  })
}

export const updateCardClosed = (cardId, closed) => {
  return trelloApi.put(`/cards/${cardId}/closed`, null, {
    params: {
      value: closed,
    },
  })
}



export const getCardChecklists = (cardId) => {
  return trelloApi.get(`/cards/${cardId}/checklists`)
}

export const createChecklist = (cardId, name) => {
  return trelloApi.post(`/cards/${cardId}/checklists`, null, {
    params: {
      name,
    },
  })
}

export const updateChecklist = (checklistId, name) => {
  return trelloApi.put(`/checklists/${checklistId}`, null, {
    params: {
      name,
    },
  })
}

export const deleteChecklist = (checklistId) => {
  return trelloApi.delete(`/checklists/${checklistId}`)
}


export const getChecklistItems = (checklistId) => {
  return trelloApi.get(`/checklists/${checklistId}/checkItems`)
}

export const createChecklistItem = (checklistId, name) => {
  return trelloApi.post(`/checklists/${checklistId}/checkItems`, null, {
    params: {
      name,
    },
  })
}


export const updateChecklistItemState = (cardId, checkItemId, state) => {
  return trelloApi.put(`/cards/${cardId}/checkItem/${checkItemId}`, null, {
    params: {
      state,
    },
  })
}


export const updateChecklistItem = (cardId, checkItemId, name) => {
  return trelloApi.put(`/cards/${cardId}/checkItem/${checkItemId}`, null, {
    params: {
      name,
    },
  })
}


export const deleteChecklistItem = (cardId, checkItemId) => {
  return trelloApi.delete(
    `/cards/${cardId}/checkItem/${checkItemId}`)
}
