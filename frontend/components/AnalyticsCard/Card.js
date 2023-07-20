export default function Card({ title, description, info }) {
    return (
      <div className="flex flex-col justify-between rounded-md border border-ourLightGray bg-white p-4 shadow-md">
        <h3>{title}</h3>
        <p>{description}</p>
        {info && <p className="text-sm text-ourGray">{info}</p>}
      </div>
    );
  }