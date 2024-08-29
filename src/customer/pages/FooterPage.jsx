export const FooterPage = () => {
    return (
        <footer className="bg-zinc-800 text-white mt-10">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 flex gap-x-10">
                <div className="w-full sm:w-1/3 mb-6">
                    <h4 className="text-lg font-semibold mb-4">About Us</h4>
                    <p className="text-gray-400">
                        We are committed to providing the best services to our customers.
                    </p>
                </div>
                <div className="w-full sm:w-1/3 mb-6">
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="text-gray-400">
                        <li className="mb-2">
                            <a href="/" className="hover:text-white">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="/services" className="hover:text-white">Services</a>
                        </li>
                        <li className="mb-2">
                            <a href="/services" className="hover:text-white">Barbershop Partners</a>
                        </li>
                        <li className="mb-2">
                            <a href="/services" className="hover:text-white">Listing Your Business</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full sm:w-1/3 mb-6">
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p className="text-gray-400">Email: barber.bro@mail.com</p>
                    <p className="text-gray-400">Phone: +62 85156906167</p>
                </div>
            </div>
            <div className="border-t border-gray-700 p-4 mt-8 text-center">
                <p>&copy; {new Date().getFullYear()} Barber Bro. All rights reserved.</p>
            </div>
        </footer>
    );
};