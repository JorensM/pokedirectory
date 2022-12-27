import { useEffect, useState } from "react";


function App() {

  const [info, setInfo] = useState("");

  useEffect(() => {
    fetch("test")
    .then(res => res.json())
    .then(data => setInfo(data))
    .catch(err => setInfo(err))
  }, []);

  return (
    <div>
      {info}
    </div>
  );
}

export default App;
