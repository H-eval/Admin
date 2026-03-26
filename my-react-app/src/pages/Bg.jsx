import { useEffect, useState } from "react";
import BlurText from "./BlurText";

export default function Bg({ onFinish }) {
  const [showFullForm, setShowFullForm] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    // Show full form after 2s
    const formTimer = setTimeout(() => setShowFullForm(true), 2000);
    // End splash after 5s
    const finishTimer = setTimeout(() => {
    if (typeof onFinish === "function") {
      onFinish();
    } else {
      console.warn("⚠️ SplashScreen rendered without onFinish prop!");
    }
  }, 5000);
    // Floating words background
    const words = [
      "Welcome",  "Language", "Communication", "Learn",
      "स्वागत", "अनुवाद", "भाषा", "संचार", "सीखना",
      "স্বাগতম", "অনুবাদ", "ভাষা", "শিক্ষা", "যোগাযোগ",
      "ಸ್ವಾಗತ", "ಅನುವಾದ", "ಭಾಷೆ", 

    ];

    function getRandomFont() {
      const fonts = [
        "Arial", "Verdana", "Georgia", "Courier New",
        "Comic Sans MS", "Impact", "Times New Roman", "Trebuchet MS", "Lucida Console"
      ];
      return fonts[Math.floor(Math.random() * fonts.length)];
    }

    function createWord(row, col, rows, cols) {
      const word = document.createElement("div");
      word.className = "floating-word";
      word.innerText = words[Math.floor(Math.random() * words.length)];

      const cellWidth = 100 / cols;
      const cellHeight = 100 / rows;
      const top = row * cellHeight + Math.random() * (cellHeight - 10);
      const left = col * cellWidth + Math.random() * (cellWidth - 10);

      word.style.top = top + "vh";
      word.style.left = left + "vw";
      word.style.fontSize = (Math.random() * 2 + 1.5) + "rem"; // slightly bigger
      word.style.fontWeight = Math.random() > 0.5 ? "bold" : "lighter";
      word.style.fontFamily = getRandomFont();
      word.style.animationDuration = (5 + Math.random() * 5) + "s";

      document.body.appendChild(word);
    }

    const rows = 6, cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        createWord(r, c, rows, cols);
      }
    }

    return () => {
      clearTimeout(formTimer);
      clearTimeout(finishTimer);
      document.querySelectorAll(".floating-word").forEach(el => el.remove());
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden z-0">
      {/* Main TATVA text bigger and bolder */}
      

      {/* Full form */}

      {/* Floating words CSS */}
      <style >{`
        .floating-word {
          position: absolute;
          color: rgba(255, 255, 255, 0.25);
          pointer-events: none;
          white-space: nowrap;
          filter: blur(2px);
          animation: float 6s infinite ease-in-out alternate;
        }

        @keyframes float {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(3deg); }
          100% { transform: translate(-10px, 10px) rotate(-3deg); }
        }
      `}</style>
    </div>
  );
}
