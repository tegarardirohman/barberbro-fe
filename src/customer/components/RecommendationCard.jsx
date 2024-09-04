import {StarIcon} from "@heroicons/react/20/solid/index.js";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { getImageUrl } from "../../utils/utils";
import { Rating } from "react-simple-star-rating";

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
    const [datas, setDatas] = useState([])
    const { response, error, loading, request } = useAxios();


    const fetchDatas = async () => {
        try {
            const result = await request('/barbers');
            setDatas(result.data);
            console.log(datas)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchDatas();
    }, []);




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


                    {datas.map((data) => (
                        <div key={data.id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt={data.barbershop_profile_picture_id.name}
                                    src={getImageUrl(data.barbershop_profile_picture_id.path)}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>

                            <h3 className="text-md font-bold text-zinc-900 mt-2">
                                { data.name }
                            </h3>

                            <div className="w-full flex items-end justify-start gap-2">
                                <Rating initialValue={data.average_rating} size={20} readonly />
                                <div className="text-xs font-light"> ( {data.review_count} Reviews) </div>
                            </div>


                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
}