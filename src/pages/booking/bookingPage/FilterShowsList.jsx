import React, { useState } from "react";
import { Select, Flex, Typography } from "antd";

const languages = ["Hindi", "English", "Punjabi", "Urdu"];
const locations = ["Noida", "Delhi", "Gurugram"];

export default function FilterShowsList({ showSearch, setShowSearch }) {
  return (
    <div>
      <Flex gap="large" style={{ backgroundColor: "#f84464", height: "60px" }}>
        <Typography.Title
          level={3}
          style={{
            width: "500px",
            height: "50px",
            marginTop: "10px",
            color: "white",
            marginLeft:'50px', 
            fontStyle:"italic"
          }}
        >
          Shows Of The Day
        </Typography.Title>
        <Select
          mode="multiple"
          placeholder="Language"
          value={showSearch.language}
          onChange={(language) => setShowSearch({ ...showSearch, language })}
          allowClear
          style={{
            width: "30%",
            marginTop: "10px",
            marginLeft: "20%",
            marginBottom: "15px",
          }}
        >
          {languages.map((language, index) => (
            <Select.Option key={index} value={language}>
              {language}
            </Select.Option>
          ))}
        </Select>

        <Select
          mode="multiple"
          placeholder="Location"
          value={showSearch.location}
          onChange={(location) => setShowSearch({ ...showSearch, location })}
          allowClear
          style={{
            width: "30%",
            marginTop: "10px",
            marginBottom: "15px",
            marginRight: "20px",
          }}
        >
          {locations.map((location, index) => (
            <Select.Option key={index} value={location}>
              {location}
            </Select.Option>
          ))}
        </Select>
      </Flex>
    </div>
  );
}