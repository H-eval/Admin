// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, ArrowRight, Check, Loader2, RefreshCw } from "lucide-react";
// import "./Otp.css";

// export default function Otp() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const navigate = useNavigate();
//   const inputRefs = useRef([]);

//   // Floating words background
//   useEffect(() => {
//     const words = [
//       "Welcome", "Translation", "Language", "Communication", "Learn",
//       "स्वागत", "अनुवाद", "भाषा", "संचार", "सीखना",
//       "স্বাগতম", "অনুবাদ", "ভাষা", "শিক্ষা", "যোগাযোগ",
//       "ಸ್ವಾಗತ", "ಅನುವಾದ", "ಭಾಷೆ", "ಕಲಿಯಿರಿ", "ಸಂಪರ್ಕ",
//       "സ്വാഗതം", "ഭാഷ", "പരിഭാഷ", "പഠിക്കുക", "ബന്ധം",
//       "வரவேற்கிறேன்", "மொழி", "மொழிபெயர்ப்பு", "கற்பது", "தொடர்பு",
//       "స్వాగతం", "అనువాదం", "భాష", "నేర్చుకోండి", "సంప్రదించండి",
//       "ସ୍ୱାଗତ", "ଅନୁବାଦ", "ଭାଷା", "ଶିଖ", "ଯୋଗାଯୋଗ"
//     ];

//     const floatingElements = [];
//     const rows = 6, cols = 8;

//     for (let r = 0; r < rows; r++) {
//       for (let c = 0; c < cols; c++) {
//         const word = document.createElement("div");
//         word.className = "floating-word";
//         word.innerText = words[Math.floor(Math.random() * words.length)];

//         const cellWidth = 100 / cols;
//         const cellHeight = 100 / rows;
//         const top = r * cellHeight + Math.random() * (cellHeight - 10);
//         const left = c * cellWidth + Math.random() * (cellWidth - 10);

//         word.style.top = top + "vh";
//         word.style.left = left + "vw";
//         word.style.fontSize = (Math.random() * 2 + 1.5) + "rem";
//         word.style.fontWeight = Math.random() > 0.5 ? "600" : "300";
//         word.style.animationDuration = (5 + Math.random() * 5) + "s";
//         word.style.animationDelay = Math.random() * 2 + "s";

//         document.body.appendChild(word);
//         floatingElements.push(word);
//       }
//     }

//     return () => {
//       floatingElements.forEach(el => el.remove());
//     };
//   }, []);

//   // Resend timer
//   useEffect(() => {
//     if (step === 2 && !canResend && resendTimer > 0) {
//       const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (resendTimer === 0) {
//       setCanResend(true);
//     }
//   }, [resendTimer, step, canResend]);

//   // Handle email submission
//   const sendOtp = async () => {
//     if (!email) {
//       setError("Please enter your email address");
//       return;
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/admin/request-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Failed to send OTP");
//       } else {
//         setStep(2);
//         setCanResend(false);
//         setResendTimer(60);
//         setTimeout(() => {
//           if (inputRefs.current[0]) {
//             inputRefs.current[0].focus();
//           }
//         }, 100);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Connection error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP input change
//   const handleOtpChange = (element, index) => {
//     if (isNaN(element.value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);
//     setError("");

//     if (element.value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   // Handle backspace navigation
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   // Handle paste
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").slice(0, 6);
//     if (/^\d+$/.test(pastedData)) {
//       const newOtp = pastedData.split("");
//       while (newOtp.length < 6) newOtp.push("");
//       setOtp(newOtp);
//       const lastFilledIndex = Math.min(pastedData.length - 1, 5);
//       inputRefs.current[lastFilledIndex]?.focus();
//     }
//   };

//   // Handle OTP verification
//   const verifyOtp = async () => {
//     const otpValue = otp.join("");
//     if (otpValue.length !== 6) {
//       setError("Please enter all 6 digits");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/admin/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp: otpValue }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.error || "Invalid OTP. Please try again.");
//       } else {
//         setSuccess(true);
//         localStorage.setItem("token", data.token);
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Connection error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP
//   const resendOtp = () => {
//     if (!canResend) return;
//     setOtp(["", "", "", "", "", ""]);
//     setError("");
//     sendOtp();
//   };

//   return (
//     <div className="otp-container">
//       <div className="otp-card">
//         {step === 1 && (
//           <>
//             <div className="icon-wrapper">
//               <Mail size={32} color="white" />
//             </div>
//             <h2>Welcome Back</h2>
//             <p className="subtitle">
//               Enter your email to receive a one-time password
//             </p>

//             {error && <div className="error-message">{error}</div>}

//             <div className="input-wrapper">
//               <Mail className="input-icon" size={20} />
//               <input
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && sendOtp()}
//                 disabled={loading}
//               />
//             </div>

//             <button
//               className="btn btn-primary"
//               onClick={sendOtp}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 size={20} className="spin" />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   Continue
//                   <ArrowRight size={20} />
//                 </>
//               )}
//             </button>
//           </>
//         )}

//         {step === 2 && !success && (
//           <>
//             <button className="back-btn" onClick={() => setStep(1)}>
//               ← Back
//             </button>
//             <div className="icon-wrapper">
//               <Mail size={32} color="white" />
//             </div>
//             <h2>Verify Your Email</h2>
//             <p className="subtitle">
//               We've sent a 6-digit code to <br />
//               <span className="email-highlight">{email}</span>
//             </p>

//             {error && <div className="error-message">{error}</div>}

