import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopicForm from '../components/TopicForm';
import Sidebar from '../components/Sidebar';
import FinalResult from '../components/FinalResult';

const Notes = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const credits = userData.credits;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  console.log("RESULTS STATE:", results);
console.log("RESULTS.DATA:", results);

  return (
    <div className='min-h-screen bg-gradient-br from-gray-100 to-gray-300 px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className='mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] items-start flex md:items-center gap-6 justify-between flex-col md:flex-row'>
        <div className='cursor-pointer' onClick={() => navigate('/')}>
          <h1 className='text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>ExamNotesAI</h1>
          <p className='text-sm text-white/80 mt-4'>AI-powered study notes and exam preparation resources</p>
        </div>

        <div className='flex items-center gap-6 flex-wrap'>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm" onClick={() => navigate('/pricing')}>
            <span className=' text-xl'>💎</span>
            <span>{credits}</span>
            <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.97 }}
              className='ml-2 h-5 w-5 rounded-full bg-white text-black text-xs flex items-center justify-center font-bold cursor-pointer'>
              ➕
            </motion.span>
          </button>

          <button className='px-4 py-3 rounded-full text-sm font-medium bg-white/10 border border-white/20 transition flex items-center gap-2 text-white shadow-md hover:shadow-lg cursor-pointer' onClick={() => navigate('/history')}>
            📚 Your Notes History

          </button>
        </div>

      </motion.header>

      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12">
        <TopicForm setResults={setResults} setLoading={setLoading} loading={loading} setError={setError} />

      </motion.div>

      {loading && (
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
          className='text-center text-black font-medium mb-6'>
          Generating exam-focused notes, please wait...
        </motion.div>
      )}

      {error && (
        <div className='text-center text-red-600 font-medium mb-6'>
          {error}
        </div>
      )}



      {!results &&
        <motion.div whileHover={{ scale: 1.05 }}
          className='h-64 rounded-2xl flex flex-col items-center justify-center bg-white/50 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner'>
          <span className='text-4xl mb-3 '>📝</span>
          <p className='text-sm'>Your generated notes will appear here...</p>
        </motion.div>
      }



      {results &&
        <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col lg:grid lg:grid-cols-4 gap-6'>
          <div className='lg:col-span-1'>
            <Sidebar results={results} />
          </div>

          <div className='lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6'>
            <FinalResult results={results} />
          </div>

        </motion.div>
      }

    </div>
  )
}

export default Notes
