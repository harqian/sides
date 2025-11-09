# Decision Comparison Organizer - Project Plan

## Overview
A web application that allows users to paste unstructured text about various options/items and automatically generates an organized comparison table with pros & cons, color-coded by weight (importance) and polarity (positive/negative).

## Key Differentiator: Personalized Decision-Making 🎯

**What makes this special**: Unlike generic comparison tools, this app adapts to YOUR priorities. Not everyone values the same things when making decisions—some people prioritize price, others prioritize quality, performance, or environmental impact.

**Core Innovation**:
- **Personal Priority Weighting**: Adjust how much each comparison category matters to you (0-10 scale)
- **Dynamic Visual Feedback**: Colors and emphasis change based on YOUR priorities
  - Categories you care about: Vibrant, prominent, bold
  - Categories you don't care about: Muted, subtle, grayed out
- **Personalized Scoring**: Get a custom recommendation based on what matters most to YOU
- **Multiple Perspectives**: Save different profiles ("My Priorities", "Budget Mode", "What My Spouse Cares About")
- **Real-time Recalculation**: See how the "best" option changes as you adjust your priorities

**Example**:
- Budget-conscious user sets Price importance to 10/10 → Cheaper options score higher
- Quality-focused user sets Price importance to 2/10 → Price differences barely affect the colors/scores
- Same comparison data, completely different insights!

## Core Features

### 1. Input Processing
- **Unstructured Text Input**: Large text area where users can paste information about multiple items
- **AI-Powered Parsing**: Use LLM to extract:
  - Individual items/options being compared
  - Pros and cons for each item
  - Weight/importance of each point
  - Polarity (positive/negative) sentiment
- **Manual Item Addition**: Allow users to add items manually if needed

### 2. Comparison Table Generation
- **Dynamic Column Layout**: One column per item/option
- **Row Organization**:
  - Header row with item names
  - Categorized rows (pros section, cons section)
  - Option: grouped by categories (price, features, quality, etc.)
- **Color Coding System**:
  - **Weight/Importance**: Intensity of color (lighter = less important, darker = more important)
  - **Polarity**: Color hue (green = positive/pro, red = negative/con, yellow/orange = neutral/mixed)
  - Example scale:
    - High importance pro: Dark green
    - Medium importance pro: Medium green
    - Low importance pro: Light green
    - High importance con: Dark red
    - Medium importance con: Medium red
    - Low importance con: Light red

### 3. Post-Generation Editing
- **Inline Editing**: Click any cell to edit text
- **Add/Remove Items**: Add new columns or delete existing ones
- **Add/Remove Points**: Add new pros/cons to any item
- **Adjust Weights**: Slider or input to change importance (1-5 or 1-10 scale)
- **Adjust Polarity**: Toggle or adjust positive/negative/neutral
- **Reorder**: Drag and drop to reorganize rows
- **Category Management**: Create custom categories and assign points to them

### 4. User Customization & Personalization
**This is a KEY feature that makes comparisons truly useful for individual decision-making.**

#### Category/Criteria Importance Weighting
- **Personal Priority Settings**: Users define how much each comparison angle matters to them
- **Dynamic Weighting System**: Adjust importance of categories like:
  - Price/Cost (e.g., "Very Important" = 10/10)
  - Performance (e.g., "Somewhat Important" = 6/10)
  - Design/Aesthetics (e.g., "Not Important" = 2/10)
  - Battery Life, Camera Quality, Customer Service, etc.
- **Real-time Visual Updates**: Table adjusts colors and emphasis based on user priorities

#### Customization UI Features
- **Priority Panel/Sidebar**:
  - List all detected categories
  - Slider for each category (0-10 or 1-5 scale)
  - Quick presets: "Price Sensitive", "Performance Focused", "Balanced"
  - Visual preview of how changes affect the comparison
- **Category Management**:
  - Rename categories
  - Merge similar categories (e.g., "cost" + "price" → "Price")
  - Add custom categories
  - Hide/show categories
