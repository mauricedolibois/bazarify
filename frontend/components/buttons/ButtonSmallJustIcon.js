export default function ({ icon, tooltip, onClick }) {
    return (
        <button onClick={onClick} title={tooltip} className="inline-flex flex-col justify-center px-4 py-2 bg-ourPrimaryColor cursor-pointer hover:bg-ourPrimaryColorHover  text-white text-black rounded-lg">
            <span>{icon}</span>
        </button >)
}