import "./App.css";
import OTPInput from "./components/OTPInput";
const OTP_LENGTH = 6;
function App() {
  return (
    <div>
      <h1>Validate OTP</h1>
      <OTPInput length={OTP_LENGTH} />
    </div>
  );
}

export default App;
