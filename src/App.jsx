import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import ActionAreaCard from './Components/Card';
import './App.css'

const App = () => {
    const [resdata, setresData] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchData(){
        try {
            setLoading(true)
            const response = await fetch('https://newsapi.org/v2/top-headlines?' +
              'country=us&' +
              'apiKey=0a219c400ed8404daa54ca4ce401583c')
            const data = await response.json()
            setresData(data.articles)
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <>
            <header className="header">
                <h1>Latest News</h1>
            </header>
            <div className="body">
                {loading ? (
                    <p>Loading news...</p>
                ) : (
                    resdata.map((article, index) => (
                        <ActionAreaCard 
                            key={index}
                            title={article.title} 
                            content={article.content} 
                            image={article.urlToImage}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default App
