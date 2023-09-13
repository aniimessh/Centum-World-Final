import React, { useEffect } from "react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { indianStates } from "../utils/In-State";
import franchiseAvatar from "../assets/franchise/franchise-avatar.png";
import { useState } from "react";
import axios from "axios";

const FeedbackCard = ({ name, state }) => {
  return (
    <div className="bg-black-200 p-10 rounded-3xl w-[300px] shadow-md shadow-[#151030]">
      <div className="">
        <div className="mt-8 flex flex-col-reverse items-center w-[200px] justify-center">
          <div className="flex-1 flex flex-col items-center">
            <p className="text-white font-medium text-[15px]">
              <span className="blue-text-gradient">@</span>{name}
            </p>
            <p className="mt-1 text-secondary text-[12px] text-center">Franchise of {state}</p>
          </div>
          <img
            src={franchiseAvatar}
            alt={`feedback_by-${name}`}
            className="rounded-full object-cover h-28 w-28"
          />
        </div>
      </div>
    </div>  
  );
};

const FranchiseTeam = () => {
  const [selectedState, setSelectedState] = useState("");
  const [data, setData] = useState([]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const fetchAllState = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/portfolio/get-all-franchises"
      );
      console.log("Data fetched", response.data.data);
      setData(response.data.data);
    } catch (err) {
      console.log("Error Occurred");
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllState();
  }, []);

  return (
    <>
      <div className={`bg-black-100 rounded-[20px] overflow-x-auto`}>
        <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[200px]`}>
          <div className="flex justify-between items-center">
            <p className={`${styles.sectionSubText} ${styles.heroSubText}`}>
              Franchise MEMBER
            </p>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="bg-transparent border rounded-md"
                id="in-state"
              >
                <option value="">Select a State</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state} className="bg-primary">
                    {state}
                  </option>
                ))}
              </select>
          </div>
        </div>
        <div className="-mt-20 pb-14" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <div className={`flex ${styles.paddingX} gap-10`}>
            {data.map((item, index) => (
              <FeedbackCard
                name={item.fname}
                key={item.fname}
                index={index}
                data={data}
                state={item.franchiseState}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(FranchiseTeam, "");

