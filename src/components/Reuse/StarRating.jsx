import React from 'react';
import StarFilledSvg from '../../Assets/Svgs/StarFilledSvg';
import StarSvg from '../../Assets/Svgs/StarSvg';

export const StarRating = ({ rating }) => {
    const stars = [];
    // Create an array of five stars
    for (let i = 1; i <= 5; i++) {
        // Determine whether each star should be filled or empty based on the rating
        const starIcon = i <= rating ? <StarFilledSvg key={i} /> : <StarSvg key={i} />;
        stars.push(starIcon);
    }

    return (
        <div>
            {stars}
        </div>
    );
};
