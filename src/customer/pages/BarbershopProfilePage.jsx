import NavbarBarber from "../components/NavbarBarber";
import BarbershopOverview from "../components/BarbershopOverview";
import ReviewsRating from "../components/ReviewsRating";

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