export default function ({ icon, text }) {
    return (
        <div className="inline-flex items-center align-start px-4 py-2 border text-ourDarkGray border-ourGray cursor-pointer hover:text-black hover:border-black  rounded-lg">
            <span>{icon}</span>
            <p className="ml-1 text-sm">
                {text}
            </p>
        </div >)
}