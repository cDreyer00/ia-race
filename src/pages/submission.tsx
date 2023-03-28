import { useState } from 'react';
import Prompt from "@/components/prompt";
import style from '@/styles/submission.module.css'

export default function Submission() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleSubmit = () => {
        setLoading(true);
        const body: BodyInit = JSON.stringify({ prompt: inputValue });
        fetch('/api/generate', { method: 'POST', body: body })
            .then((res) => res.json())
            .then(({ output }) => {
                setImageUrl(output);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleSearch = () => {
        const url = 'http://localhost:3000/api/image?id=dl5whw4mwfepdpaybe5ovdevdu'
        setImageUrl(url);
    }

    return (
        <div>
            <h1 className={style.title}>Images</h1>
            <Prompt onInputChange={handleInputChange} />
            <button onClick={() => handleSubmit()} >
                Generate
            </button>
            <button onClick={() => handleSearch()} >
                Search
            </button>
            {loading && <p>Loading...</p>}
            {
                imageUrl && (
                    <div>
                        <img key={imageUrl} src={imageUrl} />
                    </div>
                )
            }
        </div >
    );
}
