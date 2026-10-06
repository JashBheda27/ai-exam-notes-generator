import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'default' });

const cleanMermaidChart = (diagram) => {
    if (!diagram) return "";
    let clean = diagram.replace(/\r\n/g, "\n").trim();
    if (!clean.startsWith("graph")) clean = `graph TD\n${clean}`;
    return clean;
}

function MermaidSetup({ diagram }) {
    const containerRef = useRef(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [svgContent, setSvgContent] = useState("");

    useEffect(() => {
        if (!diagram || !containerRef.current) return;

        const renderDiagram = async () => {
            try {
                containerRef.current.innerHTML = "";
                const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const safeChart = cleanMermaidChart(diagram);
                const { svg } = await mermaid.render(uniqueId, safeChart);
                containerRef.current.innerHTML = svg;
                setSvgContent(svg);
            } catch (error) {
                console.error("Error rendering Mermaid diagram:", error);
            }
        };

        renderDiagram();
    }, [diagram]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsZoomed(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
    const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const resetZoom = () => setZoom(1);

    return (
        <>
            <div className="bg-white border rounded-lg p-4 overflow-x-auto relative">
                <div ref={containerRef} />
                <button onClick={() => { setIsZoomed(true); setZoom(1.5); }} className="absolute top-3 right-3 px-3 py-2 rounded-lg bg-black/70 text-white text-xs font-medium shadow-md hover:bg-black transition cursor-pointer">
                    🔍 Enlarge
                </button>
            </div>

            {isZoomed && (
                <div onClick={() => setIsZoomed(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3">
                    <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                            <button onClick={zoomOut} className="w-9 h-9 rounded-lg bg-black/70 text-white font-bold hover:bg-black cursor-pointer">−</button>
                            <button onClick={resetZoom} className="px-3 h-9 rounded-lg bg-black/70 text-white text-xs font-medium hover:bg-black cursor-pointer">{Math.round(zoom * 100)}%</button>
                            <button onClick={zoomIn} className="w-9 h-9 rounded-lg bg-black/70 text-white font-bold hover:bg-black cursor-pointer">+</button>
                            <button onClick={() => setIsZoomed(false)} className="w-9 h-9 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 cursor-pointer">✕</button>
                        </div>

                        <div className="w-full h-full overflow-auto flex items-center justify-center p-8">
                            <div className="min-w-max transition-transform duration-200" style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }} dangerouslySetInnerHTML={{ __html: svgContent }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MermaidSetup