import { useState, useEffect } from 'react';

export default function Images() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/generate');
            const json = await res.json();
            setData(json);
        }
        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <pre>{JSON.stringify(data)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}