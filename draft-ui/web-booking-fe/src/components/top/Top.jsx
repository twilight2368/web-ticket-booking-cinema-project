import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Top() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]); // Trigger the effect when the route (location) changes

  return <></>; // This component does not render anything
}
