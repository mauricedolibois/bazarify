import SellerInformation from "../SellerInformation"
import SendMailsButton from "../buttons/SendMailsButton"

export default function () {
    return (
        <>
            <div>
                <h1>4. Abholung</h1>
                <p className='mb-4'>Schön, dass du so viel verkaufen konntest. Du solltest jetzt die Verkäufer benachrichtigen, dass sie ihren Erlös und ggf. ihre liegengebliebene Artikel abholen kommen können.</p>
                <SendMailsButton></SendMailsButton>

                <h2 className="mt-8">Infos zum Verkäufer finden</h2>
                <SellerInformation />
            </div>
        </>
    )
}