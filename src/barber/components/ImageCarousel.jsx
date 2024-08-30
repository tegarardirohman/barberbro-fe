import React, {useState, useEffect} from 'react';

export const ImageCarousel = () => {
    const images = [
        'https://assets-global.website-files.com/644a9d9ce529ef8812f82a28/647fb85c69e95444243ef9bd_Henley%27s%20Gentlemen%27s%20Grooming%20-%20Barbershop%20and%20Mens%20Grooming.webp',
        'https://amazingmalang.id/wp-content/uploads/2018/11/www.malangcard.com_.jpg-4-the-roots-barber-shop.jpg',
        'https://www.rajawaliparquet.com/wp-content/uploads/2023/10/Desain-barbershop-1.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div
                style={{width: '50%'}}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            display: index === currentIndex ? 'block' : 'none',
                        }}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            style={{width: '100%', height: 480, borderRadius: 10}}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};