# Freshlist

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Freshlist** is a lightweight grocery list manager that runs entirely in the browser — no accounts, no server, no friction. You open it, you manage your list, and your data stays on your device.

The core workflow is straightforward: type the name of an item into the input field and hit the add button to append it to your list. Every item on the list comes with two action buttons — one to edit its text and one to delete it entirely. When you click edit, the item's current text is loaded back into the input field so you can modify it in place; confirming the change updates the item without creating a duplicate. If you want to wipe the entire list at once, a single "Clear All Items" button removes everything in one click.

Persistence is handled automatically through the browser's localStorage API. Every time you add, edit, or delete an item, the updated list is serialized and saved to localStorage — so if you refresh the page, close the tab, or come back later, your list is exactly where you left it. Clearing all items also clears the stored data.

The application is built as a vanilla TypeScript SPA using Vite and styled with Tailwind CSS. State is managed through a custom observer-based store that re-renders only the parts of the DOM that actually changed, keeping the UI in sync with the underlying data without relying on any framework.

## Technologies used

1. Typescript
2. TailwindCSS
3. CSS3
4. HTML5
5. Vite

## Libraries used

#### Dependencies

```
"uuid": "^14.0.0"
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/uuid": "^11.0.0"
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.5"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/freshlist`](https://www.diegolibonati.com.ar/#/project/freshlist)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
