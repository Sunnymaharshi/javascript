import React from "react";

const Settings = ({ data, setData, errors }) => {
  const { theme } = data;
  const handleDataChange = (e) => {
    setData((prev) => {
      return { ...prev, theme: e.target.value };
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="dark"
            name="theme"
            checked={theme === "dark"}
            onChange={handleDataChange}
          />
          Dark
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={handleDataChange}
          />
          Light
        </label>
      </div>
      {errors.theme && <div className="error-msg">{errors.theme}</div>}
    </div>
  );
};

export default Settings;
