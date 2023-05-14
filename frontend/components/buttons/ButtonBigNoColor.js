export default function ({ text, icon }) {
    return (
        <div className="flex flex-col justify-center px-4 py-2 border border-ourLightGray text-black rounded-lg">
            <span>{icon}</span>
            <p className="text-sm">
                {text}
            </p>
        </div >)
}