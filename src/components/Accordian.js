import React from 'react';
import Collapse from '@kunukn/react-collapse';
import { useState, useEffect } from 'react';

export const Accordian = () => {

    const [pgnData, setData] = useState({  })

    const fetchPgns = async() => {
        // GET request using fetch inside useEffect React hook
        const response = await fetch('https://localhost:5001/dashboard')
        const data = response.json()
        setData(data)
    }

    useEffect(() => {
       fetchPgns()
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return(
        <div>
            {pgnData.map((game) => (
                <Collapse>
                    game.pgn
                </Collapse>
            ))}
        </div>
    )
}