- **Weight Multiplier System**: User's category weight × point weight = final display weight
  - Example: If "Price" category importance = 10/10, and a price-related con has weight 6
  - Final weight = (10/10) × 6 = 6 (full impact)
  - If user sets "Design" = 2/10, a design pro with weight 8 displays as (2/10) × 8 = 1.6 (minimal impact)

#### Visual Representation of Preferences
- **Enhanced Color Coding**: Colors adjust based on personalized weights
  - Categories user cares about: More vibrant, prominent colors
  - Categories user doesn't care about: Muted, grayed out colors
- **Size/Emphasis Variations**:
  - Font size scales with importance
  - Border thickness indicates priority
  - High priority items: Bold text, larger cells
  - Low priority items: Subtle, smaller text
- **Sorting Options**:
  - Auto-sort rows by user's priorities (most important categories first)
  - Sort items/columns by overall score based on user weights

#### Personalized Scoring System
- **Smart Score Calculation**:
  ```javascript
  // Calculate personalized score for each item
  score = Σ(pointWeight × categoryImportance × polarityMultiplier)
  // where polarityMultiplier: pro = +1, con = -1, neutral = 0
  ```
- **Score Display Options**:
  - Numerical scores (0-100 scale)
  - Star ratings (1-5 stars)
  - Letter grades (A+ to F)
  - Simple ranking (1st, 2nd, 3rd)
- **Score Breakdown**: Hover/click to see contribution by category
  - "iPhone scores 85/100: Camera +30, Performance +25, Price -15, ..."

#### View Modes Based on Preferences
- **Standard View**: All categories visible
- **Focused View**: Only show categories above importance threshold (e.g., ≥5/10)
- **My Priorities View**: Highlight and enlarge high-priority categories
- **Comparison View**: Side-by-side with equal weighting vs. personalized weighting
- **Heatmap Mode**: Visual gradient showing which item wins in which category

#### Preset Profiles & Templates
- **Built-in Profiles**:
  - "Budget Conscious": Price 10/10, all else moderate
  - "Premium Quality": Quality & Performance 10/10, price 2/10
  - "Balanced": All categories equal
  - "Eco-Friendly": Environmental impact 10/10
- **Custom Profiles**: Save multiple preference sets
  - "My Priorities"
  - "What My Spouse Cares About"
  - "Business Decision" vs. "Personal Decision"
- **Profile Switching**: Instantly see comparison from different perspectives
- **Profile Sharing**: Share your priority weights with others

#### Advanced Customization
- **Conditional Weighting**:
  - "If price > $1000, importance of warranty increases"
  - "For items in this price range, design matters less"
- **Deal Breakers**: Mark certain cons as absolute disqualifiers
  - Item grayed out entirely if deal breaker present
  - Optional: "Show anyway but with warning"
- **Must-Haves**: Mark certain pros as requirements
  - Highlight items that meet all must-haves
  - Filter to only show items with must-haves
- **Custom Color Schemes**:
  - Choose color palette (colorblind-friendly options)
  - Adjust intensity curves
  - High contrast mode
  - Dark/light theme preferences

#### Persistence & Sync
- **Save Preferences**: Store user's category weights
- **Per-Comparison Overrides**: Different weights for different decisions
- **Default Profile**: Set global preferences for new comparisons
- **Export Preferences**: Share settings with friends/colleagues
- **Import Preferences**: Load someone else's priority framework

### 5. Export & Sharing
- **Export Options**:
  - PDF with preserved colors (include/exclude user weights)
  - CSV/Excel for data analysis (with scores)
  - Markdown for documentation
  - Image (PNG/JPEG) for presentations
  - Export with multiple view modes (standard + personalized)
- **Share Link**: Generate shareable link to view comparison
  - Option to share with your weights vs. neutral weights
  - Collaborative mode: others can apply their own weights
- **Save/Load**: Save comparisons for later editing

## Technical Architecture

