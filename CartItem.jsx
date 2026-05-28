import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Tính tổng số tiền của toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0).toFixed(2);
  };

  // Tính tổng tiền cho từng loại cây cụ thể
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert("Checkout functionality is Coming Soon!");
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      <div className="cart-items-list" style={{ marginTop: '20px' }}>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', borderRadius: '4px' }} />
            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>Unit Price: ${item.cost}</p>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <button onClick={() => handleRemove(item.id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
