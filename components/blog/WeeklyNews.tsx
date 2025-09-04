export const WeeklyNews = ({ isPost = false }: { isPost?: boolean }) => {
    return (
        <div className={`flex justify-between items-center gap-6 linear-card rounded-4xl px-8 py-16 text-standart-white ${isPost ? 'flex-wrap' : 'sm:flex-nowrap flex-wrap'}`}>
            <div className={`${isPost ? 'w-full' : 'max-w-[541px]'}`}>
                <h2 className="h2 !mb-4 !text-standart-white">
                    Weekly newsletter
                </h2>
                <p className="p-body-20 !mb-0 !text-standart-white">
                    No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.
                </p>
            </div>
            <form className={`flex gap-4 items-end max-sm:w-full ${isPost ? 'flex-row max-sm:flex-wrap justify-end' : 'flex-col'}`}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="input bg-standart-white sm:w-[416px] w-full text-accent-foreground" 
                />
                <button className="btn btn-white !w-max">Subscribe</button>
            </form>
        </div>
    )
}