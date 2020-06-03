import React from 'react';
import Collapse from '@kunukn/react-collapse';
import { useState, useEffect } from 'react';

export const Accordian = () => {

    const [pgnData, setData] = useState({  })

    async function fetchPgns() {
        // GET request using fetch inside useEffect React hook
        const response = await fetch('https://localhost:5001/dashboard', {
            credentials: 'omit',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
            },
        })
        const data = await response.json()
        console.log(data)
        setData(data)
    }

    useEffect(() => {
       fetchPgns()
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return(
        <div>
            {pgnData[1].map((game) => (
                <Collapse>
                    game.pgn
                </Collapse> 
            ))}
        </div>
    )
}