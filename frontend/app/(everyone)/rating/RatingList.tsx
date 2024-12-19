"use client";
import React, { useState } from 'react';
import RatingPost from './RatingPost';

const RatingList = () => {
    const [ratings, setRatings] = useState<{ rating: number; comment: string }[]>([
        { rating: 4, comment: 'Tốt' },
        { rating: 5, comment: 'Rất tốt' },
        { rating: 3, comment: 'Bình thường' },
    ]);

    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    return (
        <div>
            <h2>Đánh Giá ({ratings.length})</h2>
            <div>
                <span>Điểm trung bình: {averageRating.toFixed(1)} ★</span>
            </div>
            {ratings.map((rating, index) => (
                <RatingPost key={index} rating={rating.rating} comment={rating.comment} />
            ))}
        </div>
    );
};

export default RatingList;
