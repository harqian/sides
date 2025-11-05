# Decision Maker 🎯

An AI-powered decision comparison tool with **personalized priority weighting**. Make better decisions by visualizing options with colors and scores that adapt to YOUR priorities.

## 🌟 Key Features

### 1. **AI-Powered Parsing**
- Paste unstructured text about your options
- Gemini AI extracts items, pros/cons, and categories automatically
- Works in **demo mode** without API key for testing

### 2. **Personalized Priority System** ⭐ (The Game Changer!)
- Adjust how important each category is to YOU (0-10 scale)
- **Real-time visual feedback**: Colors and emphasis adapt to your priorities
  - Categories you care about: Vibrant, bold, prominent
  - Categories you don't care about: Muted, subtle, grayed out
- See which option is best FOR YOU based on YOUR values

### 3. **Smart Scoring & Ranking**
- Each option gets a personalized score (0-100)
- Clear winner indication based on your priorities
- Score breakdown by category

### 4. **Beautiful, Minimal UI**
- Clean, modern design with intuitive interface
- Color-coded comparison table:
  - 🟢 **Green**: Pros/Positives
  - 🔴 **Red**: Cons/Negatives
  - 🟡 **Yellow**: Neutral points
- Drag & drop text files
- Responsive design

### 5. **Quick Preset Profiles**
- **Balanced**: All categories equal (default)
- **Budget Conscious**: Prioritize cost and value
- **Premium Quality**: Focus on quality over price
- Custom profiles coming soon!

### 6. **Export Options**
- Download as CSV for spreadsheet analysis
- More formats (PDF, Markdown) coming soon

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- (Optional) Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Using the App

#### Without API Key (Demo Mode)
1. Click "Load Example" to see sample data
2. Or paste your own comparison text
3. Click "Generate Comparison"
4. App uses mock data to demonstrate features

#### With Gemini API Key
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Paste it in the "Gemini API Key" field
3. Paste your comparison details
4. Click "Generate Comparison"
5. AI will parse your text and create a smart comparison!

## 📝 Example Input

```
I'm trying to decide between three phones:

iPhone 15 Pro - $1199
- Amazing camera quality, best in class
- Expensive but premium build
- Great performance with A17 chip
- Good battery life
- iOS ecosystem

Samsung S24 - $899
- Cheaper than iPhone
- Excellent battery life, lasts all day
- Very good camera
- Android flexibility
- One UI is feature-rich

Google Pixel 8 - $699
- Most affordable option
- Best software experience, clean Android
- Excellent camera with AI features
- Good performance
- Great for photos
```

## 🎨 How It Works

### 1. Input Your Comparison
- Paste text with unstructured info about options
- Or drag & drop a text file
- Can include prices, features, pros, cons - any format!

### 2. AI Extracts Structure
- Identifies all options/items
- Categorizes points (price, quality, performance, etc.)
- Assigns weights based on context
- Determines polarity (pro/con/neutral)

### 3. Customize Your Priorities
- Adjust sliders for each category
- Watch colors update in real-time
- Try different presets
- See how the winner changes!

### 4. Make Your Decision
- Clear winner indication
- Personalized scores
- Visual comparison table
- Export for later reference

## 🎯 Use Cases

- **Product Comparisons**: Phones, laptops, cars, appliances
- **Job Offers**: Salary, benefits, culture, growth opportunities
- **Housing**: Apartments, houses, neighborhoods
- **Services**: Insurance, banks, utilities
- **Travel**: Hotels, flights, destinations
- **Anything!**: Any decision with multiple options

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI**: Google Gemini API
- **Icons**: Lucide React

## 📦 Project Structure

```
decision-maker/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── InputForm.tsx        # Text input & file upload
│   ├── ComparisonTable.tsx  # Main comparison display
│   ├── ItemColumn.tsx       # Single option column
│   └── customization/       # Priority customization
│       ├── PriorityPanel.tsx
│       └── CategorySlider.tsx
├── lib/                     # Utilities & logic
│   ├── store.ts            # Zustand state management
│   ├── utils.ts            # Helper functions
│   ├── ai/
│   │   └── parser.ts       # Gemini API integration
│   ├── scoring/
│   │   └── calculator.ts   # Personalized scoring
│   └── colors/
│       └── colorUtils.ts   # Color calculations
├── types/
│   └── comparison.ts       # TypeScript interfaces
└── PLAN.md                 # Detailed project plan
```

## 🌈 Color System

The app uses a sophisticated color system that adapts to your priorities:

- **Polarity Colors**:
  - Pro (Green): Light → Medium → Dark
  - Con (Red): Light → Medium → Dark
  - Neutral (Yellow): Light → Medium → Dark

- **Intensity Formula**:
  - Final Weight = Point Weight × Category Importance
  - Higher final weight = Darker, more prominent color
  - Lower final weight = Lighter, more subtle color

- **Dynamic Styling**:
  - Font size increases with category importance
  - Border thickness indicates priority
  - Opacity scales with category weight

## 🔮 Future Enhancements

See [PLAN.md](PLAN.md) for detailed roadmap, including:
- Deal breakers & must-haves
- Conditional weighting rules
- Profile sharing
- More export formats (PDF, Markdown)
- Collaborative comparisons
- Decision history & analytics
- Mobile apps
- And much more!

## 📄 License

MIT License - feel free to use for any purpose!

## 🙏 Credits

Built with ❤️ using modern web technologies and AI.

---

**Happy Decision Making! 🎉**

*Remember: The best decision is the one that aligns with YOUR priorities.*
