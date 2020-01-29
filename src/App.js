import React, { useState } from "react";
import Inputs from "./Inputs";
import Cover from "./Cover";

const App = () => {
  const [data, setData] = useState({
    artist: "Artist Performer",
    title: "Album Name"
  });

  return (
    <div className="app">
      <Inputs onChange={setData} data={data} />
      <Cover data={data} />
    </div>
  );
};

export default App;
