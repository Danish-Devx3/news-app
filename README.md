# NewsApp — Stay Informed

A modern, beautifully crafted news aggregator built with React and the NewsAPI. Stay up to date with the latest headlines across technology, business, science, health, sports, entertainment, and more.

![NewsApp](https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=1200&h=600&fit=crop)

## Features

- **Category Filtering** — Browse headlines by category: Top Stories, Technology, Business, Science, Health, Sports, Entertainment
- **Search** — Real-time search across article titles, descriptions, and sources
- **Featured Hero Article** — Highlighted main story with large image and description
- **Live Clock** — Real-time date and time display in the navbar
- **Loading Skeletons** — Smooth skeleton animations while fetching news
- **Error Handling** — Graceful error states with retry functionality
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Dark Theme** — Modern dark UI with glass-morphism effects and smooth animations
- **Time-Ago Display** — Articles show relative time (e.g., "2h ago", "Just now")

## Tech Stack

- **React 18** — UI library with hooks
- **Vite** — Fast build tool and dev server
- **NewsAPI** — Real-time news data from top publications
- **CSS Variables** — Custom dark theme with glass-morphism styling
- **Inter Font** — Premium typography from Google Fonts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A NewsAPI API key ([get one free](https://newsapi.org/register))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd news-app

# Install dependencies
npm install

# Create .env file with your API key
echo "VITE_API_KEY=your_api_key_here" > .env
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
news-app/
├── index.html              # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── .env                   # Environment variables (API key)
├── public/
│   └── vite.svg           # Favicon
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── App.css             # App-specific styles
    ├── index.css           # Global styles and CSS variables
    ├── Components/
    │   ├── Card.jsx        # News card component
    │   └── Card.css        # Card-specific styles
    └── assets/
        └── react.svg       # React logo
```

## API

This app uses the [NewsAPI](https://newsapi.org/) top-headlines endpoint:

```
GET https://newsapi.org/v2/top-headlines?country=us&category={category}&pageSize=20&apiKey={API_KEY}
```

### Available Categories

| Category      | Label           |
|---------------|-----------------|
| general       | Top Stories     |
| technology    | Technology      |
| business      | Business        |
| science       | Science         |
| health        | Health          |
| sports        | Sports          |
| entertainment | Entertainment   |

## Environment Variables

| Variable      | Description                          | Required |
|---------------|--------------------------------------|----------|
| `VITE_API_KEY`| Your NewsAPI API key                 | Yes      |

Get a free API key at [newsapi.org/register](https://newsapi.org/register).

## Scripts

| Command        | Description                     |
|----------------|---------------------------------|
| `npm run dev`  | Start development server        |
| `npm run build`| Build for production            |
| `npm run lint` | Run ESLint                       |
| `npm run preview`| Preview production build      |

## License

MIT License — feel free to use this project as a template for your own news aggregator.

## Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing real-time news data
- [Unsplash](https://unsplash.com/) for fallback images
- [Google Fonts](https://fonts.google.com/) for the Inter typeface
