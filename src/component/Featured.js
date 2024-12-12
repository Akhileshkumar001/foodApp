import React from 'react';
import salad from '../image/image.png';
import pizza from '../image/masrromimage.jpg';
import panner from '../image/panner.jpg';
import './FeaturedMeals.css';

const FeaturedMeals = () => {
    return (
        <section className="featured-meals">
            <h2>Featured Meals</h2>
            <div className="meal-cards">
                <div className="meal-card">
                    <img src={salad} alt="Meal 1" />
                    <h3>Grilled Chicken Salad</h3>
                    <p>Freshly grilled chicken with a mix of greens, served with a light vinaigrette.</p>
                    <div className="meal-info">
                        <div className="nutrition">Calories: 250 | Protein: 20g</div>
                        {/* <div className="rating">⭐⭐⭐⭐☆ (4.5)</div>
                        <button className="order-btn">Order Now</button> */}
                    </div>
                </div>
                <div className="meal-card">
                    <img src={pizza} alt="Meal 2" />
                    <h3>Vegetarian Pizza</h3>
                    <p>A delicious pizza topped with fresh vegetables and mozzarella cheese.</p>
                    <div className="meal-info">
                        <div className="nutrition">Calories: 300 | Protein: 15g</div>
                        {/* <div className="rating">⭐⭐⭐⭐☆ (4.2)</div>
                        <button className="order-btn">Order Now</button> */}
                    </div>
                </div>
                <div className="meal-card">
                    <img src={panner} alt="Meal 3" />
                    <h3>Paneer Tikka</h3>
                    <p>Juicy paneer tikka served with mint chutney and fresh salad.</p>
                    <div className="meal-info">
                        <div className="nutrition">Calories: 220 | Protein: 18g</div>
                        {/* <div className="rating">⭐⭐⭐⭐⭐ (4.8)</div>
                        <button className="order-btn">Order Now</button> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedMeals;
