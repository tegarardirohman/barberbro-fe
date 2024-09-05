import NavbarBarber from "../components/NavbarBarber.jsx";
import { FooterPage } from "./FooterPage.jsx";

const people = [
    {
        name: 'Rio Dewanto',
        role: 'Product Manager',
        imageUrl:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSoslmrdJ6BcSnAbI9d78Osw7SGYqVJKiAzi4ANOttSUBJIMnu1',
    },
    {
        name: 'Chicco Jerikho',
        role: 'Front-end Developer',
        imageUrl:
            'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSdnfp4bTIOf_9fFhVMCpkmAAuI2wZj620xUbRsqroAt7b4YI9B',
    },
    {
        name: 'Nicholas Saputra',
        role: 'Back-end Developer',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFyNDd9B3e4S2G7csGgG43TQs1bU-7PMfQw&s',
    },
    {
        name: 'Vino G. Bastian',
        role: 'Mobile Developer',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jSPOEsBiqcc5woN6Lig0UPU_j6ni47uuQkk-yaC7zxGZd5mP',
    }
]

export default function AboutPage() {
    return (
        <>
            <NavbarBarber/>
            <div className="bg-white py-24 sm:py-32 min-h-screen">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our
                            leadership</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae
                            ullamcorper
                            suspendisse.
                        </p>
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="flex items-center gap-x-6">
                                    <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full"/>
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                        <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <FooterPage />
        </>
    )
}