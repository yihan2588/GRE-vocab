
# GRE Vocabulary Mastery

GRE Vocabulary Mastery is a web application designed to help users learn and memorize common GRE (Graduate Record Examinations) vocabulary words. It leverages the Ebbinghaus Forgetting Curve for spaced repetition learning and integrates with the Google Gemini API to provide dynamic word details and interactive review sessions.

## Key Features

*   **Dashboard Overview:** Displays statistics on words to learn, words due for review, and mastered words.
*   **Learn Mode:** Introduces new words in manageable batches (default 30 words) with definitions and example sentences fetched via Gemini API.
*   **Review Mode (Spaced Repetition):**
    *   Prompts users to review words at optimal intervals based on the Ebbinghaus Forgetting Curve.
    *   **Gemini-Powered Evaluation:** Users explain the word or use it in a sentence. Gemini API evaluates the user's input and provides feedback.
    *   **Manual Fallback:** If the Gemini API key is not configured, users can manually reveal the word's definition and mark their recall status (correct/incorrect).
    *   **Practice Specific Words:** Users can choose to practice individual words from the "All Words" view.
*   **Explore with Gemini:** Users can input any English word to get its definition, example sentence, synonyms, and antonyms fetched dynamically using the Gemini API.
*   **All Words View:**
    *   Lists all vocabulary words in the application.
    *   Displays the learning status (New, Learning, Reviewing, Mastered) and next review date for each word.
    *   Allows users to search and sort words.
    *   Provides an option to view details (definition, example) for each word.
    *   Allows resetting the learning progress for individual words.
*   **Dynamic Word Details:** Definitions and example sentences for learning and review are primarily fetched using the Gemini API.
*   **Progress Persistence:** User progress (learned words, review schedules, cached word details) is saved in the browser's `localStorage`.
*   **Responsive Design:** The application is designed to work on various screen sizes.
*   **Modern Tech Stack:** Built with React, TypeScript, and Tailwind CSS.

## Tech Stack

*   **Frontend:**
    *   React 19
    *   TypeScript
    *   Tailwind CSS (for styling)
*   **API:**
    *   Google Gemini API (`@google/genai` SDK) for:
        *   Fetching word definitions, example sentences, synonyms, and antonyms (Model: `gemini-2.5-flash-preview-04-17`).
        *   Evaluating user-provided explanations of words.
*   **Module Management:** ES Modules (ESM) via `importmap` in `index.html`.
*   **State Management:** React Context API (`VocabularyContext`).

## Setup and Running the App

The application is designed to run directly in a web browser without a complex build process.

1.  **Prerequisites:**
    *   A modern web browser (e.g., Chrome, Firefox, Edge, Safari).
    *   An internet connection (especially for Gemini API features).

