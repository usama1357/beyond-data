import { Carousel } from "antd";
import React from "react";
import "./styles.css";

export default function AdminUserCardCarousel(props) {
  console.log(props.data);

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  return (
    <div className="AdminUserCardCarousel">
      {props.data ? (
        <Carousel afterChange={onChange} autoplay>
          {props.data.map((item) => (
            <div className="UserCard">
              <img
                src={item.image}
                style={{
                  borderRadius: "50%",
                  margin: "auto",
                  marginTop: "-30px",
                }}
                alt="avatar"
              />
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#085fab",
                  marginTop: "5px",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#6d6d6d",
                }}
              >
                {item.email}
              </div>
            </div>
          ))}
        </Carousel>
      ) : null}
    </div>
  );
}
