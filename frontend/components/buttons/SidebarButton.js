export default function ({ text, icon }) {
    return (
        <div className="inline-flex w-full flex-col justify-center px-4 py-2 border-2 cursor-pointer hover:text-ourPrimaryColor border-ourLightGray text-black rounded-lg">
            <span>{icon}</span>
            <p className="text-sm mt-4">
                {text}
            </p>
        </div>
    );
}
