export default function ({ text, icon }) {
    return (
        <div className="inline-flex flex-col justify-center px-4 py-2 bg-ourPrimaryColor cursor-pointer hover:bg-ourPrimaryColorHover text-white rounded-lg">
            <span>{icon}</span>
            <p className="text-sm mt-4">
                {text}
            </p>
        </div >
    )
}