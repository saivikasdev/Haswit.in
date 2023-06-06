import React, { useEffect } from 'react'
import './Payment.css'
import { Navigate, useNavigate } from 'react-router-dom'
import haswit_image from './images/HASWIT.png'
import Cookies from 'universal-cookie'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import { db } from './firebase-config'
import Loader from './components/Loader'
const Payment = () => {


  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
   const navigate = useNavigate();

   const loadScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        let src = script.src;
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }
  
  
    const DisplayRazoprpay = async () => {
  
      // const data = fetch("http://localhost:4000/razorpay", {
      //   method: 'POST'
      // }).then((t) => t.json())
  
      await fetch(`http://localhost:4000/razorpay`)
      .then((response) => response.json())
      .then((data) => {
  
  
      const options = {
        key: 'rzp_test_G8duUJowyZ1ANE',
        currency: data.currency,
        amount: data.amount,
        Image: haswit_image,
        order_id: data.id,
        handler: async function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          toast('Payment succesfull..😉😉', {
            position: toast.POSITION.BOTTOM_LEFT,
            className: 'toast-message'
        });
          await setDoc(doc(db, "All_users",''+ cookies.get('user').phoneNumber), {
            payment:true,
            payment_id:response.razorpay_payment_id,
            order_id:response.razorpay_order_id,
            signature:response.razorpay_signature

          }).then(()=>{
            console.log('setted...');
          navigate("/Complete_details");

          });

          


      },
        prefill:
        {
          "contact": cookies.get('user').phoneNumber,
        },
  
      }
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
  
    })
    .catch((error) => {
      console.error(error);
    });
  
    }
  
  
    useEffect(() => {
  
  
      
  
  
  
  
      console.log('frontend runnig sai')
  
      loadScript("https://checkout.razorpay.com/v1/checkout.js")
  
    }, [])
  
  
  
    return (
      <section className='Payment'>
        <h1>
         Welcome to Haswit's Full stack development 
        </h1>
        <button onClick={DisplayRazoprpay}>
          Enroll now
        </button>
        {Loader === true ? (
          <>
            <div className="Loader">
      </div>
          </>
        ) : null}
        <ToastContainer />
      <div id="Recaptcha"></div>
      {
      (loading)?
      <Loader/>:null}
      </section>
    );
}

export default Payment