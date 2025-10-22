
import { InstaIcon } from "@/components/icons/InstaIcon";
import { FaceIcon } from "@/components/icons/FaceIcon";
import { LinkIcon } from "@/components/icons/LinkIcon";
import { XIcon } from "@/components/icons/XIcon";
import { YoutubeIcon } from "@/components/icons/YoutubeIcon";
import { LeadIcon } from "@/components/icons/LeadIcon";
import { InstantIcon } from "@/components/icons/InstantIcon";
import { ScheduleIcon } from "@/components/icons/ScheduleIcon";
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { AutomatedIcon } from "@/components/icons/AutomatedIcon";
import { IntegrationIcon } from "@/components/icons/IntegrationIcon";

export const NAV_LINKS = [
    { label: "Features", href: "/features",},
    { label: "Pricing", href: "/pricing",},
    { label: "Support", href: "/support",},
    { label: "About us", href: "/about-us",},
    { label: "Contact", href: "/contact",},
    { label: "Blog", href: "/blog",},
]

export const SOCIAL_LINKS = [
    { href: "https://www.instagram.com/toolseyhq/", Icon: InstaIcon },
    { href: "https://www.facebook.com/toolseyHQ/", Icon: FaceIcon },
    { href: "https://www.linkedin.com/company/toolsey/about/", Icon: LinkIcon },
    { href: "https://x.com/toolseyHQ", Icon: XIcon },
    { href: "https://www.youtube.com/channel/UCqhH29lm9brBf5JPiYUFC5g", Icon: YoutubeIcon },
]

export const FOOTER_NAV_LINKS = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Support", href: "/support" },
    { label: "About us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq"}
]

export const FOOTER_ADDRESS = [
    { id: 1, label: "12175 Visionary Way Fishers, IN 46038" },
    { id: 2, label: "800-810-0264" },
    { id: 3, label: "hello@toolsey.com" },
]

export const ADVANTAGES = [
    {
        id: 1, 
        label: "Lead Management", 
        text: "Automatically capture and organize leads from forms, calls, and integrations — no missed opportunities.",
        Icon: LeadIcon
    },
    {
        id: 2, 
        label: "Instant Responses", 
        text: "Auto-reply to new leads via SMS, email, or calls within seconds to boost your conversion rates.",
        Icon: InstantIcon
    },
    {
        id: 3, 
        label: "Calendar & Scheduling", 
        text: "Seamlessly sync with Google Calendar to assign jobs, schedule appointments, and avoid double bookings.",
        Icon: ScheduleIcon
    },
    {
        id: 4, 
        label: "Photo & Document Handling", 
        text: "Capture photos, scan documents, and attach files directly to each lead for clear project tracking.",
        Icon: DocumentIcon
    },
    {
        id: 5, 
        label: "Automated Follow-ups", 
        text: "Set reminders, automate messages, and ensure your sales pipeline keeps moving without manual effort.",
        Icon: AutomatedIcon
    },
    {
        id: 6, 
        label: "Integrations with Your Tools", 
        text: "Connect Toolsey to HomeAdvisor, Zapier, Salesforce, and more — keeping your workflow connected.",
        Icon: IntegrationIcon
    },
]

export const HOW_WORKS = {
    mobile_app: ['Add leads', 'Create Inspection Reports', 'Generate Contracts', 'Submit Commission Requests', 'Take Notes', 'View Documents', 'Take Jobsite Photos', 'Get Directions', 'Track Statuses', 'View Calendar', 'View Lead Enrichment Report', 'Get aerial view of the property', 'Organize, sort, and save searches'],
    command_center: ['Aggregate all of your leads into one unified platform', 'Add leads manually', 'Customize the entire Toolsey platform to fit your business needs', 'Create digital contracts then publish to view across the entire company', 'Powerful search and sort functions', 'Assign and re-assign leads with a single click', 'Track leads with ease', 'Sort, filter, and save to quickly view key sales data']
}

export { PRICING_DATA } from './pricing';

export const CALENDLY_URL = "https://calendly.com/d/cwvy-bn4-8wr/toolsey-discovery-call";

export const PRO_TOOLSEY_URL = "https://pro.toolsey.com/login";