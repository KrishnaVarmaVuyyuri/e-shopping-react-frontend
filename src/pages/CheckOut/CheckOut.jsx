import React, { useState, useEffect } from 'react'
import './CheckOut.css'
import dayjs from 'dayjs'
import CheckOutHeader from './CheckOutHeader'
import axios from 'axios'
import DeliveryOptions from './DeliveryOptions'
import { useNavigate } from 'react-router-dom'
import OrderSummary from './OrderSummary'



export default function CheckOut({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState({})
  const [showUpdateFeature, setShowUpdateFeature] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        response.json().then((data) => {
          setDeliveryOptions(data)
        })
      })


    fetch('/api/payment-summary')
      .then((response) => {
        response.json().then((data) => {
          setPaymentSummary(data)
        })
      })

  }, [cart])





  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/shopping-cart.png" />
      <title>Checkout</title>
      <CheckOutHeader />


      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
              const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;

              })
              return (
                <OrderSummary key={cartItem.productId} selectedDeliveryOption={selectedDeliveryOption} cartItem={cartItem} loadCart={loadCart} deliveryOptions={deliveryOptions} />
                
              )
            })}


          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>
            {paymentSummary && (<> <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">${(paymentSummary.productCostCents / 100).toFixed(2)}</div>
            </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">${(paymentSummary.shippingCostCents / 100).toFixed(2)}</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">${(paymentSummary.totalCostBeforeTaxCents / 100).toFixed(2)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">${(paymentSummary.taxCents / 100).toFixed(2)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">${(paymentSummary.totalCostCents / 100).toFixed(2)}</div>
              </div>

              <button className="place-order-button button-primary" onClick={
                async () => {
                  await axios.post('/api/orders')
                  await loadCart()
                  navigate('/orders')
                }
              }>
                Place your order
              </button>  </>)

            }

          </div>
        </div>
      </div>
    </>
  )
}
