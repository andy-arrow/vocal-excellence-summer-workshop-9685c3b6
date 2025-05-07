
import * as React from "react"

// Adjusted mobile breakpoint for better device detection
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    // Initialize with a check to prevent layout shift
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    // Function to check if the device is mobile
    const checkMobile = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobileView)
    }
    
    // More efficient resize handler with throttling
    let resizeTimer: number | null = null
    const handleResize = () => {
      if (!resizeTimer) {
        resizeTimer = window.setTimeout(() => {
          resizeTimer = null
          checkMobile()
        }, 100) // Throttle to improve performance
      }
    }
    
    // Add event listener with passive flag for better performance
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Initial check to ensure correct rendering
    checkMobile()
    
    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
