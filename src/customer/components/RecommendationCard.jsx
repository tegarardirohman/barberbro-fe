import {StarIcon} from "@heroicons/react/20/solid/index.js";

const products = [
    {
        id: 1,
        name: 'Eleven Four Barbershop',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1678356164573-9a534fe43958?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Hail Joel Men\'s Salon',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1672642150048-fbfa1634804f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Captain Hook Barber',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1672257493395-c6cb634397e2?q=80&w=1881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Pullman Greatest',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1499366440726-52cbc45a5c3b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 5,
        name: 'Nashville Gold Barber',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1672667176895-7ec481ca6096?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 6,
        name: 'All About Barber',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1593702265374-bf6398700204?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 7,
        name: 'JP. Morgan Barber',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1522123436910-416191f97bfe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 8,
        name: 'Barber Bro',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1589985523654-936539ff49c0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Rates',
    }
]

const reviews = {href: '#', average: 4, totalCount: 117}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RecommendationCard() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                <div className="flex flex-row justify-between pr-2">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Popular Barbershop</h2>
                    <button className="border-2 border-zinc-900 px-4 hover:bg-zinc-900 hover:text-white rounded">See
                        all
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-md font-bold text-zinc-900">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {product.name}
                                        </a>
                                    </h3>
                                    {/* Reviews */}
                                    <div className="mt-2">
                                        <h3 className="sr-only">Reviews</h3>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                            'h-3 w-3 flex-shrink-0',
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <p className="sr-only">{reviews.average} out of 5 stars</p>
                                            <a href={reviews.href}
                                               className="ml-3 text-sm font-medium text-zinc-900 hover:text-zinc-800">
                                                {reviews.totalCount} reviews
                                            </a>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="size-3">
                                        <path fillRule="evenodd"
                                              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <p className="px-1 text-xs text-zinc-900">3.2 Km</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}