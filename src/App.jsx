import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import ActionAreaCard from './Components/Card';
import './App.css'

const App = () => {
    const [resdata, setresData] = useState([])

    async function fetchData(){
        const response = await fetch('https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=0a219c400ed8404daa54ca4ce401583c')
        const data = await response.json()
        setresData(data.articles)
    }
    useEffect(() => {
        fetchData();
    }, [])

    console.log(resdata)
    
  return (
    <>
    <div className="body">
        {resdata.map((article)=>{
            return <ActionAreaCard title={article.title} image={article.urlToImage} />
        })}
    </div>
    </>
  )
}



 function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}


export default App