### Frontend Stack
**Framework**: Next.js 14+ (React)
- App Router for modern routing
- Server components for performance
- Client components for interactivity

**UI Libraries**:
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui for pre-built accessible components
- **Tables**: TanStack Table (React Table v8) for advanced table features
- **Drag & Drop**: dnd-kit for reordering functionality
- **Color Picker**: react-colorful for custom color adjustments
- **Icons**: Lucide React

**State Management**:
- React Context or Zustand for global state
- React Hook Form for form handling

### Backend/API
**Option 1: Serverless (Recommended)**
- Next.js API Routes
- Vercel/Netlify deployment
- Minimal backend complexity

**Option 2: Full Backend**
- Node.js/Express or Next.js API
- Database: PostgreSQL or MongoDB
- Prisma ORM for database management

### AI Integration
**LLM Service**:
- OpenAI GPT-4 or GPT-3.5 Turbo
- Anthropic Claude (alternative)
- Option for local models (Llama via Ollama)

**Processing Pipeline**:
1. User pastes unstructured text
2. Send to LLM with structured prompt
3. LLM returns JSON with:
   ```json
   {
     "items": [
       {
         "name": "Option A",
         "points": [
           {
             "text": "Great battery life",
             "type": "pro",
             "weight": 8,
             "category": "performance"
           },
           {
             "text": "Expensive",
             "type": "con",
             "weight": 6,
             "category": "price"
           }
         ]
       }
     ]
   }
   ```
4. Frontend renders table from JSON
5. User edits as needed

### Data Storage
**Short-term (MVP)**:
- Local Storage for persistence
- Session-based for temporary work

**Long-term**:
- Database for saved comparisons
- User accounts (optional)
- Sharing via unique IDs

## Color Coding Algorithm

### Weight-Based Opacity/Intensity
```javascript
// Weight scale: 1-10
const getColorIntensity = (weight) => {
  const minOpacity = 0.2;
  const maxOpacity = 1.0;
  return minOpacity + (weight / 10) * (maxOpacity - minOpacity);
};
```

### Polarity-Based Hue
```javascript
const polarityColors = {
  pro: {
    base: 'rgb(34, 197, 94)', // green-500
    light: 'rgb(134, 239, 172)', // green-300
    dark: 'rgb(21, 128, 61)' // green-700
  },
  con: {
    base: 'rgb(239, 68, 68)', // red-500
    light: 'rgb(252, 165, 165)', // red-300
    dark: 'rgb(153, 27, 27)' // red-700
  },
  neutral: {
    base: 'rgb(234, 179, 8)', // yellow-500
    light: 'rgb(253, 224, 71)', // yellow-300
    dark: 'rgb(161, 98, 7)' // yellow-700
  }
};
```

### Combined Color Function
```javascript
const getPointColor = (type, weight) => {
  const colors = polarityColors[type];
  if (weight <= 3) return colors.light;
  if (weight <= 7) return colors.base;
  return colors.dark;
};
```

## Personalized Scoring & Weighting Algorithm

### Calculate Final Display Weight
```javascript
/**
 * Calculates the final weight for display, combining point weight with user's category preference
 * @param pointWeight - The inherent importance of the point (1-10)
 * @param categoryImportance - User's importance rating for this category (0-10)
 * @returns Final weight (0-10) used for color intensity and sorting
 */
const calculateFinalWeight = (pointWeight, categoryImportance) => {
  // Normalize category importance to 0-1 multiplier
  const multiplier = categoryImportance / 10;

  // Apply multiplier to point weight
  const finalWeight = pointWeight * multiplier;

  // Ensure result stays in valid range
  return Math.max(0, Math.min(10, finalWeight));
};

// Example:
// Point: "Expensive" (weight: 8, category: "price")
// User's price importance: 10/10 → finalWeight = 8 * 1.0 = 8 (bright red)
// User's price importance: 3/10 → finalWeight = 8 * 0.3 = 2.4 (faint red)
// User's price importance: 0/10 → finalWeight = 8 * 0.0 = 0 (grayed out)
```

