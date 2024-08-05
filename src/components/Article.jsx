import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Article(){
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get("http://localhost:8000/api/articles/"+id)
            setArticle(response.data)
        }
        fetch()

    },[])
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <img className="w-1/2 h-auto mb-4" src={article.thumbnail} alt={article.title} />
            <p className="text-lg">{article.articleBody}</p>
        </div>
    )
}