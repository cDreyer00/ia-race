import { useState } from 'react';

export default function Images() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h1>Images</h1>
            <button
                onClick={() => {
                    setLoading(true);
                    fetch('/api/generate')
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            console.log(data.prediction);
                            setImages(data.prediction || []); // Set a default value for images
                            setLoading(false);
                        });
                }}
            >
                Generate
            </button>
            {loading && <p>Loading...</p>}
            {images && images.length > 0 && (
                <div>
                    {images.map((image) => (
                        <img key={image} src={image} />
                    ))}
                </div>
            )}
        </div>
    );
}
