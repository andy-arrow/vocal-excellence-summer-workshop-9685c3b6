
import * as React from "react"

// Increase the mobile breakpoint to ensure smaller devices are properly detected
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Run immediately to prevent layout shift
    checkMobile()
    
    // More responsive resize handler
    const handleResize = () => {
      checkMobile()
    }
    
    // Add event listener with passive flag for better performance
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Initial check to ensure correct rendering
    checkMobile()
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