### Calculate Personalized Item Scores
```javascript
/**
 * Calculates a personalized score for an item based on user preferences
 * @param item - The comparison item
 * @param userPreferences - User's category weights and preferences
 * @returns Score object with total and breakdown
 */
const calculateItemScore = (item, userPreferences) => {
  let totalScore = 0;
  const categoryBreakdown = {};

  // Group points by category
  item.points.forEach(point => {
    if (!categoryBreakdown[point.category]) {
      categoryBreakdown[point.category] = {
        category: point.category,
        contribution: 0,
        points: []
      };
    }

    // Get user's importance for this category
    const categoryWeight = userPreferences.categoryWeights.find(
      cw => cw.category === point.category
    );
    const categoryImportance = categoryWeight?.importance ?? 5; // Default: 5/10

    // Calculate polarity multiplier
    const polarityMultiplier = point.type === 'pro' ? 1 :
                               point.type === 'con' ? -1 : 0;

    // Calculate final contribution
    const finalWeight = calculateFinalWeight(point.weight, categoryImportance);
    const contribution = finalWeight * polarityMultiplier;

    // Check for deal breakers and must-haves
    if (point.isDealBreaker && point.type === 'con') {
      contribution *= 10; // Massively penalize deal breakers
    }
    if (point.isMustHave && point.type === 'pro') {
      contribution *= 2; // Boost must-haves
    }

    totalScore += contribution;
    categoryBreakdown[point.category].contribution += contribution;
    categoryBreakdown[point.category].points.push(point);
  });

  // Normalize score to 0-100 range
  const maxPossibleScore = item.points.length * 10;
  const normalizedScore = ((totalScore / maxPossibleScore) * 50) + 50; // Center at 50

  return {
    itemId: item.id,
    totalScore: Math.max(0, Math.min(100, normalizedScore)),
    categoryBreakdown: Object.values(categoryBreakdown),
    rawScore: totalScore
  };
};
```

### Ranking Algorithm
```javascript
/**
 * Ranks all items based on personalized scores
 */
const rankItems = (items, userPreferences) => {
  const scores = items.map(item => calculateItemScore(item, userPreferences));

  // Sort by score (descending)
  scores.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks (handle ties)
  let currentRank = 1;
  scores.forEach((score, index) => {
    if (index > 0 && score.totalScore < scores[index - 1].totalScore) {
      currentRank = index + 1;
    }
    score.rank = currentRank;
  });

  return scores;
};
```

### Enhanced Color with User Preferences
```javascript
/**
 * Gets color with user preference multiplier applied
 */
const getPersonalizedColor = (point, userPreferences) => {
  // Get user's category importance
  const categoryWeight = userPreferences.categoryWeights.find(
    cw => cw.category === point.category
  );
  const categoryImportance = categoryWeight?.importance ?? 5;

  // Calculate final display weight
  const finalWeight = calculateFinalWeight(point.weight, categoryImportance);

  // Get base color
  const colors = polarityColors[point.type];
  let baseColor;
  if (finalWeight <= 3) baseColor = colors.light;
  else if (finalWeight <= 7) baseColor = colors.base;
  else baseColor = colors.dark;

  // Apply opacity based on category importance
  const opacity = 0.3 + (categoryImportance / 10) * 0.7; // Range: 0.3 to 1.0

  return {
    backgroundColor: baseColor,
    opacity: opacity,
    // Additional visual cues
    fontSize: categoryImportance > 7 ? '1.1rem' : '1rem',
    fontWeight: categoryImportance > 7 ? '600' : '400',
    borderWidth: Math.ceil(categoryImportance / 3) + 'px'
  };
};
```

## UI/UX Design

