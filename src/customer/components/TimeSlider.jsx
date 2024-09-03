import {Button} from "@nextui-org/react";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";

const times = [
    {
        id: 1,
        time: "09:00"
    },
    {
        id: 2,
        time: "10:00"
    },
    {
        id: 3,
        time: "11:00"
    },
    {
        id: 4,
        time: "12:00"
    },
    {
        id: 5,
        time: "13:00"
    },
    {
        id: 6,
        time: "14:00"
    },
    {
        id: 7,
        time: "15:00"
    },
    {
        id: 8,
        time: "16:00"
    },
    {
        id: 9,
        time: "17:00"
    },
]

export default function TimeSlider() {
    return (
        <div className="flex justify-between items-center">
            <Button size="sm" variant="secondary" onClick={() => {
            }}>
                <FaArrowCircleLeft size={20}/>
            </Button>
            <div className="flex flex-wrap gap-4">
                {times.map((item, index) => (
                    <Button
                        key={index}
                        onClick={() => {
                        }}
                        variant="ghost"
                    >
                        {item.time}</Button>
                ))}
            </div>
            <Button size="sm" variant="secondary" onClick={() => {
            }}>
                <FaArrowCircleRight size={20}/>
            </Button>
        </div>
    )
}