import React from 'react'

function Sidebar({ results }) {

    if (!results ||
        !results.subTopics ||
        !results.questions ||
        !results.questions.short ||
        !results.questions.long) {
        return null;
    }

    return (
        <div className='bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6'>
            <div className='flex items-center gap-2'>
                <span className='text-xl'>📌</span>
                <h3 className='text-lg font-semibold text-indigo-600'>Quick Exam View</h3>
            </div>

            <section >
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                    ⭐Sub Topics : Prioritize based
                </p>
                {
                    Object.entries(results.subTopics).map(([star , topics])=>(
                        <div className='mb-4 rounded-lg p-3 bg-gray-50 border border-gray-200' key={star}>
                            <p className='text-sm font-semibold text-yellow-600 mb-1'>
                                {star} Priority
                            </p>
                            <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                                {topics.map((t , i)=>(
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
            </section>

                <section className='rounded-lg p-3 bg-yellow-50 border border-yellow-200'>
                    <p className='text-sm font-semibold text-gray-700 mb-1'>
                        🔥 Important Notes
                    </p>
                    <span className='text-sm font-bold text-yellow-700'>
                        {results.importance}
                    </span>

                    <p className='text-sm font-semibold text-gray-700 mb-3'>
                        ❓ Important Questions
                    </p>

                    <div className='mb-4 rounded-lg p-3 bg-indigo-100 border border-indigo-200'>
                        <p className='text-sm font-semibold text-indigo-600 mb-1'>
                                Short Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                                {results.questions.short.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                    </div>

                     <div className='mb-4 rounded-lg p-3 bg-purple-100 border border-purple-200'>
                        <p className='text-sm font-semibold text-purple-700 mb-1'>
                                Long Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                                {results.questions.long.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                    </div>

                    <div className='mb-4 rounded-lg p-3 bg-blue-100 border border-blue-200'>
                        <p className='text-sm font-semibold text-blue-700 mb-1'>
                                Diagram Questions
                            </p>
                            <ul className='list-disc ml-4 text-sm text-gray-700 space-y-1'>
                                <li>{results.questions.diagram}</li>
                               
                            </ul>
                    </div>
                </section>

        </div>
    )
}

export default Sidebar
