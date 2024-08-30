import {NavbarBarber} from "../components/NavbarBarber.jsx";
import BarbershopOverview from "../components/BarbershopOverview.jsx";
import ReviewsRating from "../components/ReviewsRating.jsx";

export default function BarbershopProfilePage() {
    return (
        <>
            <NavbarBarber/>
            <main className="mx-20 my-5">
                <BarbershopOverview/>
                <ReviewsRating/>
            </main>
        </>

    )
}