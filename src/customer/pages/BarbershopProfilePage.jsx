import NavbarBarber from "../components/NavbarBarber";
import BarbershopOverview from "../components/barberProfile/BarbershopOverview";
import ReviewsRating from "../components/barberProfile/ReviewsRating";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function BarbershopProfilePage() {
    const { id } = useParams();
    const { response, error, loading, request } = useAxios();
    const [data, setData] = useState({});
    const [reviews, setReviews] = useState([]);
    useDocumentTitle(`Barberbro - ${data.name}`);
    
    const fetchData = async () => {
        try {
            const res = await request(`/barbers/${id}`);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchReviews = async () => {
        try {
            const res = await request(`/reviews/${id}`);
            setReviews(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
        // fetchReviews();
    }, [])


    return (
        <>
            <NavbarBarber/>

            <main className="mx-20 mt-36">
                <BarbershopOverview data={data}/>
                <ReviewsRating/>
            </main>
        </>

    )
}