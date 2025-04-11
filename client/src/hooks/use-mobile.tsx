import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  
  // Run on component mount and set initial value
  useEffect(() => {
    // Function to determine if device is mobile
    const checkIfMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)
    
    // Initial check
    checkIfMobile()
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])
  
  // Initialize with media query as a backup
  useEffect(() => {
    try {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      if (mql.matches !== isMobile) {
        setIsMobile(mql.matches)
      }
    } catch (e) {
      // Fallback for older browsers
      console.error("Media query not supported", e)
    }
  }, [isMobile])
  
  return isMobile
}
