import React, { useEffect, useState } from 'react';

const CounterCard = ({ imgSrc, target, description, altText, resetCounter }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const targetValue = parseInt(target);

        if (resetCounter) {
            setCount(0); // Reset the count when the section comes into view
        }

        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount < targetValue) {
                    return prevCount + Math.ceil(targetValue / 100);
                } else {
                    clearInterval(interval);
                    return targetValue;
                }
            });
        }, 30);

        return () => clearInterval(interval);
    }, [target, resetCounter]);

    return (
        <div className="col-lg-3 col-md-6 counterC">
            <div className="card d-flex flex-row">
                <img loading="lazy" src={imgSrc} className="card-img-left me-2" alt={altText} />
                <div className="flexCounter">
                    <p className="blueclr">
                        <span className="count">{count}</span> + &nbsp;
                        {description && <span className="desc">{description}</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CounterCard;
