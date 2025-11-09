# Decision Maker - Features

A powerful AI-driven comparison tool that helps you make informed decisions by organizing, analyzing, and personalizing your options.

## Core Features

### 🤖 AI-Powered Analysis

- **Smart Text Parsing**: Paste unstructured text and let AI extract:
  - Comparison items/options
  - Pros, cons, and neutral points
  - Importance weights (1-10 scale)
  - Logical categories (price, quality, performance, etc.)
  - Auto-generated descriptive titles

- **AI Refinement**: Modify comparisons using natural language
  - Text or voice input supported
  - Add/remove comparison points
  - Change weights and categories
  - Rewrite descriptions
  - Add or remove items

- **Personalized Recommendations**: AI learns from your comparison history
  - Intelligently maps your past preferences to new categories
  - Semantic understanding of related categories (e.g., "price" relates to "cost", "value")

### 📊 Comparison Display

- **Organized Table View**
  - Items displayed as columns for easy side-by-side comparison
  - Categories organized by your priority settings
  - Color-coded points (green = pros, red = cons, yellow = neutral)
  - Visual intensity reflects importance (darker = more important)
  - Sticky category column for easy navigation

- **Smart Scoring & Ranking**
  - Automatic score calculation based on your priorities
  - Visual ranking with trophy/medal/award icons (1st, 2nd, 3rd place)
  - Winner banner showing top choice
  - Score breakdown per item

### ⚙️ Personalization

- **Priority Adjustment**
  - Slider controls for each category (1-10 importance)
  - Real-time score recalculation
  - Quick preset profiles:
    - **Balanced**: All categories equal
    - **Budget Conscious**: Prioritizes cost and value
    - **Premium Quality**: Emphasizes quality and performance
    - **Personalized**: AI-generated based on your history

- **Display Preferences**
  - Toggle results visibility (winner, scores, rankings)
  - Preference remembered across sessions
  - Clean interface for unbiased review

### ✏️ Full Editing Capabilities

- **Title Editing**
  - AI generates descriptive titles automatically
  - Click to edit and customize
  - Press Enter or click checkmark to save

- **Point Editing**
  - Inline editing for any comparison point
  - Update text and importance weight
  - Hover to reveal edit/delete buttons

- **Item Management**
  - Delete entire items with one click
  - Remove individual points
  - All changes auto-saved

### 💾 Persistence & History

- **Auto-Save**
  - Current comparison automatically saved to browser
  - Persists across page reloads
  - All edits saved instantly

- **Comparison History**
  - Stores up to 20 past comparisons
  - View history with timestamps ("2 hours ago", "3 days ago")
  - Preview: title, item count, category count, and item names
  - One-click to restore any previous comparison

- **Preference Memory**
  - Display settings remembered (show/hide results)
  - Applied to all new comparisons

### 📤 Export & Import

- **CSV Export**
  - Download comparisons as spreadsheet
  - Includes all categories, points, and scores

- **Flexible Input**
  - Type or paste text directly
  - Upload text files (.txt, .md)
  - Drag and drop support
  - Load example comparison

### 🎨 User Experience

- **Independent Scrolling**
  - Left panel (priorities) and right panel (comparison) scroll separately
  - Work with large comparisons efficiently

- **Full-Width Layout**
  - Uses entire screen space
  - Optimized for wide comparisons with many items

- **Voice Input**
  - Speak your refinement instructions
  - Browser-based speech recognition
  - Works with Chrome, Edge, and Safari

- **Responsive Interface**
  - Hover interactions for edit/delete actions
  - Smooth transitions and animations
  - Color guide for easy understanding

### 🔒 Privacy

- **Local Storage Only**
  - All data stored in your browser
  - No server-side storage
  - Complete privacy control

- **Optional API Key**
  - Use your own Gemini API key
  - Configured via environment variable
  - Works invisibly in background
  - Demo mode available without API

## Use Cases

- **Product Comparisons**: Compare phones, laptops, cars, appliances
- **Job Offers**: Evaluate salary, benefits, culture, growth opportunities
- **Housing Decisions**: Compare apartments, neighborhoods, commute times
- **Service Providers**: Choose between insurance plans, contractors, vendors
- **Purchase Decisions**: Analyze any multi-factor decision

## Technical Features

- Built with Next.js 14 and React
- Powered by Google Gemini AI
- Client-side rendering for speed
- Zustand state management
- Tailwind CSS styling
- TypeScript for type safety
