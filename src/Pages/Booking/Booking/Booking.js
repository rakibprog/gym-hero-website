import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const {servicesId} = useParams();
    const [booking,setBooking] = useState([]);
    useEffect(()=>{
        fetch('/fakeData.json')
        .then(res=> res.json())
        .then(data => setBooking(data));
    },[]);
    console.log(booking);
    const  book = booking.filter(book => book.servicesId === servicesId);
    console.log(book);
    return (
        <div>
            <h2> this is booking {servicesId}</h2>
        </div>
    );
};

export default Booking;