import {StarIcon} from "@heroicons/react/20/solid/index.js";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { convertLongToDate } from "../../../utils/utils";
import { Avatar } from "@nextui-org/react";

const posts = [
    {
        id: 1,
        title: "Excellent Fade and Great Service",
        href: "#",
        description: "The barber was highly skilled and gave me the perfect fade. The shop was clean, and the staff was very friendly. I would highly recommend this place to anyone looking for a great haircut.",
        date: "Aug 12, 2024",
        datetime: "2024-08-12",
        category: {
            title: "Haircut",
            href: "#"
        },
        author: {
            name: "John Doe",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=faces&fit=crop&w=256&h=256"
        },
        rating: 5
    },
    {
        id: 2,
        title: "Great Atmosphere and Professional Staff",
        href: "#",
        description: "I had a fantastic experience at this barbershop. The atmosphere is very welcoming, and the staff is professional. My beard trim was done with precision, and I left feeling great.",
        date: "Jul 28, 2024",
        datetime: "2024-07-28",
        category: {
            title: "Beard Trim",
            href: "#"
        },
        author: {
            name: "Emily Smith",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=faces&fit=crop&w=256&h=256"
        },
        rating: 4
    },
    {
        id: 3,
        title: "Quick and Efficient Service",
        href: "#",
        description: "Needed a quick trim and was in and out in no time. The barber understood exactly what I wanted and delivered perfectly. Highly efficient service!",
        date: "Jun 15, 2024",
        datetime: "2024-06-15",
        category: {
            title: "Quick Trim",
            href: "#"
        },
        author: {
            name: "Alex Johnson",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=faces&fit=crop&w=256&h=256"
        },
        rating: 4
    },
    {
        id: 4,
        title: "Fantastic Styling and Friendly Staff",
        href: "#",
        description: "This place is top-notch! The stylist really knew their stuff and gave me a fantastic new look. The staff was incredibly friendly and made the whole experience enjoyable.",
        date: "May 20, 2024",
        datetime: "2024-05-20",
        category: {
            title: "Styling",
            href: "#"
        },
        author: {
            name: "Sophia Lee",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=256&h=256"
        },
        rating: 5
    },
    {
        id: 5,
        title: "Good Haircut but Long Wait",
        href: "#",
        description: "The haircut was good, but I had to wait longer than expected. The shop was busy, so I understand, but it would be better if they managed appointments more efficiently.",
        date: "Apr 05, 2024",
        datetime: "2024-04-05",
        category: {
            title: "Haircut",
            href: "#"
        },
        author: {
            name: "David Brown",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1724814650005-12829d77afdb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        rating: 3
    },
    {
        id: 6,
        title: "Amazing Haircut and Friendly Environment",
        href: "#",
        description: "The barber gave me an amazing haircut, and the environment was very friendly. The whole experience was great, and I'll definitely be coming back.",
        date: "Aug 20, 2024",
        datetime: "2024-08-20",
        category: {
            title: "Haircut",
            href: "#"
        },
        author: {
            name: "James Carter",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1618515752143-5ce13affb1e8?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        rating: 5
    },
    {
        id: 7,
        title: "Stylish Beard Trim with Attention to Detail",
        href: "#",
        description: "The barber really paid attention to detail when trimming my beard. The result was stylish and exactly what I wanted. Highly recommend this place for beard trims!",
        date: "Jul 15, 2024",
        datetime: "2024-07-15",
        category: {
            title: "Beard Trim",
            href: "#"
        },
        author: {
            name: "William Johnson",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=256&h=256"
        },
        rating: 5
    },
    {
        id: 8,
        title: "Good Haircut but Expensive",
        href: "#",
        description: "The haircut was good, but I found the price to be a bit on the higher side compared to other places. Still, the quality of service was excellent.",
        date: "Jun 10, 2024",
        datetime: "2024-06-10",
        category: {
            title: "Haircut",
            href: "#"
        },
        author: {
            name: "Sarah Evans",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=256&h=256"
        },
        rating: 4
    },
    {
        id: 9,
        title: "Friendly Staff but Average Haircut",
        href: "#",
        description: "The staff was very friendly, but the haircut was just average. I was expecting a bit more given the price and reviews. Overall, it was an okay experience.",
        date: "May 25, 2024",
        datetime: "2024-05-25",
        category: {
            title: "Haircut",
            href: "#"
        },
        author: {
            name: "Robert King",
            role: "Customer",
            href: "#",
            imageUrl: "https://images.unsplash.com/photo-1542385262-cdf06b302c2c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        rating: 3
    },
]

const reviews = {href: '#', average: 4, totalCount: 117}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ReviewsRating({ data }) {
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        setReviews(data)
        console.log("review", data)
        window.scrollTo(0, 0)
    }, [data]);


    return (
        <div className="bg-white py-5 sm:py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reviews & Ratings</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        See how users feel about this Barbershop.
                    </p>
                </div>
                <div
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    
                    {data.length <= 0 && <p className="text-2xl font-bold text-gray-900">No reviews yet</p>}


                    
                    {data.length > 0 && data.map((review) => (
                        <article key={review.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={review.createdAt} className="text-gray-500">
                                    {convertLongToDate(review.createdAt)}
                                </time>

                                {
                                    review?.services?.map((post, index) => (
                                        <a 
                                            key={index}
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post}
                                        </a>
                                        
                                    ))
                                }

                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a className="flex items-center gap-2  text-sm">
                                    <Avatar size="sm" name={review.customer_name} />
                                        <span className="absolute inset-0"/>
                                        {review.customer_name}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{review.comment}</p>
                            </div>
                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                      <Rating initialValue={review.rating} size={20} readonly />
                                    </div>
                                    <p className="sr-only">{review.rating} out of 5 stars</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}