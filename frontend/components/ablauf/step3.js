import Image from "next/image"
import template from "../../public/scan.gif"
import { UilInfoCircle } from '@iconscout/react-unicons'

export default function () {
    return (
        <>
            <div>
                <h1>3. Verkauf</h1>
                <p className="pb-8">Klasse! Du solltest jetzt alle Produkte eingetragen haben. Ab jetzt kannst du die Verkäufe abrechnen. Scanne dafür einfach die Codes der Produkte ein, welche ein Kunde kaufen möchte. Wenn du alle Verkäufe eingescannt hast, kannst du weiter zum nächsten Schritt.</p>
                <Image src={template} className="rounded-b-none rounded-t-xl" />
                <div class="flex rounded-b-xl flex-row align-middle bg-ourPrimaryColor p-2 text-white">
                    <UilInfoCircle size="24" className="mr-2" />
                    <p>Scanne jetzt die zu verkaufenden Produkte ein</p>
                </div>
            </div>
        </>
    )
}