export interface ControlButtonProps {
    onBack?: () => void
}

export const ControlButtons = ({ onBack }: ControlButtonProps) => {
    return (
        <div className="absolute top-4 right-4 flex space-x-4 z-10">
            {onBack ? (
                <button
                    aria-label="Go back"
                    className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 transition"
                    onClick={onBack}
                >
                    Back
                </button>
            ) : null}
            <button
                aria-label="Restart game"
                className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 transition"
                onClick={() => (window.location.pathname = '/')}
            >
                Restart
            </button>
        </div>
    )
}