### Main Layout with Priority Panel
```
┌──────────────────────────────────────────────────────────────────────────┐
│  Decision Comparison Organizer                           [Save] [Share]  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Paste your information below:                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ I'm trying to decide between:                                      │  │
│  │                                                                     │  │
│  │ iPhone 15 Pro - great camera, expensive, good performance...      │  │
│  │ Samsung S24 - cheaper, excellent battery, good camera...          │  │
│  │ Pixel 8 - best software, great camera, mid-range price...        │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                         [Generate]         │
│                                                                           │
├──────────┬────────────────────────────────────────────────────────────────┤
│ PRIORITY │  Comparison Table            View: [Standard ▼] Sort: Score   │
│  PANEL   ├────────────────────────────────────────────────────────────────┤
│          │  ┌──────────┬──────────┬──────────┐                          │
│ Profile: │  │ iPhone   │ Samsung  │ Pixel 8  │                          │
│ [Custom▼]│  │ Score:92 │ Score:85 │ Score:88 │ (Personalized)           │
│          │  ├──────────┼──────────┼──────────┤                          │
│ Camera   │  │ 🟢🟢🟢    │ 🟢🟢      │ 🟢🟢🟢    │ Camera (Importance:10)   │
│ ●●●●●●●●●●│  │ Excellent│ Very Good│ Excellent│                          │
│ [10/10]  │  │          │          │          │                          │
│          │  │ 🔴🔴🔴    │ 🟢🟢      │ 🟡       │ Price (Importance: 3)    │
│ Price    │  │ $1199    │ $899     │ $699     │                          │
│ ●●●○○○○○○○│  │ Expensive│ Good     │ Affordable│                         │
│ [3/10]   │  │          │          │          │                          │
│          │  │ 🟢🟢      │ 🟢🟢🟢    │ 🟢🟢      │ Battery (Importance: 8)  │
│ Battery  │  │ Good     │ Excellent│ Good     │                          │
│ ●●●●●●●●○○│  │          │          │          │                          │
│ [8/10]   │  │ 🟢🟢🟢    │ 🟢🟢      │ 🟢🟢🟢    │ Software (Importance: 7) │
│          │  │ iOS 17   │ OneUI    │ Stock    │                          │
│ Software │  │          │          │ Android  │                          │
│ ●●●●●●●○○○│  └──────────┴──────────┴──────────┘                          │
│ [7/10]   │                                                                │
│          │  Winner: iPhone 15 Pro (Score: 92)                           │
│ [Reset]  │  Based on your priorities: Camera > Battery > Software > Price│
│ [Presets]│                                                                │
│          │  [Export PDF] [Export CSV] [Share] [Save Preferences]        │
└──────────┴────────────────────────────────────────────────────────────────┘
```

### Compact Mobile Layout
```
┌───────────────────────────┐
│  Sides   [≡ Menu]│
├───────────────────────────┤
│ [Input] [Table] [Settings]│
├───────────────────────────┤
│  ┌─ iPhone 15 Pro ──────┐ │
│  │ 🏆 Score: 92 (1st)   │ │
│  │                      │ │
│  │ 🟢🟢🟢 Camera         │ │
│  │ 🔴🔴🔴 Price          │ │
│  │ 🟢🟢 Battery          │ │
│  │ 🟢🟢🟢 Software        │ │
│  └──────────────────────┘ │
│  ┌─ Pixel 8 ───────────┐ │
│  │ 🥈 Score: 88 (2nd)   │ │
│  │ ...                  │ │
│  └──────────────────────┘ │
│                           │
│  ⚙ Adjust Priorities      │
└───────────────────────────┘
```

### Table Features
- **Sticky Headers**: Column headers remain visible on scroll
- **Responsive**: Mobile-friendly with horizontal scroll or stacked view
- **Tooltips**: Hover over cells to see full details
- **Visual Indicators**:
  - Border thickness for weight
  - Background color for polarity
  - Icons for quick recognition (✓, ✗, ⚠)

## Implementation Phases

### Phase 1: MVP (Week 1-2)
- [ ] Set up Next.js project with Tailwind CSS
- [ ] Create basic input form component
- [ ] Integrate OpenAI API for text parsing
- [ ] Build simple comparison table component
- [ ] Implement basic color coding (3 levels: low/medium/high)
- [ ] Add local storage persistence

