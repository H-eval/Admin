import { useEffect, useState } from "react";
import "./SplashScreen.css";
// ✅ Correct Vite SVGR import (must include ?react at the end)
import LogoWhite from "../assets/logowhite.svg?react";

export default function SplashScreen() {
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Trigger logo animation after a short delay
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 500);

    // Floating words background
    const words = [
      "Welcome", "Translation", "Language", "Communication", "Learn",
      "स्वागत", "अनुवाद", "भाषा", "संचार", "सीखना",
      "স্বাগতম", "অনুবাদ", "ভাষা", "শিক্ষা", "যোগাযোগ",
      "ಸ್ವಾಗತ", "ಅನುವಾದ", "ಭಾಷೆ", "ಕಲಿಯಿರಿ", "ಸಂಪರ್ಕ",
      "സ്വാഗതം", "ഭാഷ", "പരിഭാഷ", "പഠിക്കുക", "ബന്ധം",
      "வரவேற்கிறேன்", "மொழி", "மொழிபெயர்ப்பு", "கற்பது", "தொடர்பு",
      "స్వాగతం", "అనువాదం", "భాష", "నేర్చుకోండి", "సంప్రదించండి",
      "ସ୍ୱାଗତ", "ଅନୁବାଦ", "ଭାଷା", "ଶିଖ", "ଯୋଗାଯୋଗ"
    ];

    const floatingElements = [];
    const rows = 6, cols = 8;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const word = document.createElement("div");
        word.className = "floating-word";
        word.innerText = words[Math.floor(Math.random() * words.length)];

        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        const top = r * cellHeight + Math.random() * (cellHeight - 10);
        const left = c * cellWidth + Math.random() * (cellWidth - 10);

        word.style.top = top + "vh";
        word.style.left = left + "vw";
        word.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
        word.style.fontWeight = Math.random() > 0.5 ? "600" : "300";
        word.style.animationDuration = (5 + Math.random() * 5) + "s";
        word.style.animationDelay = Math.random() * 2 + "s";

        document.body.appendChild(word);
        floatingElements.push(word);
      }
    }

    return () => {
      clearTimeout(logoTimer);
      floatingElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        {/* Netflix-style Ta-Dum Animation */}
        <div className={`logo-wrapper ${logoVisible ? "ta-dum" : ""}`}>
          <div className="logo-glow"></div>

          {/* SVG Logo Component */}
          <LogoWhite className="tatva-logo" />

          
        </div>
      </div>
    </div>
  );
}
