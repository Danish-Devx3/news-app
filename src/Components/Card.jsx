import React from 'react';
import './Card.css';

const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=400&fit=crop';

export default function NewsCard({ title, content, image, source, publishedAt, url, index = 0 }) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const timeAgo = publishedAt ? getTimeAgo(new Date(publishedAt)) : null;

  return (
    <a
      href={url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
      id={`news-card-${index}`}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="news-card-image-wrapper">
        <img
          src={image || fallbackImage}
          alt={title || 'News article'}
          className="news-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="news-card-image-overlay" />
        {source && (
          <span className="news-card-source">{source}</span>
        )}
      </div>

      <div className="news-card-body">
        <h3 className="news-card-title">{title}</h3>
        {content && (
          <p className="news-card-description">{cleanContent(content)}</p>
        )}
        <div className="news-card-footer">
          {timeAgo && (
            <span className="news-card-time">
              🕐 {timeAgo}
            </span>
          )}
          {formattedDate && (
            <span className="news-card-date">{formattedDate}</span>
          )}
        </div>
      </div>

      <div className="news-card-shine" />
    </a>
  );
}

function cleanContent(content) {
  if (!content) return '';
  // Remove [+XXXX chars] suffix from NewsAPI content
  return content.replace(/\[\+\d+ chars\]/, '').trim();
}

function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
}
