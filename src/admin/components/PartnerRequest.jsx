import Pagination from "./Pagination.jsx";

const people = [
    {
        name: 'The Gentlemen Hair',
        email: 'thegentlemenhair@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Rich Joe Barbershop',
        email: 'richjoebarbershop@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Eleven Four Barbershop',
        email: 'elevenfour@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Pullman Barbershop',
        email: 'pullmancollab@example.com',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Mr. British Men Salon',
        email: 'britishmen@example.com',
        role: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Captain Hook Care',
        email: 'captain.hook@example.com',
        role: 'Director of Product',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]

export default function PartnerRequest() {
    return (
        <div className="border-2 p-4 rounded-lg">
            <div className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col">
                    <h2 className="font-bold text-2xl py-4">Partner Listing Requests</h2>
                    <div className="flex flex-row gap-x-2">
                        <h2 className="font-bold">29 total,</h2>
                        <h3 className="text-zinc-600">proceed to resolve them</h3>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-x-6">
                    <div className="text-center">
                        <h2 className="font-bold text-2xl">25</h2>
                        <p className="text-sm text-zinc-700">Done</p>
                    </div>
                    <div className="bg-zinc-300 h-10 w-[2px] rounded"></div>
                    <div className="text-center">
                        <h2 className="font-bold text-2xl">57</h2>
                        <p className="text-sm text-zinc-700">Waiting List</p>
                    </div>
                </div>
            </div>
            <hr/>
            <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                    <li key={person.email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50"/>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                            {person.lastSeen ? (
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                </p>
                            ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination/>
        </div>
    )
}