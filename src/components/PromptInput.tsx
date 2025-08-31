
interface PromptInputProps {
    onchange: (text: string) => void
}

export default function PromptInput({ onchange }: PromptInputProps) {

    return (
        <div className="flex justify-center w-full">
            <textarea
                rows={2} 
                placeholder="Enter your prompt" 
                className="w-full border-2 border-gray-300 rounded-md p-2"
                onChange={e => onchange(e.target.value)} 
            />
        </div>
    )
}