import { useState, ChangeEvent } from 'react';

interface PromptProps {
  onInputChange: (value: string) => void;
}

export default function Prompt({ onInputChange }: PromptProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onInputChange(newValue);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
