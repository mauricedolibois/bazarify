export default function ({ icon, text, onClick}) {
    return (
        <div onClick={onClick} className="inline-flex items-center align-start px-4 py-2 border cursor-pointer hover:bg-ourPrimaryColorHover hover:text-white text-ourPrimaryColor border-ourPrimaryColor rounded-lg">
            <span>{icon}</span>
            <p className="ml-1 text-sm">
                {text}
            </p>
        </div >)
}