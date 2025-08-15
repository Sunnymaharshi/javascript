import React from "react";

const Profile = ({ data, setData, errors }) => {
  const { name, email, age } = data;
  const handleDataChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="form_container">
      <div className="form-group">
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleDataChange}
        />
        {errors.name && <div className="error-msg">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleDataChange}
        />
        {errors.email && <div className="error-msg">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="age">Age :</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={handleDataChange}
        />
        {errors.age && <div className="error-msg">{errors.age}</div>}
      </div>
    </div>
  );
};

export default Profile;