//             <div className="otp-inputs">
//               {otp.map((value, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => (inputRefs.current[i] = el)}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength="1"
//                   value={value}
//                   onChange={(e) => handleOtpChange(e.target, i)}
//                   onKeyDown={(e) => handleKeyDown(e, i)}
//                   onPaste={i === 0 ? handlePaste : undefined}
//                   onFocus={(e) => e.target.select()}
//                   disabled={loading}
//                 />
//               ))}
//             </div>

//             <button
//               className="btn btn-primary"
//               onClick={verifyOtp}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 size={20} className="spin" />
//                   Verifying...
//                 </>
//               ) : (
//                 <>
//                   Verify OTP
//                   <Check size={20} />
//                 </>
//               )}
//             </button>

//             <div className="resend-section">
//               <p className="resend-text">
//                 {canResend
//                   ? "Didn't receive the code?"
//                   : `Resend code in ${resendTimer}s`}
//               </p>
//               <button
//                 className="resend-btn"
//                 onClick={resendOtp}
//                 disabled={!canResend}
//               >
//                 <RefreshCw size={16} />
//                 Resend OTP
//               </button>
//             </div>
//           </>
//         )}

//         {success && (
//           <>
//             <div className="icon-wrapper success-icon">
//               <Check size={32} color="white" strokeWidth={3} />
//             </div>
//             <h2>Verified!</h2>
//             <p className="subtitle">
//               Your email has been verified successfully
//             </p>
//             <button className="btn btn-success">
//               <Check size={20} />
//               Success
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight, Check, Loader2, RefreshCw } from "lucide-react";
import "./otp.css";

export default function Otp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Floating words background
  useEffect(() => {
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
      floatingElements.forEach(el => el.remove());
    };
  }, []);

  // Resend timer
  useEffect(() => {
    if (step === 2 && !canResend && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, step, canResend]);

  // Handle email submission
  const sendOtp = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      // Add a minimum loading time to show the animation (at least 2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        setLoading(false);
      } else {
        setStep(2);
        setCanResend(false);
        setResendTimer(60);
        setLoading(false);
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setError("");

    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      while (newOtp.length < 6) newOtp.push("");
      setOtp(newOtp);
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid OTP. Please try again.");
      } else {
        setSuccess(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = () => {
    if (!canResend) return;
    setOtp(["", "", "", "", "", ""]);
    setError("");
    sendOtp();
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        {/* Loading State with Animated GIF */}
        {loading && step === 1 && (
          <div className="loading-screen">
            <div className="loading-content">
              <img 
                src="/assets/loading-lock.gif" 
                alt="Loading..." 
                className="loading-gif"
                onError={(e) => {
                  // Fallback to animated lock if GIF not found
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="loading-fallback" style={{ display: 'none' }}>
                <div className="animated-lock">
                  <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                    <rect x="15" y="45" width="50" height="50" rx="8" fill="rgba(0,191,255,0.2)" stroke="#00bfff" strokeWidth="3"/>
                    <path d="M 25 45 V 30 Q 25 10, 40 10 Q 55 10, 55 30 V 45" stroke="#00bfff" strokeWidth="3" fill="none" className="lock-shackle"/>
                    <circle cx="40" cy="65" r="3" fill="#00bfff"/>
                    <rect x="38" y="68" width="4" height="12" rx="2" fill="#00bfff"/>
                  </svg>
                </div>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <p className="loading-text">Sending verification code...</p>
            </div>
          </div>
        )}

        {/* Email Input Step */}
        {!loading && step === 1 && (
          <>
            <div className="icon-wrapper">
              <Mail size={32} color="white" />
            </div>
            <h2>Welcome Back</h2>
            <p className="subtitle">
              Enter your email to receive a one-time password
            </p>

            {error && <div className="error-message">{error}</div>}

            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendOtp()}
                disabled={loading}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={sendOtp}
              disabled={loading}
            >
              Continue
              <ArrowRight size={20} />
            </button>
          </>
        )}

        {step === 2 && !success && (
          <>
            <button className="back-btn" onClick={() => setStep(1)}>
              ← Back
            </button>
            <div className="icon-wrapper">
              <Mail size={32} color="white" />
            </div>
            <h2>Verify Your Email</h2>
            <p className="subtitle">
              We've sent a 6-digit code to <br />
              <span className="email-highlight">{email}</span>
            </p>

            {error && <div className="error-message">{error}</div>}

            <div className="otp-inputs">
              {otp.map((value, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(e.target, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={i === 0 ? handlePaste : undefined}
                  onFocus={(e) => e.target.select()}
                  disabled={loading}
                />
              ))}
            </div>

            <button
              className="btn btn-primary"
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                  <Check size={20} />
                </>
              )}
            </button>

            <div className="resend-section">
              <p className="resend-text">
                {canResend
                  ? "Didn't receive the code?"
                  : `Resend code in ${resendTimer}s`}
              </p>
              <button
                className="resend-btn"
                onClick={resendOtp}
                disabled={!canResend}
              >
                <RefreshCw size={16} />
                Resend OTP
              </button>
            </div>
          </>
        )}

        {success && (
          <>
            <div className="icon-wrapper success-icon">
              <Check size={32} color="white" strokeWidth={3} />
            </div>
            <h2>Verified!</h2>
            <p className="subtitle">
              Your email has been verified successfully
            </p>
            <button className="btn btn-success">
              <Check size={20} />
              Success
            </button>
          </>
        )}
      </div>
    </div>
  );
}