import { MailIcon } from "./icons/about/MailIcon"
import { MarkerIcon } from "./icons/about/MarkerIcon"
import { PhoneIcon } from "./icons/about/PhoneIcon"

export const Info = ({ isContact = false }: { isContact?: boolean }) => {
    return (
        <ul className="p-body-20 font-semibold">
            <li>
                <div className="flex items-center gap-2 mt-4">
                    <MarkerIcon fill={isContact ? '#0078AD' : '#333939'} />
                    <span>12175 Visionary Way, Suite 118, Fishers, IN 46038</span>
                </div>
            </li>
            <li>
                <div className="flex items-center gap-2 mt-4">
                    <PhoneIcon fill={isContact ? '#0078AD' : '#333939'} />
                    <a href="tel:800-810-0264" className="hover:text-primary transition-colors">800-810-0264</a>
                </div>
            </li>
            <li>
                <div className="flex items-center gap-2 mt-4">
                    <MailIcon fill={isContact ? '#0078AD' : '#333939'} />
                    <a href="mailto:hello@toolsey.com" className="hover:text-primary transition-colors">
                        hello@toolsey.com
                    </a>
                </div>
            </li>
        </ul>
    )
}