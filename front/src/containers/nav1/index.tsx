import { useState, useEffect } from "react";
import favicon from '/src/assets/favicon.svg'
import './style.less'
export default function Nav1 () {
    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        const data = new Array(20)
        setMovieData([...data])
    }, [])
    return (
        <div className="home">
            {
                movieData.map((item, index) => {
                    return (
                        <div key={index} className="home-list-item">
                            <img src={favicon} alt="" />
                            <div className="item-text">
                                <h4>title</h4>
                                <p>desc</p>
                                <small>评分：5</small>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}