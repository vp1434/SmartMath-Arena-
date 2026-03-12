import { useEffect, useRef } from 'react'

export default function AdBanner() {
  const ad1Ref = useRef(null)

  useEffect(() => {
    // Ad Unit 1 (Existing)
    if (ad1Ref.current && !ad1Ref.current.querySelector('script')) {
      const configScript = document.createElement('script')
      configScript.type = 'text/javascript'
      configScript.innerHTML = `
        atOptions = {
          'key' : '71a42b5c7e9696394c28699ff991d08a',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `
      const invokeScript = document.createElement('script')
      invokeScript.src = "https://www.highperformanceformat.com/71a42b5c7e9696394c28699ff991d08a/invoke.js"
      invokeScript.async = true

      ad1Ref.current.appendChild(configScript)
      ad1Ref.current.appendChild(invokeScript)
    }
  }, [])

  return (
    <div className="w-full space-y-3 py-6 px-4 flex flex-col items-center overflow-hidden">
      {/* Sponsored Header */}
      <div className="flex items-center gap-2 mb-1 opacity-40">
        <div className="h-[1px] w-8 bg-gray-600"></div>
        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Sponsored</span>
        <div className="h-[1px] w-8 bg-gray-600"></div>
      </div>

      {/* Ad Unit 1 Container with Responsive Wrapper */}
      <div className="w-full flex justify-center">
        <div 
          ref={ad1Ref} 
          className="relative min-h-[90px] w-full max-w-[728px] overflow-hidden rounded-xl bg-arena-border/5 flex items-center justify-center text-[10px] text-gray-700 font-mono transition-all duration-500"
          style={{ 
            border: '1px solid rgba(148, 163, 184, 0.1)',
            transform: 'scale(var(--ad-scale, 1))',
            transformOrigin: 'center top'
          }}
        >
          {/* Fallback/Placeholder Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="tracking-[0.2em]">AD ROOM</span>
          </div>
        </div>
      </div>

      {/* Script to handle scaling if window too narrow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 760px) {
          :root { --ad-scale: 0.9; }
        }
        @media (max-width: 640px) {
          :root { --ad-scale: 0.75; }
        }
        @media (max-width: 480px) {
          :root { --ad-scale: 0.55; }
        }
        @media (max-width: 380px) {
          :root { --ad-scale: 0.45; }
        }
      `}} />
    </div>
  )
}
