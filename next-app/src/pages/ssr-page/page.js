import React from "react";

const SSRPage = async () => {
  // Fetch data from an API or any other data source
  const res = await fetch("http://52.2.71.125:8000/users/");
  const data = await res.json();

  return (
    <div>
      <h1>Server-Side Rendered Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SSRPage;