### Phase 2: Enhanced Editing (Week 3)
- [ ] Inline editing for all cells
- [ ] Add/remove items and points
- [ ] Weight adjustment UI (sliders)
- [ ] Drag and drop reordering
- [ ] Category management

### Phase 3: User Customization & Personalization (Week 4) ⭐ KEY PHASE
- [ ] **Priority Panel Component**: Sidebar with category sliders
- [ ] **Category Importance Weights**: User can adjust 0-10 for each category
- [ ] **Real-time Score Calculation**: Personalized scores based on user weights
- [ ] **Enhanced Color System**: Colors adjust with user preferences
  - Muted colors for low-importance categories
  - Vibrant colors for high-importance categories
- [ ] **Preset Profiles**: "Budget Conscious", "Premium Quality", "Balanced"
- [ ] **Custom Profile Management**: Save, load, switch between profiles
- [ ] **Score Display**: Show personalized scores for each item
- [ ] **Ranking System**: Auto-rank items by personalized score
- [ ] **View Modes**: Standard, Focused (high priority only), Priorities view
- [ ] **Deal Breakers & Must-Haves**: Mark critical points

### Phase 4: Advanced Customization (Week 5)
- [ ] **Score Breakdown**: Hover tooltips showing contribution by category
- [ ] **Profile Sharing**: Export/import preference profiles
- [ ] **Conditional Weighting**: Advanced rules (if price > X, then Y)
- [ ] **Visual Emphasis**: Font size/weight scales with importance
- [ ] **Heatmap View**: Visual gradient view mode
- [ ] Advanced color customization (colorblind mode, custom palettes)
- [ ] Export to PDF/CSV/Markdown with scores and preferences
- [ ] Responsive design improvements
- [ ] Loading states and error handling
- [ ] Better prompt engineering for LLM

### Phase 5: Persistence & Sharing (Week 6)
- [ ] Database setup (PostgreSQL + Prisma)
- [ ] Save/load comparisons with user preferences
- [ ] Share links with unique IDs (with/without preferences)
- [ ] Optional: User accounts
- [ ] Collaborative mode (others can apply their own weights)

### Phase 6: Polish & Launch (Week 7)
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Analytics and user feedback
- [ ] Documentation

## File Structure
```
decision-maker/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page with input form
│   ├── comparison/
│   │   └── [id]/
│   │       └── page.tsx        # Shared comparison view
│   └── api/
│       ├── parse/
│       │   └── route.ts        # LLM parsing endpoint
│       └── comparisons/
│           └── route.ts        # CRUD for saved comparisons
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── InputForm.tsx           # Text input component
│   ├── ComparisonTable.tsx     # Main table component
│   ├── EditableCell.tsx        # Editable table cell
│   ├── WeightSlider.tsx        # Weight adjustment UI
│   ├── ColorIndicator.tsx      # Color-coded visual indicator
│   ├── ExportMenu.tsx          # Export options dropdown
│   ├── ItemColumn.tsx          # Single item column
│   ├── customization/
│   │   ├── PriorityPanel.tsx   # Main customization sidebar
│   │   ├── CategorySlider.tsx  # Individual category weight slider
│   │   ├── ProfileSelector.tsx # Preset/saved profile dropdown
│   │   ├── ViewModeToggle.tsx  # Switch between view modes
│   │   ├── ScoreDisplay.tsx    # Show personalized scores
│   │   └── ColorScheme.tsx     # Color customization panel
│   └── ItemScoreCard.tsx       # Score breakdown popover
├── lib/
│   ├── ai/
│   │   └── parser.ts           # LLM integration logic
│   ├── colors/
│   │   └── colorUtils.ts       # Color calculation functions
│   ├── scoring/
│   │   ├── calculator.ts       # Personalized score calculation
│   │   ├── ranker.ts           # Item ranking logic
│   │   └── presets.ts          # Preset profile logic
│   ├── export/
│   │   ├── pdf.ts              # PDF export
│   │   ├── csv.ts              # CSV export
│   │   └── markdown.ts         # Markdown export
│   └── db/
│       ├── schema.ts           # Prisma schema
│       └── queries.ts          # Database queries
├── types/
│   └── comparison.ts           # TypeScript interfaces
├── public/
│   └── examples/               # Example comparisons
├── prisma/
│   └── schema.prisma           # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Key TypeScript Interfaces

```typescript
// types/comparison.ts

