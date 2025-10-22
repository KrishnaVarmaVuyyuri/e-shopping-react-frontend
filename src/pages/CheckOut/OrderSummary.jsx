import dayjs from 'dayjs';
import React, { useState } from 'react';
import axios from 'axios';
import DeliveryOptions from './DeliveryOptions';

export default function OrderSummary({ deliveryOptions, selectedDeliveryOption, cartItem, loadCart }) {
  const [showUpdateFeature, setShowUpdateFeature] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (showUpdateFeature) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setShowUpdateFeature(false);
    } else {
      setShowUpdateFeature(true);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} alt={cartItem.product.name} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">${(cartItem.product.priceCents / 100).toFixed(2)}</div>

          <div className="product-quantity">
            <span>
              Quantity:
              {showUpdateFeature ? (
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="text"
                  style={{ width: '50px' }}
                  onKeyDown={(e) => {
                    const keyPressed = e.key;
                    if (keyPressed === 'Enter') {
                      updateQuantity();
                    } else if (keyPressed === 'Escape') {
                      setQuantity(cartItem.quantity);
                      setShowUpdateFeature(false);
                    }
                  }}
                />
              ) : (
                <span className="quantity-label">{cartItem.quantity}</span>
              )}
            </span>

            <span className="update-quantity-link link-primary" onClick={updateQuantity}>
              Update
            </span>

            <span
              className="delete-quantity-link link-primary"
              onClick={async () => {
                await axios.delete(`/api/cart-items/${cartItem.productId}`);
                await loadCart();
              }}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
      </div>
    </div>
  );
}
