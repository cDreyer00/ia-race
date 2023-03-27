import { useState } from 'react';
import Prompt from "@/components/prompt";

export default function Images() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <div>
            <h1>Images</h1>
            <Prompt onInputChange={handleInputChange} />
            <button
                onClick={() => {
                    setLoading(true);
                    // make a body content to use in fetch with inputValue
                    const body: BodyInit = JSON.stringify({ prompt: inputValue });

                    fetch('/api/generate', { method: 'POST', body: body })
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
            {
                images && images.length > 0 && (
                    <div>
                        {images.map((image) => (
                            <img key={image} src={image} />
                        ))}
                    </div>
                )
            }
        </div >
    );
}
