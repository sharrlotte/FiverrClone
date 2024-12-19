import React, { useState } from 'react';

const NewRating = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        // Xử lý gửi đánh giá
        console.log('Đánh giá:', rating, 'Nhận xét:', comment);
        // Thêm logic gửi đánh giá đến server ở đây
    };

    return (
        <div>
            <h2>Tạo Đánh Giá Mới</h2>
            <div>
                <textarea 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Nhập nhận xét của bạn"
                />
            </div>
            <div>
                <span>Chọn số sao: </span>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star} 
                        onClick={() => setRating(star)} 
                        style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <button onClick={handleSubmit}>Gửi Đánh Giá</button>
        </div>
    );
};

export default NewRating;
