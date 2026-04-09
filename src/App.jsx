import React, { useEffect, useState, useMemo } from 'react';
import NewsCard from './Components/Card';

const API_KEY = import.meta.env.VITE_API_KEY || '0a219c400ed8404daa54ca4ce401583c';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const CATEGORIES = [
    { id: 'general', label: 'Top Stories', emoji: '🔥' },
    { id: 'technology', label: 'Technology', emoji: '💻' },
    { id: 'business', label: 'Business', emoji: '📈' },
    { id: 'science', label: 'Science', emoji: '🔬' },
    { id: 'health', label: 'Health', emoji: '💊' },
    { id: 'sports', label: 'Sports', emoji: '⚽' },
    { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
];

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update clock every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    async function fetchNews(category = 'general') {
        try {
            setLoading(true);
            setError(null);

            const url = `${BASE_URL}?country=us&category=${category}&pageSize=20&apiKey=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch news (${response.status})`);
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(data.message || 'Failed to fetch news');
            }

            // Filter out articles with missing titles or "[Removed]" content
            const filtered = (data.articles || []).filter(
                (a) => a.title && a.title !== '[Removed]' && a.urlToImage
            );

            setArticles(filtered);
        } catch (err) {
            console.error('Error fetching news:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews(activeCategory);
    }, [activeCategory]);

    // Filter by search query
    const filteredArticles = useMemo(() => {
        if (!searchQuery.trim()) return articles;
        const q = searchQuery.toLowerCase();
        return articles.filter(
            (a) =>
                (a.title && a.title.toLowerCase().includes(q)) ||
                (a.description && a.description.toLowerCase().includes(q)) ||
                (a.source?.name && a.source.name.toLowerCase().includes(q))
        );
    }, [articles, searchQuery]);

    const featuredArticle = filteredArticles[0];
    const remainingArticles = filteredArticles.slice(1);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    return (
        <>
            {/* ===== Navbar ===== */}
            <nav className="navbar" id="navbar">
                <div className="navbar-inner">
                    <div className="brand">
                        <div className="brand-icon">📰</div>
                        <span className="brand-text">NewsApp</span>
                    </div>

                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            id="search-input"
                            type="text"
                            className="search-input"
                            placeholder="Search headlines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="nav-meta">
                        <div className="live-dot" />
                        <span>{formattedDate} • {formattedTime}</span>
                    </div>
                </div>
            </nav>

            {/* ===== Categories ===== */}
            <div className="categories-container">
                <div className="categories" id="category-tabs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            id={`category-${cat.id}`}
                            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.emoji} {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== Content ===== */}
            {loading ? (
                <div className="loading-container" id="loading-skeleton">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div className="skeleton-card" key={i}>
                            <div className="skeleton-image" />
                            <div className="skeleton-content">
                                <div className="skeleton-line" />
                                <div className="skeleton-line" />
                                <div className="skeleton-line" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="error-container" id="error-state">
                    <div className="error-icon">⚠️</div>
                    <h2 className="error-title">Something went wrong</h2>
                    <p className="error-message">{error}</p>
                    <button
                        className="retry-button"
                        id="retry-button"
                        onClick={() => fetchNews(activeCategory)}
                    >
                        Try Again
                    </button>
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="empty-state" id="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <p className="empty-state-text">
                        No articles found{searchQuery ? ` for "${searchQuery}"` : ''}. Try a different search or category.
                    </p>
                </div>
            ) : (
                <>
                    {/* Featured Article */}
                    {featuredArticle && (
                        <div className="hero-section">
                            <a
                                href={featuredArticle.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-card"
                                id="hero-article"
                            >
                                <img
                                    src={featuredArticle.urlToImage}
                                    alt={featuredArticle.title}
                                    className="hero-card-image"
                                />
                                <div className="hero-card-overlay" />
                                <div className="hero-card-content">
                                    <span className="hero-badge">⚡ Featured</span>
                                    <h2 className="hero-title">{featuredArticle.title}</h2>
                                    {featuredArticle.description && (
                                        <p className="hero-desc">{featuredArticle.description}</p>
                                    )}
                                    <div className="hero-meta">
                                        {featuredArticle.source?.name && (
                                            <span>{featuredArticle.source.name}</span>
                                        )}
                                        {featuredArticle.publishedAt && (
                                            <span>
                                                {new Date(featuredArticle.publishedAt).toLocaleDateString(
                                                    'en-US',
                                                    { month: 'short', day: 'numeric', year: 'numeric' }
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </div>
                    )}

                    {/* Section Header */}
                    {remainingArticles.length > 0 && (
                        <div className="section-header">
                            <h2 className="section-title">Latest Headlines</h2>
                            <span className="article-count">
                                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}

                    {/* Cards Grid */}
                    <div className="cards-grid" id="articles-grid">
                        {remainingArticles.map((article, index) => (
                            <NewsCard
                                key={article.url || index}
                                index={index}
                                title={article.title}
                                content={article.description || article.content}
                                image={article.urlToImage}
                                source={article.source?.name}
                                publishedAt={article.publishedAt}
                                url={article.url}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ===== Footer ===== */}
            <footer className="footer" id="footer">
                <p>Powered by NewsAPI • Built with React</p>
            </footer>
        </>
    );
};

export default App;
