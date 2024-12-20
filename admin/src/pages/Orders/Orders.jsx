import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [order, setOrder] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrder(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })

    if(response.data.success){
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          order.map((odr, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {
                    odr.items.map((item, index) => {
                      if (index == odr.items.length - 1) {
                        return item.name + " x " + item.quantity
                      }
                      else {
                        return item.name + " x " + item.quantity + ", "
                      }
                    })
                  }
                </p>
                <div className='order-item-name'>
                  <p>{odr.address.firstName + " " + odr.address.lastName}</p>
                </div>
                <div className="order-item-address">
                  <p>{odr.address.street + ", "}</p>
                  <p>{odr.address.city + ", " + odr.address.state + ", " + odr.address.country + ", " + odr.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{odr.address.phone}</p>
              </div>
              <p>Items : {odr.items.length}</p>
              <p>₹{odr.amount}</p>
              <select onChange={(event)=>statusHandler(event,odr._id)} value={odr.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
