import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import MermaidSetup from './MermaidSetup';
import RechartSetup from './RechartSetup';
import { downloadPdf } from '../services/api';
const markDownComponent = {
  h1: ({ children }) => (<h1 className='text-2xl font-bold mb-4 mt-6 border-b pb-2 text-indigo-700'>
    {children}
  </h1>
  ),
  h2: ({ children }) => (<h2 className='text-xl font-semibold mb-3 mt-5 text-indigo-600'>
    {children}
  </h2>
  ),
  h3: ({ children }) => (<h3 className='text-lg font-semibold mb-2 mt-4 text-gray-800'>
    {children}
  </h3>
  ),
  p: ({ children }) => (
    <p className='text-gray-700 mb-3 loading-relaxed'>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className='list-disc ml-6 space-y-1 text-gray-700 mb-3'>
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className='marker:text-indigo-500'>{children}</li>
  ),
}

function FinalResult({ results }) {
  const [quickRevision, setQuickRevision] = useState(false);
  if (!results ||
    !results.subTopics ||
    !results.questions ||
    !results.questions.short ||
    !results.questions.long ||
    !results.revisionPoints) {
    return null;
  }

  return (
    <div className='mt-6 p-3 space-y-10 bg-white'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

        <h2 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text'>
          📗 Generated Notes
        </h2>

        <div className='flex  gap-4'>
          <button onClick={() => setQuickRevision(!quickRevision)} className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${quickRevision
            ? "bg-green-600 text-white"
            : "bg-green-100 text-green-800 hover:bg-green-200"}`}>
            {quickRevision ? "Exit Revision Mode" : "Quick Revision Mode(5 mins)"}
          </button>

          <button onClick={() => downloadPdf(results)}
          className='px-4 py-2 rounded-lg text-sm cursor-pointer font-medium bg-indigo-600 text-white hover:bg-indigo-700'>
            ⬇️ Download PDF
          </button>
        </div>
      </div>


      {!quickRevision && <section>

        <SectionHeader icon="⭐" title="Sub Topics" color="indigo" />
        {
          Object.entries(results.subTopics).map(([star, topics]) => (
            <div key={star}>
              <p className='font-medium text-indigo-600 mb-1'>
                {star} Priority
              </p>
              <ul className='list-disc ml-6  text-gray-700 '>
                {topics.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          ))
        }
      </section>}


     {!quickRevision &&  <section>
      <SectionHeader icon="📝" title="Detailed Notes" color="purple" />
        <div className='bg-white border border-gray-200 rounded-xl p-6'>
          <ReactMarkdown components={markDownComponent}>
            {results.notes}
          </ReactMarkdown>
        </div>
      </section>}


      {quickRevision && 
      <section className='rounded-xl bg-gradient-to-r from-green-100 to-green-50 p-6 border border-green-200'>
        <h3 className='font-bold text-green-700 mb-3 text-lg'>
          ⚡ Quick Revision Points
        </h3>
        <ul className='list-disc ml-6 text-gray-700 space-y-2'>
          {results.revisionPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>}

      {results.diagram && 
        <section>
          <SectionHeader icon="📊" title="Diagram" color="cyan" />
          <MermaidSetup diagram={results.diagram?.data} />
          <p className='text-sm text-gray-500 mt-2 italic'>
            ℹ️ If you need this diagram for future reference or revision , consider taking a screenshot and save it.
          </p>
        </section>
      }

      { results.charts?.length > 0 && 
        <section>
          <SectionHeader icon="📈" title="Charts" color="indigo" />
          <RechartSetup charts={results.charts} />
          <p className='text-sm text-gray-500 mt-2 italic'>
            ℹ️ If you need this charts for future reference or revision , consider taking a screenshot and save it.
          </p>
        </section>}

        {results.charts && results.charts.length === 0 && (
          <p className='text-sm text-gray-500 mt-2 italic'>
            📉 Charts are not relevant for this topic
          </p>
        )}

          <section>
            <SectionHeader icon="❓" title="Important Questions" color="rose"/>

              <p  className='font-medium'> Short Questions</p>
              <ul className='list-disc ml-6 text-gray-700'>
                {results.questions.short.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>

              <p  className='font-medium mt-4 '> Long Questions</p>
              <ul className='list-disc ml-6 text-gray-700'>
                {results.questions.long.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>

              <p  className='font-medium mt-4'> Diagram Questions</p>
              <ul className='list-disc ml-6 text-gray-700'>
                <li>{results.questions.diagram}</li>
              </ul>
            </section>


    </div>
  );
}

function SectionHeader({ title, icon, color }) {
  const colors = {
    indigo: "from-indigo-100  to-indigo-50 text-indigo-700",
    purple: "from-purple-100 to-purple-50 text-purple-700",
    blue: "from-blue-100 to-blue-50 text-blue-700",
    green: "from-green-100 to-green-50 text-green-700",
    cyan: "from-cyan-100 to-cyan-50 text-cyan-700",
    rose: "from-rose-100 to-rose-50 text-rose-700",
  };
  return(
    <div className={`mb-4 px-3 py-2 rounded-lg bg-gradient-to-r ${colors[color]} font-semibold flex items-center gap-2`}>
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export default FinalResult;