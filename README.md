# Trello Clone - React

A Trello-inspired task management application built with **React**, **Vite**, **Ant Design**, **Tailwind CSS**, **Axios**, and the **Trello REST API**.

The application provides a Trello-like interface for managing boards, lists, cards, checklists, and check items.

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
- Archive a list

### Cards

- Display cards inside lists
- Create a new card
- Rename a card
- Archive a card
- Open a card in a modal

### Checklists

- Display checklists inside cards
- Create a checklist
- Rename a checklist
- Delete a checklist
- Display checklist progress percentage
- Display a horizontal progress bar

### Check Items

- Display check items inside checklists
- Create a check item
- Check and uncheck items
- Display completed items with a line-through
- Rename check items
- Delete check items
- Access item actions through a three-dot menu

### Checklist Progress

Checklist progress is calculated based on completed check items.

For example:

```text
3 completed / 5 total = 60%
```

The progress bar updates when check items are:

- Completed
- Unchecked
- Created
- Deleted

## Tech Stack

- **React** — Frontend UI
- **Vite** — Development and build tool
- **React Router** — Client-side routing
- **Ant Design** — UI components
- **Tailwind CSS** — Styling
- **Axios** — HTTP requests
- **Trello REST API** — Data source
- **JavaScript** — Application logic

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

The application uses React Router for client-side navigation.

### Boards

```text
/boards
```

Displays all available boards.

### Individual Board

```text
/boards/:boardId
```

Displays the selected board along with its lists and cards.

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_TRELLO_API_KEY=your_trello_api_key
VITE_TRELLO_TOKEN=your_trello_token
VITE_TRELLO_API_URL=your_trello_api_url
```

Replace the placeholder values with your Trello credentials and API URL.

Do not commit the `.env` file to Git.

The following entries should be present in `.gitignore`:

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
cd trello-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_TRELLO_API_KEY=your_trello_api_key
VITE_TRELLO_TOKEN=your_trello_token
VITE_TRELLO_API_URL=your_trello_api_url
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

### Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Previews the production build locally.