export type Polarity = 'pro' | 'con' | 'neutral';
export type ViewMode = 'standard' | 'focused' | 'priorities' | 'comparison' | 'heatmap';
export type ScoreDisplayType = 'numeric' | 'stars' | 'grade' | 'rank';

export interface ComparisonPoint {
  id: string;
  text: string;
  type: Polarity;
  weight: number; // 1-10 (importance of this specific point)
  category: string;
  color?: string; // Optional custom color override
  isDealBreaker?: boolean;
  isMustHave?: boolean;
}

export interface ComparisonItem {
  id: string;
  name: string;
  points: ComparisonPoint[];
  description?: string;
  metadata?: Record<string, any>; // For storing extra data like price, specs
}

export interface CategoryWeight {
  category: string;
  importance: number; // 0-10 (how much user cares about this category)
  visible: boolean;
  color?: string; // Custom category color
}

export interface UserPreferences {
  id: string;
  name: string; // Profile name: "My Priorities", "Budget Mode", etc.
  categoryWeights: CategoryWeight[];
  viewMode: ViewMode;
  scoreDisplay: ScoreDisplayType;
  showScores: boolean;
  sortByScore: boolean;
  hideCategories: string[]; // Categories to hide
  colorScheme: 'default' | 'colorblind' | 'high-contrast' | 'custom';
  customColors?: {
    pro: { light: string; base: string; dark: string };
    con: { light: string; base: string; dark: string };
    neutral: { light: string; base: string; dark: string };
  };
}

export interface ItemScore {
  itemId: string;
  totalScore: number; // Calculated personalized score
  rank: number;
  categoryBreakdown: {
    category: string;
    contribution: number;
    points: ComparisonPoint[];
  }[];
}

export interface Comparison {
  id: string;
  title?: string;
  items: ComparisonItem[];
  categories: string[];
  userPreferences?: UserPreferences; // Current active preferences
  savedProfiles: UserPreferences[]; // Multiple saved profiles
  createdAt: Date;
  updatedAt: Date;
}

export interface ParsedInput {
  items: ComparisonItem[];
  categories: string[];
}

