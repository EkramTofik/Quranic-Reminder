import React, { useEffect, useState } from "react";
import "./index.css";
function App() {
  const [verse, setVerse] = useState("");
  const [surah, setSurah] = useState("");
  const [ayah, setAyah] = useState("");
  const [isloading, setLoading] = useState(true);
  async function getReminder() {
    const randomAyah = Math.floor(Math.random() * 6236) + 1;
    try {
      const info = await fetch(
        `https://api.alquran.cloud/v1/ayah/${randomAyah}/en.asad`,
      );
      const respo = await info.json();
      console.log(respo.data);
      setVerse(respo.data.text);
      setAyah(respo.data.numberInSurah);
      setSurah(respo.data.surah.englishName);
      setLoading(false);
      throw new Error("Failed to fetch");
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getReminder();
  }, []);

  return (
    <div className="mainPage">
      <div className="card">
        {isloading ? (
          <div>
            <p>Loading</p>
          </div>
        ) : (
          <div>
            <p>{verse}</p>
            <p>
              {surah}-Ayah {ayah}
            </p>
          </div>
        )}
        <button onClick={getReminder}>Reminder</button>
      </div>
    </div>
  );
}

export default App;
