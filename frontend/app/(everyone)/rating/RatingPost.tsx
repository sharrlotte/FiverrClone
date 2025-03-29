import React from 'react';

interface RatingPostProps {
    rating: number;
    comment: string;
}

const RatingPost: React.FC<RatingPostProps> = ({ rating, comment }) => {
    return (
        <div className='flex flex-col rounded-xl p-2 g-2 shadow-md border-spacing-3'>
            <div>
            
            </div>
            <div>
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
            </div>
            <p>{comment}</p>
        </div>
    );
};

export default RatingPost;