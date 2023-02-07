import React from "react";

export default function Logout() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h2>
          Are you sure you want to Log Out
          <p>click to continue</p>
        </h2>
        <button
          onClick={() => {
            localStorage.clear();
          }}
          type="submit"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}
