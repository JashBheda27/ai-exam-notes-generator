import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serverURL } from '../App';
import axios from 'axios';

function Pricing() {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try{
      setPayingAmount(amount);
      setPaying(true);
      const result = await axios.post(serverURL + "/api/credit/order", { amount }, { withCredentials: true });

      if(result.data.url){
        window.location.href = result.data.url;
      }
      setPaying(false);
    } catch (error) {
      console.error('Error occurred while processing payment:', error);
      setPaying(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-12 relative'>
      <button className='flex items-center gap-2 text-gray-700 hover:text-black mb-6 cursor-alias' onClick={() => navigate('/')}>
        ⬅️ Back 
      </button>

      <motion.div initial={{ opacity: 0, y: -10}}
        animate={{ opacity: 1, y: 0 }}
        className='text-center mb-12'>
      <h1 className='text-3xl font-bold'>Buy Credits</h1>
      <p className='text-gray-600 mt-2'>Choose a plan that suits your needs</p>
      </motion.div>

      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        <PricingCard 
        title="Basic"
        price="Rs 100"
        amount={100}
        credits="50 credits"
        description="Perfect for quick revisions"
        features={[
          "Generate AI notes",
          "Access to basic features",
          "Diagram and Charts support",
          "Fast generation"
        ]}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        onBuy={handlePaying}
        paying={paying}
        payingAmount={payingAmount}
         />

         <PricingCard 
          popular
          title="Popular"
          price="Rs 200"
          amount={200}
          credits="120 credits"
          description="Best value for students"
          features={[
            "All Starter features",
            "More credits per purchase",
            "Revision Mode Support",
            "Priority AI response"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
         />

          <PricingCard
          title="Pro Learner"
          price="Rs 500"
          amount={500}
          credits="350 credits"
          description="For serious learners and exam takers"
          features={[
            "All Premium features",
            "Maximum credits value",
            "Unlimited Revisions",
            "Ideal for full syllabus preparation"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
         />

      </div>
    </div>
  )
}

function PricingCard({
    title, price, amount, features , credits , description , popular , selectedPrice , setSelectedPrice , onBuy , paying , payingAmount
}) {

  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;

  return (
    <motion.div whileHover={{ y:-4}} onClick={() => setSelectedPrice(amount)}
    className={`relative cursor-pointer p-6 rounded-xl bg-white border transition ${isSelected ? 'border-black' : popular ? "border-indigo-500" : "border-gray-200"}`}>
      { popular &&  !isSelected && <span className='absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-600 text-white'>Popular </span>}

      { isSelected && <span className='absolute top-4 right-4 text-xs px-2 py-1 rounded bg-black text-white'>Selected</span> }

      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='text-gray-600 text-sm mt-2'>{description}</p>

      <div className='mt-4'>
        <p className='text-3xl font-bold'>{price}</p>
        <p className='text-indigo-600 text-sm'>{credits}</p>
      </div>

      <button disabled={isPayingThisCard} onClick={(e) => { e.stopPropagation(); onBuy(amount) }}
      className={`w-full mt-6 py-2 rounded-lg font-medium transition cursor-pointer
      ${isPayingThisCard 
      ? 'bg-gray-300 cursor-not-allowed' 
      : isSelected
      ? 'bg-black text-white '
      : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
        {isPayingThisCard ? 'Redirecting...' : 'Buy Now'}
      </button>

      <ul className ='mt-5 space-y-2 text-sm text-gray-600'>
        {features.map((f, i) => (
       <li key={i} className='flex gap-2'>
        <span className='text-green-600'>✓</span>
        {f}
       </li>
        ))}
      </ul>

    </motion.div>
)}

export default Pricing
