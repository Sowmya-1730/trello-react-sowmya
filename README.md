# Trello Clone - React

A Trello-inspired task management application built with **React**, **Vite**, **Ant Design**, **Tailwind CSS**, **Axios**, and the **Trello REST API**.

The application allows users to manage boards, lists, cards, checklists, and check items through a Trello-like interface. Changes are synchronized directly with Trello through its REST API.


## Features

### Boards

- View all available Trello boards
- Create a new board
- Rename a board
- Delete a board
- Open an individual board

### Lists

- Display lists belonging to a board
- Create a new list
- Rename a list
- Archive/unarchive a list

### Cards

- Display cards inside lists
- Create a new card
- Rename a card
- Archive/unarchive a card
- Open a card in a modal

### Checklists

Inside each card:

- Display all checklists
- Create a checklist
- Rename a checklist
- Delete a checklist
- Display checklist progress percentage
- Display a horizontal progress bar

### Check Items

Inside each checklist:

- Display check items
- Create a check item
- Check/uncheck an item
- Show completed items with `line-through`
- Rename a check item
- Delete a check item
- Horizontal three-dot menu for item actions

### Real-Time Checklist Progress

Checklist progress is calculated from the current check-item state.

For example:

```text
3 completed / 5 total = 60%
```
The progress bar automatically updates when:

- A check item is checked
- A check item is unchecked
- A check item is created
- A check item is deleted


## Tech Stack

- React -> Frontend UI
- Vite -> Development and build tool
- React Router -> Client-side routing
- Ant Design -> UI components
- Tailwind CSS -> Styling
- Axios -> HTTP/API requests
- Trello REST API -> Backend data source
- JavaScript -> Application logic

## Application Hierarchy

The application follows the Trello data hierarchy:

```text
Board
  |
  +-- List
       |
       +-- Card
            |
            +-- Checklist
            |    |
            |    +-- Check Item
            |    +-- Check Item
            |    +-- Check Item
            |
            +-- Checklist
                 |
                 +-- Check Item
```


## Routing

React Router is used for client-side navigation.

### Boards

```text
/boards
```

Displays all available boards.

### Individual Board

```text
/boards/:boardId
```

Displays the selected board and its lists and cards.



## Trello API Integration

All Trello API requests are centralized inside:

```text
src/api/trelloApi.js
```

Axios is used to communicate with the Trello REST API.

The Axios instance uses:

```javascript
const trelloApi = axios.create({
  baseURL: 'https://api.trello.com/1',
  params: {
    key: API_KEY,
    token: API_TOKEN,
  },
})
```

Authentication credentials are supplied through environment variables.


## Environment Variables

Create a `.env` file in the project root:

```env
VITE_TRELLO_API_KEY=your_trello_api_key
VITE_TRELLO_TOKEN=your_trello_token
```

Do not commit the `.env` file to Git.

Add the following to `.gitignore`:

```text
.env
.env.local
```


## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd trello-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Trello credentials

Create a `.env` file:

```env
VITE_TRELLO_API_KEY=your_trello_api_key
VITE_TRELLO_TOKEN=your_trello_token
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.


## API Operations

The application uses the following major Trello API operations.

### Boards

Get boards:

```text
GET /members/me/boards
```

Create board:

```text
POST /boards
```

Update board:

```text
PUT /boards/{boardId}
```

Delete board:

```text
DELETE /boards/{boardId}
```

### Lists

Get lists:

```text
GET /boards/{boardId}/lists
```

Create list:

```text
POST /lists
```

Update list:

```text
PUT /lists/{listId}
```

Archive/unarchive list:

```text
PUT /lists/{listId}/closed
```

### Cards

Get cards:

```text
GET /lists/{listId}/cards
```

Create card:

```text
POST /cards
```

Update card:

```text
PUT /cards/{cardId}
```

Archive/unarchive card:

```text
PUT /cards/{cardId}/closed
```

### Checklists

Get checklists:

```text
GET /cards/{cardId}/checklists
```

Create checklist:

```text
POST /cards/{cardId}/checklists
```

Rename checklist:

```text
PUT /checklists/{checklistId}
```

Delete checklist:

```text
DELETE /checklists/{checklistId}
```

### Check Items

Get check items:

```text
GET /checklists/{checklistId}/checkItems
```

Create check item:

```text
POST /checklists/{checklistId}/checkItems
```

Update check item:

```text
PUT /cards/{cardId}/checkItem/{checkItemId}
```

The update operation is used for:

- Renaming a check item
- Checking a check item
- Unchecking a check item

Delete check item:

```text
DELETE /cards/{cardId}/checkItem/{checkItemId}
```

---

## Card Modal

Clicking a card opens a modal containing the card's checklists and check items.

The structure inside the modal is:

```text
Card
 |
 +-- Checklist
 |    |
 |    +-- Progress percentage
 |    +-- Progress bar
 |    +-- Check Item
 |    +-- Check Item
 |    +-- Add an item
 |
 +-- Checklist
 |    |
 |    +-- ...
 |
 +-- Add a checklist
```


## API Layer

API calls are separated from UI components.

All Trello requests are defined in:

```text
src/api/trelloApi.js
```

For example:

```javascript
export const createChecklistItem = (checklistId, name) => {
  return trelloApi.post(`/checklists/${checklistId}/checkItems`, null, {
    params: {
      name,
    },
  })
}
```

The React components call these functions instead of making Axios requests directly.

This separation makes the application easier to maintain.


## Error Handling

API operations are handled using `try/catch`.

Example:

```javascript
try {
  await createChecklistItem(checklistId, name)
} catch (error) {
  console.error('Error creating check item:', error)
}
```

This prevents API failures from crashing the application and provides useful debugging information during development.

## UI Components

### Ant Design

Ant Design is used for interactive UI components including:

- Modal
- Button
- Input
- Dropdown

### Tailwind CSS

Tailwind CSS is used for:

- Layout
- Spacing
- Borders
- Typography
- Progress bars
- Conditional styling
- Component positioning
