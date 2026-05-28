import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: "Air Purifying",
    plants: [
      { id: 1, name: "Snake Plant", cost: "$15", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150" },
      { id: 2, name: "Spider Plant", cost: "$12", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=150" },
      { id: 3, name: "Peace Lily", cost: "$18", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=150" },
      { id: 4, name: "Boston Fern", cost: "$14", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=150" },
      { id: 5, name: "Aloe Vera", cost: "$10", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=150" },
      { id: 6, name: "English Ivy", cost: "$16", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=150" }
    ]
  },
  {
    category: "Aromatic",
    plants: [
      { id: 7, name: "Lavender", cost: "$20", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=150" },
      { id: 8, name: "Rosemary", cost: "$15", image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=150" },
      { id: 9, name: "Mint", cost: "$8", image: "https://images.unsplash.com/photo-1603513492128-ba909bca7477?w=150" },
      { id: 10, name: "Basil", cost: "$9", image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=150" },
      { id: 11, name: "Jasmine", cost: "$22", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150" },
      { id: 12, name: "Thyme", cost: "$11", image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=150" }
    ]
  },
  {
    category: "Low Maintenance",
    plants: [
      { id: 13, name: "ZZ Plant", cost: "$25", image: "https://images.unsplash.com/photo-1632207691143-643c2a9a9361?w=150" },
      { id: 14, name: "Pothos", cost: "$13", image: "https://images.unsplash.com/photo-1598880940375-4a4eafb049c4?w=150" },
      { id: 15, name: "Cast Iron Plant", cost: "$30", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=150" },
      { id: 16, name: "Jade Plant", cost: "$14", image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=150" },
      { id: 17, name: "Succulent", cost: "$7", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=150" },
      { id: 18, name: "Chinese Evergreen", cost: "$19", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=150" }
    ]
  }
];

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Tính tổng số lượng sản phẩm để cập nhật nhãn giỏ hàng động
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantId) => {
    return cartItems.some(item => item.id === plantId);
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#2c3e50', color: 'white' }}>
        <div><h3 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h3></div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer' }}>
            Cart ({totalCartCount})
          </span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-listing" style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} className="category-section">
              <h2>{categoryObj.category} Plants</h2>
              <div className="plants-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {categoryObj.plants.map(plant => (
                  <div key={plant.id} className="plant-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '180px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', borderRadius: '4px' }} />
                    <h4>{plant.name}</h4>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)} 
                      disabled={isPlantInCart(plant.id)}
                      style={{ backgroundColor: isPlantInCart(plant.id) ? '#bdc3c7' : '#2ecc71', color: 'white', padding: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
                    >
                      {isPlantInCart(plant.id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
