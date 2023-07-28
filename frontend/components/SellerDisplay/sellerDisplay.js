export default function ({ name, sellerPayback, text }) {
  return (
    <div className="grid grid-cols-3 mt-4 bg-white rounded border-ourLightGray border">
      <div className="flex justify-center items-center py-4">
        <p className="font-bold">{name}</p>
      </div>
      <div className="flex justify-center flex-col items-center border-l border-ourLightGray border-r py-4">
        <p className="font-semibold">{sellerPayback}€</p>
        <p className="mt-4">Erlös</p>
      </div>
      <div className="flex justify-between text-center items-center py-4 px-8">
        <p>{text()}</p>
      </div>
    </div>
  );
}
