export default function ({ icon, text }) {
    return (
        <div className="flex items-center align-start px-4 py-2 border text-ourDarkGray border-ourGray rounded-lg">
            <span>{icon}</span>
            <p className="text-sm">
                {text}
            </p>
        </div >)
}