2.  **Gemini API Key:**
    *   This application **requires** a Google Gemini API key to enable features like fetching word details and evaluating user explanations.
    *   The API key **must** be available as an environment variable named `API_KEY`.
    *   **How to set it (for local development/testing):**
        *   Since this is a client-side application, directly setting `process.env.API_KEY` in the browser's JavaScript environment is typical for frameworks that have a build step. For this simple setup, you would typically use a `.env` file if you had a local development server that processes it.
        *   **For direct browser execution without a server that injects environment variables:** You would need to manually replace `process.env.API_KEY` in the code (e.g., in `services/geminiService.ts` and other relevant files where it's checked) with your actual API key string.
            ```typescript
            // Example (NOT RECOMMENDED FOR PRODUCTION - Exposes key in client-side code)
            // In services/geminiService.ts
            // const API_KEY = "YOUR_ACTUAL_GEMINI_API_KEY";
            ```
        *   **Important Security Note:** Be cautious about exposing API keys directly in client-side code if you deploy this application publicly. For a production-like scenario, you'd typically have a backend proxy to handle API requests securely. For personal use or local testing, manually inserting the key or using browser developer tools to set a global `process = { env: { API_KEY: 'YOUR_KEY' } }` before the scripts run might be temporary workarounds. The current code *expects* `process.env.API_KEY` to be defined.

3.  **Running the Application:**
    *   Ensure all project files (`index.html`, `index.tsx`, `App.tsx`, component files, etc.) are in their correct directory structure.
    *   Open the `index.html` file in your web browser.

## How to Use

1.  **Dashboard:**
    *   Get an overview of your learning progress: words to learn, words to review, and mastered words.
    *   Navigate to different sections: Learn, Review, All Words, Explore.

2.  **Learn Session (`Learn New Words`):**
    *   A batch of new words (default: up to 30) will be presented one by one.
    *   Each word will show its definition and an example sentence.
    *   Click "Got It, Next Word" to mark the word as learned (initial stage) and proceed.
    *   You can end the session at any time.

3.  **Review Session (`Review Due Words` or `Practice this word`):**
    *   Words due for review based on the spaced repetition schedule will be presented.
    *   **If Gemini API Key is configured:**
        *   You'll be asked to explain the word or use it in a sentence.
        *   Type your response and click "Submit for Gemini Review."
        *   Gemini will evaluate your input and provide feedback (Correct/Needs Improvement and an explanation).
    *   **If Gemini API Key is NOT configured:**
        *   You'll see the word and a "Show Answer" button.
        *   Click "Show Answer" to reveal the definition and example.
        *   Honestly assess your recall and click "Correct" or "Incorrect."
    *   After feedback (either from Gemini or manual marking), proceed to the next word or finish the session.

4.  **Explore with Gemini (`Explore with Gemini`):**
    *   Requires a configured Gemini API key.
    *   Enter any English word and click "Explore Word."
    *   View its definition, example sentence, synonyms, and antonyms.

5.  **All Words View (`All Words`):**
    *   Browse the entire list of GRE words.
    *   Search for specific words.
    *   Sort words alphabetically (A-Z or Z-A).
    *   See the status (New, Learning, Reviewing, Mastered) and next review date for each word.
    *   Click on a word to expand and view its details (definition, example, review stats).
    *   **Reset Progress:** Option to reset the learning progress for an individual word, marking it as 'New'.
    *   **Practice Word:** Option to start a review session for a specific word, regardless of its due date.

## Spaced Repetition System

The application uses the Ebbinghaus Forgetting Curve principle to schedule word reviews.
*   When a word is marked as learned, it enters the review cycle.
*   If reviewed correctly, the interval for the next review increases (e.g., 1 day, 2 days, 4 days, up to 64 days).
*   If reviewed incorrectly, the interval decreases, and the word will be shown for review sooner.
*   After successfully reviewing a word at the longest interval, it's considered "Mastered."

## Project Structure

*   `index.html`: The main entry point of the application.
*   `index.tsx`: Initializes React and mounts the main `App` component, wraps with `VocabularyProvider`.
*   `App.tsx`: Main application component, handles view routing.
*   `metadata.json`: Basic application metadata.
*   `types.ts`: TypeScript type definitions for the application.
*   `constants.ts`: Application-wide constants (initial word list, Ebbinghaus intervals, API model names).
*   **`components/`**: Contains all React components.
    *   `icons/`: SVG icon components.
    *   `Dashboard.tsx`, `LearnSession.tsx`, `ReviewSession.tsx`, `ExploreWord.tsx`, `AllWordsView.tsx`: Major view components.
    *   `Header.tsx`, `Footer.tsx`, `WordCard.tsx`: Reusable UI components.
*   **`contexts/`**:
    *   `VocabularyContext.tsx`: Manages the global state related to words, learning progress, and interactions with the Gemini service.
*   **`hooks/`**:
    *   `useVocabulary.ts`: Custom hook to easily access the `VocabularyContext`.
*   **`services/`**:
    *   `ebbinghaus.ts`: Logic for calculating review intervals and updating word learning status.
    *   `geminiService.ts`: Functions for interacting with the Google Gemini API (fetching word details, evaluating explanations).

## Offline Functionality

*   Word learning progress and cached word details are stored in the browser's `localStorage`. This allows users to retain their progress between sessions, even if they close the browser.
*   If the Gemini API is unavailable (e.g., no internet or API key issue), the app gracefully degrades:
    *   Word exploration will not work.
    *   Review sessions fall back to manual mode.
    *   Cached definitions/examples will be used if available. Otherwise, placeholder messages are shown.

---

This README provides a good starting point for understanding and using your GRE Vocabulary Mastery application.
```

You can copy this content into a new file named `README.md` in the root of your project.
This README should give anyone a good overview of your project!