// Preset profile templates
export const PRESET_PROFILES: Partial<UserPreferences>[] = [
  {
    name: 'Balanced',
    categoryWeights: [], // All equal, populated dynamically
  },
  {
    name: 'Budget Conscious',
    categoryWeights: [
      { category: 'price', importance: 10, visible: true },
      { category: 'cost', importance: 10, visible: true },
      { category: 'value', importance: 9, visible: true },
    ],
  },
  {
    name: 'Premium Quality',
    categoryWeights: [
      { category: 'quality', importance: 10, visible: true },
      { category: 'performance', importance: 10, visible: true },
      { category: 'price', importance: 2, visible: true },
    ],
  },
];
```

## LLM Prompt Template

```typescript
const PARSING_PROMPT = `You are a comparison organizer. Extract structured comparison data from the following unstructured text.

User Input:
{userInput}

Extract:
1. All items/options being compared
2. Pros and cons for each item
3. Rate each point's importance (1-10, where 10 is most important)
4. Identify categories (price, quality, features, etc.)

Return ONLY valid JSON in this exact format:
{
  "items": [
    {
      "name": "Item Name",
      "description": "Brief description if mentioned",
      "points": [
        {
          "text": "Specific pro or con",
          "type": "pro" | "con" | "neutral",
          "weight": 1-10,
          "category": "category name"
        }
      ]
    }
  ],
  "categories": ["list", "of", "categories"]
}

Rules:
- Be specific with point text
- Assign realistic weights based on context
- Use neutral for ambiguous points
- Create meaningful categories`;
```

## Deployment Strategy

### Development
- Local development: `npm run dev`
- Environment variables:
  - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
  - `DATABASE_URL` (for production)
  - `NEXTAUTH_SECRET` (if using auth)

### Production
**Option 1: Vercel (Recommended)**
- Automatic deployments from Git
- Serverless functions for API routes
- Edge runtime for performance
- Built-in analytics

**Option 2: Self-hosted**
- Docker container
- Node.js server
- Nginx reverse proxy
- PostgreSQL database

## Success Metrics
- Time to generate comparison: < 5 seconds
- Table editing responsiveness: < 100ms
- Mobile usability score: > 90/100
- Accessibility score: > 95/100
- User satisfaction: Can edit and understand comparisons easily

## Future Enhancements (Post-v1.0)
- **AI-powered suggestions**: Suggest missing pros/cons based on category analysis
- **Collaborative editing**: Multiple users can view and edit simultaneously
- **Decision templates**: Pre-built templates for common decisions
  - Product comparisons (phones, laptops, cars)
  - Job offers (salary, benefits, culture, growth)
  - Housing (apartments, houses, neighborhoods)
  - Service providers (insurance, banks, utilities)
- **External data integration**:
  - Pull product specs from APIs
  - Aggregate review scores from multiple sources
  - Real-time price tracking
- **Smart recommendations**: "Based on your priorities, we recommend Option A"
- **Decision history & learning**: Track past decisions and learn user preferences
- **What-if scenarios**: "What if price was more important?"
- **Multiple view modes**: Table, cards, kanban board, list view
- **Import/Export formats**:
  - Import from existing spreadsheets
  - Import from competitor tools
  - Export to Notion, Airtable
- **Browser extension**: Capture comparison data while browsing
- **Mobile apps**: Native iOS/Android apps
- **Voice input**: Dictate comparison information
- **Comparison analytics**: "You've made 15 decisions, 80% valued quality over price"
- **Social features**: Share decisions with friends, see what others chose
- **Decision journal**: Track outcomes of past decisions

## Technical Considerations

### Performance
- Lazy load table rows for large comparisons
- Debounce editing inputs to reduce re-renders
- Memoize color calculations
- Use virtual scrolling for 100+ items

### Security
- Sanitize user input to prevent XSS
- Rate limit API endpoints
- Validate LLM responses
- Secure sharing tokens

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation for all features
- High contrast mode support
- Focus indicators
- Alt text for color-coded elements

### Error Handling
- LLM parsing failures → Allow manual input
- Network errors → Save draft locally
- Invalid data → Validation with helpful messages
- Export failures → Retry mechanism

## Estimated Timeline
- **Week 1-2**: Core functionality (input → AI parsing → table display)
- **Week 3**: Editing features
- **Week 4**: ⭐ **User Customization & Personalization** (Key differentiator!)
- **Week 5**: Advanced customization features
- **Week 6**: Persistence and sharing
- **Week 7**: Polish and deployment

**Total**: ~7 weeks for full-featured v1.0 with advanced personalization

## Budget Considerations
- **AI API Costs**: ~$0.01-0.05 per comparison (OpenAI)
- **Hosting**: Free tier on Vercel/Netlify for MVP
- **Database**: Free tier PostgreSQL (Supabase/Neon)
- **Domain**: ~$10-15/year

## Risk Mitigation
- **LLM parsing failures**: Fallback to manual input mode
- **API costs**: Implement caching, rate limiting
- **Complex inputs**: Start with simpler templates, improve over time
- **Browser compatibility**: Test on major browsers (Chrome, Firefox, Safari, Edge)

---

## Next Steps
1. Review and approve this plan
2. Set up initial Next.js project structure
3. Install dependencies
4. Create basic UI mockups
5. Implement Phase 1 MVP features
