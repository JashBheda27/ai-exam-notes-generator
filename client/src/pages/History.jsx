import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverURL } from '../App';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import FinalResult from '../components/FinalResult.jsx';

function History() {
  const [topics, setTopics] = useState([])
   const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const credits = userData.credits;

  useEffect(() => {
const myNotes = async () => {
    try {
      const res = await axios.get(serverURL +"/api/notes/getnotes" , { withCredentials: true });
      console.log(res.data)
      setTopics(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }
  myNotes();
  }, [])
  
  const openNote = async (noteId) => {
    setLoading(true);
    setActiveNote(noteId);
    try {
      const res = await axios.get(serverURL + `/api/notes/${noteId}`, { withCredentials: true });
      setSelectedNote(res.data?.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching note:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-8'>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-10 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10 px-8 py-6 items-center flex justify-between md:items-center gap-4 flex-col md:flex-row shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
      >
        <div className='cursor-pointer' onClick={() => navigate('/')}>
                  <h1 className='text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>ExamNotesAI</h1>
                  <p className='text-sm text-white/80 mt-4'>AI-powered study notes and exam preparation resources</p>
                </div>
        
                <div className='flex items-center gap-6 flex-wrap'>
              {!isSidebarOpen &&  <button className='lg:hidden text-white text-2xl cursor-pointer' onClick={() => setIsSidebarOpen(true)}>
                    <GiHamburgerMenu />
                  </button>}
                  
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm" onClick={() => navigate('/pricing')}>
                    <span className=' text-xl'>💎</span>
                    <span>{credits}</span>
                    <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.97 }}
                      className='ml-2 h-5 w-5 rounded-full bg-white text-black text-xs flex items-center justify-center font-bold cursor-pointer'>
                      ➕
                    </motion.span>
                  </button>

                </div>

      </motion.header>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <AnimatePresence>
          { isSidebarOpen  && 
            <motion.div 
              initial={{ x: -320}}
              animate={{ x: 0 }}
              exit={{ x: -320}}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className='fixed lg:static top-0 left-0 z-50 lg:z-auto w-72 lg:w-auto h-full lg:h-[75vh] lg:col-span-1 bg-black/90 lg:bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-5 overflow-y-auto lg:rounded-3xl'> 
              <button onClick={() => setIsSidebarOpen(false)} className='lg:hidden text-white mb-4 cursor-pointer'>
                ⬅️ back

              </button>

              <div className='mb-4 space-y-1'>
                <button onClick={() => navigate('/notes')} 
                className='w-full px-3 py-2 rounded-lg text-sm text-gray-300 bg-white/10 hover:bg-white/20 cursor-pointer'>
                  ➕ New Notes
                </button>

                <hr className='border-white/30 mb-4'/>

                <h2 className='text-lg font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>
                  📋Your Notes
                </h2>

                {topics.length === 0 && (
                  <p className='text-gray-400 text-sm'>No notes created yet.</p>
                )}

                <ul className='space-y-3'>
                  {topics.map((t , i)=>(
                    <li key={i} onClick={() => {
                      openNote(t._id);
                    }} className={`cursor-pointer p-3 rounded-xl transition-all
                    ${activeNote === t._id
                    ? "bg-indigo-600/30 border-indigo-400 shadow-[0_0_0_2px_rgba(99,102,241,0.7)]"
                    : "bg-white/10 border-white/20 hover:bg-white/20"}`}>
                      <p className='text-sm font-semibold text-white'>{t.topic}
                      </p>

                      <div className='mt-2 flex flex-wrap gap-2 text-xs'>
                        {t.classLevel && <span className='px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300'>ClassLevel: {t.classLevel}</span>}

                        {t.examType && <span className='px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-300'>{t.examType}</span>}
                      </div>

                      <div className='mt-2 flex gap-3 text-xs text-gray-400'>
                        {t.revisionMode && <span>⚡Revision</span>}
                        {t.includeDiagrams && <span>📊 Diagrams</span>}
                        {t.includeChart && <span>📈 Charts</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          }
        </AnimatePresence>


        <motion.div initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6}}  
        className='lg:col-span-3 p-6 rounded-2xl bg-white min-h-[75vh] shadow-[0_20px_40px_rgba(0,0,0,0.5)]'>

          {loading && <p className='text-center text-gray-500'>Loading Notes...
          </p>}
          {!loading && !selectedNote && (
            <div className='h-full flex items-center justify-center text-gray-400'>
              Select a note from the left
              </div>
          )}

          {!loading && selectedNote && <FinalResult results={selectedNote} />}
        </motion.div>
      </div>
      
    </div>
  )
}

export default History

