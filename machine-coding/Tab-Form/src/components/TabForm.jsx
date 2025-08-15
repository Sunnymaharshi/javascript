import { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    interests: ["coding", "playing"],
    theme: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: "",
    interests: "",
    theme: "",
  });
  const tabs = [
    {
      name: "Profile",
      component: Profile,
    },
    {
      name: "Interests",
      component: Interests,
    },
    {
      name: "Settings",
      component: Settings,
    },
  ];
  const handleSubmit = () => {
    const err = {};
    if (!data.name) err.name = "Name is required!";
    if (!data.email) err.email = "Email is required!";
    if (!data.age || data.age < 1) err.age = "Invalid Age!";
    console.log(data);
    if (data.interests.length === 0)
      err.interests = "Select atleast 1 of interests!";
    if (!data.theme) err.theme = "Select preferred theme!";
    setErrors(err);
    console.log(err);
    if (!(err.name || err.email || err.age || err.interests || err.theme)) {
      setSubmit(true);
    }
  };
  const ActiveComponent = tabs[activeTab].component;
  if (submit) {
    return <h1>Form Successfully Submitted...</h1>;
  }
  return (
    <div>
      <div className="heading-container">
        {tabs.map((tab, i) => {
          return (
            <div
              className="tab_heading"
              onClick={() => {
                setActiveTab(i);
              }}
              key={i}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tab_body">
        <ActiveComponent
          data={data}
          setData={setData}
          errors={errors}
          setErrors={setErrors}
        />
      </div>

      <div className="form-submit-container">
        <div className="action-container">
          <button
            disabled={activeTab === 0}
            onClick={() =>
              setActiveTab((prev) => {
                return prev > 0 ? prev - 1 : prev;
              })
            }
          >
            Prev
          </button>
          <button
            disabled={activeTab >= tabs.length - 1}
            onClick={() =>
              setActiveTab((prev) => {
                return prev < tabs.length - 1 ? prev + 1 : prev;
              })
            }
          >
            Next
          </button>
        </div>
        {activeTab === tabs.length - 1 && (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
