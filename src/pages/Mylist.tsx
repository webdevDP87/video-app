import { Footer } from './../components/Footer'

type ListProps = {
    myList: any
}

export const Mylist = (props: ListProps) => {

    const { myList } = props;

    return (
        <>
            <div className="mylist relative">
                <div className="bg-neutral-900 flex flex-col gap-y-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 focus-within:z-10 focus:z-10 hover:z-10 group sticky top-12">
                    <h2 className="text-2xl text-neutral-200 font-bold">My list</h2>
                </div>
                <div className="flex flex-col gap-y-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-40">
                    {!myList &&  <h3 className="mb-40">List is empty! Feel free to fill it!</h3>}
                </div>
            </div>

            <Footer />

        </>
    )
}