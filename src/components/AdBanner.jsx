import { useEffect, useRef } from 'react'

export default function AdBanner() {
  const ad1Ref = useRef(null)
  const ad2Ref = useRef(null)

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

    // Ad Unit 2 (New)
    if (ad2Ref.current && !document.querySelector('script[src*="effectivegatecpm.com"]')) {
      const script = document.createElement('script')
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      script.src = "https://pl28900319.effectivegatecpm.com/71e3706f24db8a30db367b446ac477bf/invoke.js"
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full space-y-4 py-8 px-4 flex flex-col items-center">
      {/* Ad Unit 1 Container */}
      <div 
        ref={ad1Ref} 
        className="relative min-h-[90px] w-full max-w-[728px] overflow-hidden rounded-xl bg-arena-border/10 flex items-center justify-center text-[10px] text-gray-700 font-mono"
        style={{ border: '1px solid rgba(30, 41, 59, 0.2)' }}
      >
        <span className="opacity-50">ADVERTISEMENT</span>
      </div>

      {/* Ad Unit 2 Container */}
      <div 
        id="container-71e3706f24db8a30db367b446ac477bf"
        ref={ad2Ref}
        className="w-full max-w-[728px]"
      ></div>
    </div>
  )
}
