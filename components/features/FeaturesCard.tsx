export const FeaturesCard = ({ id, title, subtitle, description, whyItMatters, Anim, index }: { id: number, title: string; subtitle: string; description: string; whyItMatters: string; Anim: React.ComponentType<React.SVGProps<SVGSVGElement>>, index:number }) => {
    return (
        <div key={id} className={`flex items-center lg:justify-between justify-center gap-4 lg:py-[60px] py-14 ${index % 2 !== 0 ? 'lg:flex-row-reverse flex-row' : 'flex-row' } lg:flex-nowrap flex-wrap`}>
            <div className="max-w-[608px] shrink-1">
                <p className="p-body-16 font-medium !text-primary mb-2">{title}</p>
                <h3 className="p-body-24 font-bold mb-4">{subtitle}</h3>
                <p className="p-body-20 mb-4">{description}</p>
                <p className="p-body-20"><span className="font-bold">Why It Matters:</span> {whyItMatters}</p>
            </div>
            <Anim className="max-sm:w-full max-sm:h-full"/>
        </div>
    )
}