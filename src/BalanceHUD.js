function BalanceHUD({ balance }) {
    return (
      <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <h2>Balance: {balance}%</h2>
        <div
          style={{
            width: "200px",
            height: "20px",
            background: "gray",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${balance}%`,
              height: "100%",
              background: balance > 50 ? "lightblue" : "darkred",
            }}
          />
        </div>
      </div>
    );
  }
  