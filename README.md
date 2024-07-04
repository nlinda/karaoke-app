*Karaoke App*
This project is a Karaoke-like web application that allows users to play audio (video) files with synchronized transcripts. It highlights the current spoken word and provides playback controls.

Structure
The application is structured as follows:

Components:

Navbar: Displays a list of available transcripts fetched from the API and allows selection of a transcript.
ContentPage: Displays the selected transcript with an audio (video) player and highlights the current word being spoken.
AudioPlayer: Manages playback of audio (video) files, including play, pause, seek, and playback speed controls.
TranscriptDisplay: Displays paragraphs of text with words highlighted as they are spoken.
VideoList: Lists available transcripts fetched from the API.
API Integration:

Utilizes endpoints from https://verbit-karaoke-assignment.vercel.app/api/ to fetch transcript details and media files.
Supports fetching transcripts list, fetching a transcript by ID, and fetching a random transcript.
Technical Choices
React with TypeScript: Chosen for its strong typing system and component-based architecture, which enhances code organization and maintainability.
Use of <video> Elements: Leveraged for the video player functionality due to their native support for media playback and built-in controls.
Custom Hooks: Used useFetch custom hook for data fetching to encapsulate API calls and manage loading states.
CSS Modules: Modular CSS approach to style components, ensuring encapsulation and ease of maintenance.
Features Implemented
Displaying transcript paragraphs with highlighted words synchronized to audio (video) playback.
Fetching and displaying a list of available transcripts.
Playback controls including play, pause, seek, and playback speed adjustments.
Automatic Scrolling: implemented automatic scrolling to keep the current word in view during playback. This would improve user experience and readability.


Not Implemented & Trade-offs
Responsive Design: Basic responsiveness is implemented, but further enhancements could ensure optimal viewing on various devices and screen sizes.
Error Handling: Basic error handling is in place, but robust error handling and retry mechanisms could be implemented for better reliability.
Future Improvements
Enhanced Playback Controls: Add volume control, full-screen mode, and subtitle toggling options for a more comprehensive user experience.
User Authentication: Implement user authentication to allow saving favorite transcripts or tracking playback progress.
Performance Optimization: Optimize media loading and processing for smoother playback and reduced latency.
Setup Instructions
To run the project locally:

Clone the repository:

bash
Copy code
git clone <repository-url>
cd karaoke-app
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and visit http://localhost:3000 to view the app.

