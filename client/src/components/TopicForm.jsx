import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { generateNotes } from '../services/api';
import { useDispatch } from 'react-redux';
import { updateCredits } from '../redux/userSlice';

function TopicForm({ setResults, setLoading, loading, setError }) {
    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setRevisionMode] = useState(false);
    const [includeDiagrams, setIncludeDiagrams] = useState(false);
    const [includeChart, setIncludeChart] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic or question.");
            return;
        }

        setError("")
        setLoading(true);
        setResults(null);

        try {
            const result = await generateNotes({
                topic,
                classLevel,
                examType,
                revisionMode,
                includeDiagrams,
                includeChart
            });
            setResults(result.data);
            setLoading(false);
            setClassLevel("");
            setTopic("");
            setExamType("");
            setRevisionMode(false);
            setIncludeDiagrams(false);
            setIncludeChart(false);

            if(typeof result.remainingCredits === "number"){
                dispatch(updateCredits(result.remainingCredits));
            }
        } catch (error) {
            setError("Failed to fetch notes. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading) {
            setProgress(0);
            setProgressText("");
            return;
        }

        let value = 0;

        const interval = setInterval(() => {
            value += Math.random() * 8; // Increment progress by a random value between 0 and 10

            if (value >= 95) {
                value = 95;
                setProgressText("Almost done...");
                clearInterval(interval);
            } else if (value >= 70) {
                setProgressText("Generating detailed notes...");
            } else if (value >= 40) {
                setProgressText("Analyzing the topic...");
            } else {
                setProgressText("Generating notes...");
            }

            setProgress(Math.floor(value));
        }, 700);

          return()=> clearInterval(interval);
    }, [loading])

    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='rounded-2xl bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white'>
            <input className='w-full p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' placeholder='Enter your topic or question...' onChange={(e) => setTopic(e.target.value)}
                value={topic} />

            <input className='w-full p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' placeholder='Enter your class level... (eg : 10th, 12th)' onChange={(e) => setClassLevel(e.target.value)}
                value={classLevel} />

            <input className='w-full p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' placeholder='Enter your exam type... (eg : CBSE , JEE)' onChange={(e) => setExamType(e.target.value)}
                value={examType} />

            <div className='flex flex-col gap-4 md:flex-row '>
                <Toggle label="Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
                <Toggle label="Include Diagrams" checked={includeDiagrams} onChange={() => setIncludeDiagrams(!includeDiagrams)} />
                <Toggle label="Include Chart" checked={includeChart} onChange={() => setIncludeChart(!includeChart)} />
            </div>

            <motion.button onClick={handleSubmit}
                whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.95 } : {}} disabled={loading}
                className={`w-full mt-4 py-3 rounded-xl font-semibold  cursor-pointer flex item-center justify-center gap-3 transition  ${loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_335px_rgba(0,0,0,0.5)]"}`}>
                {loading ? "Generating Notes..." : "Generate Notes"}

            </motion.button>

            {loading &&
                <div className="mt-4 space-y-2">
                    <div className='w-full h-2 rounded-full bg-white/10 overflow-hidden'>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className='w-full h-2 bg-gradient-to-r from-green-500 via-green-400 to-green-500'>
                                
                        </motion.div>
                    </div>

                    <div className='flex justify-between text-sm text-gray-400'>
                        <span>{progressText}</span>
                        <span>{progress}%</span>
                    </div>

                    <p className='text-xs text-gray-400 text-center'>
                        Note: This may take upto 2-5 minutes. Please don't refresh or close the page.
                    </p>
                </div>
                }

        </motion.div>
    )
}

function Toggle({ label, checked, onChange }) {
    return (
        <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
            <motion.div
                animate={{
                    backgroundColor: checked
                        ? "rgba(34 , 197 , 94 , 0.35)"
                        : "rgba(255 , 255 , 255 , 0.1)"
                }}
                transition={{ duration: 0.25 }}
                className='relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg'>
                <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className='absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_5px_10px_rgba(0,0,0,0.5)]'
                    style={{ left: checked ? "1.6rem" : "0.25rem" }}>

                </motion.div>
            </motion.div>

            <span className={`text-sm transition-colors ${checked ? 'text-green-300' : 'text-gray-400'}`}>{label}</span>

        </div>
    )
}
export default TopicForm
