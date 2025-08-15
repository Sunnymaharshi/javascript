import React from "react";

const Interests = ({ data, setData, errors }) => {
  const { interests } = data;
  const handleDataChange = (e) => {
    setData((prev) => {
      let newInterests = [];
      if (prev.interests.includes(e.target.name)) {
        newInterests = prev.interests.filter((temp) => temp !== e.target.name);
      } else {
        newInterests = [...prev.interests, e.target.name];
      }
      return { ...prev, interests: newInterests };
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interests.includes("coding")}
            onChange={handleDataChange}
          />
          Coding
        </label>

        <label>
          <input
            type="checkbox"
            name="design"
            checked={interests.includes("design")}
            onChange={handleDataChange}
          />
          Design
        </label>
        <label>
          <input
            type="checkbox"
            name="playing"
            checked={interests.includes("playing")}
            onChange={handleDataChange}
          />
          Playing
        </label>
      </div>
      {errors.interests && <div className="error-msg">{errors.interests}</div>}
    </div>
  );
};

export default Interests;
