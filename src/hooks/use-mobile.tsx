
import * as React from "react"

// Increase the mobile breakpoint to ensure smaller devices are properly detected
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initial check on mount - immediate check to prevent flicker
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Run immediately to prevent layout shift
    checkMobile()
    
    // Debounced resize handler for better performance
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(() => {
        checkMobile()
      }, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
