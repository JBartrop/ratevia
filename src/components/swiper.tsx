import React, { ReactNode, useEffect, useState } from "react";
import Button from "./button";


interface CarouselItems {
    items: ReactNode[];
}



const SwiperCarousel:React.FC<CarouselItems> = ({items}) => {

    const [current, setCurrent] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    useEffect(() => {
        const updateItemsPerView = () => {
            if(window.innerWidth >= 1024){
                setItemsPerView(3)
            }else if(window.innerWidth >= 768){
                setItemsPerView(2)
            }else{
                setItemsPerView(1)
            }
        }
        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, [])

    const next = () => {
        if(current < items.length - itemsPerView){
            setCurrent((prev) => prev + 1)
        }
    }

    const prev = () => {
        if (current > 0) {
            setCurrent((prev) => prev - 1);
        }
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden ">

            <div
                className="flex transition-transform duration-500 "
                style={{ transform: `translateX(-${(current * 100) / itemsPerView}%)` }}
            >
                {items.map((item, index) => (
                    <div key={index} className="flex-shrink-0 space-x-1" style={{ width: `${100 / itemsPerView}%` }}>
                        {item}
                    </div>
                ))}
            </div>

            <Button 
                type="button"
                varaint="primary" 
                size="sm" 
                value="‹" 
                onClick={prev} 
                className="absolute top-1/2 left-3 -translate-y-1/2"
                disabled={current === 0}
            />
            <Button 
                type="button"
                varaint="primary" 
                size="sm" 
                value="›" 
                onClick={next}
                className="absolute top-1/2 right-3 -translate-y-1/2"
                disabled={current === items.length - itemsPerView}
            />

            <div className="flex justify-center mt-4 absolute bottom-3 w-full">
                {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map((_, index) => (
                    <Button
                        type="button"
                        varaint="primary" 
                        size="sm"
                        value=""
                        key={index}
                        onClick={() => setCurrent(index * itemsPerView)}
                        className={`w-1 h-1 mx-1 rounded-full transition ${
                          index === current
                            ? "bg-[rgb(var(--primary))]"
                            : "bg-gray-300 hover:bg-gray-400"
                         }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default SwiperCarousel;