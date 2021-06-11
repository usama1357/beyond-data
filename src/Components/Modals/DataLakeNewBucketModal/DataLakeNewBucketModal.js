/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from "react";
import { Modal, Button } from "antd";
import ShareAvatar from "../../Images/AutoML/shareAvatar.svg";
import "./DataLakeNewBucketModal.css";
import closeIcon from "../../Icons/AutoML/closeicon.svg";
import { serialize } from "object-to-formdata";
import { AuthContext } from "../../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import axios from "axios";
import { URL } from "../../../Config/config";
import Cliploader from "../../Loader/Cliploader";

export default function DataLakeNewBucketModal(props) {
  const [Message, setMessage] = useState("");
  const [m_name, setm_name] = useState("");
  const [m_desc, setm_desc] = useState("");
  const [m_name_error, setm_name_error] = useState(null);
  const [enable, setenable] = useState(false);
  const [loading, setloading] = useState(false);

  const { Auth } = useContext(AuthContext);

  const validate = async (e) => {
    setenable(true);
    setm_name_error(null);
    document.getElementById("project_name").style.borderColor = "#40a9ff";
    await setm_name(e.target.value);
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;
    if (format.test(e.target.value) || format.test(e.target.value)) {
      // let textfield = document.getElementById("project_name");
      // textfield.style.backgroundColor = "red";
      setenable(false);
      setm_name_error("Model Name contains special characters");
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    } else {
      setenable(true);
      document.getElementById("project_name").style.borderColor = "#40a9ff";
    }
    let name = "";
    if (e.target.value.length === 0) {
      name = e.target.value;
    } else {
      name = e.target.value;
    }
    if (e.target.value.length < 3) {
      setenable(false);
      setm_name_error("Model Name should be 3 Characters Minimum");
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    }
    if (name[0] === " " || name[0] === "_" || name[0] === "-") {
      setenable(false);
      setm_name_error(
        "Model Name first character cannot be a special character"
      );
      document.getElementById("project_name").style.borderColor = "#EC547A";
      document.getElementById("project_name").style.boxShadow = "none";
    }
  };

  const createBucket = async () => {
    if (enable === true) {
      const myData = {
        company_name: Auth.company_name,
        company_id: Auth.company_id,
        user_id: Auth.user_id,
        databucket_name: m_name,
        databucket_desc: m_desc,
      };
      const formData = serialize(myData);
      setloading(true);
      await axios({
        method: "post",
        url: `${URL}/automl/create_databucket/`,
        data: formData,
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
        .then(function (response) {
          setloading(false);
          console.log(response);
          props.recallAPI();
          setm_name(null);
          setm_desc("");
        })
        .catch(function (error) {
          setloading(false);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            setm_name_error(error.response.data);
            setenable(false);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
          }
        });
    }
  };

  return (
    <div className="DataLakeNewBucketModal">
      <Modal
        width={"35%"}
        wrapClassName="DataLakeNewBucketModal"
        visible={props.isModalVisible}
        onCancel={props.handleCancel}
        footer={false}
        closable={false}
        bodyStyle={{ borderRadius: "20px" }}
      >
        <Cliploader loading={loading} />
        <div
          style={{
            height: "50px",
            background: "#EFF4F9",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <div style={{ display: "flex", padding: "12px", marginLeft: "15px" }}>
            <h2
              style={{
                flexGrow: "1",
                fontWeight: "bold",
                color: "#90A8BE",
                fontSize: "18px",
                fontStyle: "normal",
              }}
            >
              Create New Data Bucket
            </h2>
            <img
              onClick={props.handleCancel}
              src={closeIcon}
              style={{
                paddingBottom: "10px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            flexDirection: "column",
            textAlign: "center",
            paddingBottom: "19px",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <div
            style={{
              textAlign: "left",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "14px",
              color: "black",
              marginLeft: "16px",
              marginBottom: "10px",
            }}
          >
            Data Bucket Name
          </div>
          <input
            placeholder="Enter data bucket name"
            type="text"
            autoComplete="off"
            id="project_name"
            value={m_name}
            maxLength={30}
            minLength={5}
            onChange={(e) => validate(e)}
          />
          <p
            style={
              m_name_error === null
                ? { display: "none" }
                : {
                    color: "#EC547A",
                    fontSize: "14px",
                    fontFamily: "Lato",
                    textAlign: "left",
                    fontStyle: "normal",
                    marginLeft: "16px",
                  }
            }
          >
            *{m_name_error}
          </p>

          <div
            style={{
              textAlign: "left",
              marginLeft: "16px",
              fontStyle: "normal",
              color: "#EC547A",
            }}
          >
            {Message}
          </div>
          <div
            style={{
              textAlign: "left",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "14px",
              color: "black",
              marginLeft: "16px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Data Bucket Description
          </div>
          <input
            placeholder="Enter data bucket description"
            type="text"
            maxLength={300}
            value={m_desc}
            onChange={(e) => setm_desc(e.target.value)}
            style={{ marginBottom: "15px" }}
            autoComplete="off"
          />
          <hr
            style={{
              backgroundColor: "#E2E9EF",
              border: "none",
              height: "1px",
              marginBottom: "20px",
              width: "100%",
            }}
          />
          <div style={{ marginBottom: "0px" }}>
            <Button
              style={{
                width: "120px",
                height: "35px",
                backgroundColor: "white",
                fontFamily: "Lato",
                fontSize: "16px",
                fontWeight: "700",
                color: "#085FAB",
                border: "none",
                borderRadius: "65px",
              }}
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={
                enable
                  ? {
                      width: "130px",
                      height: "35px",
                      backgroundColor: "#085FAB",
                      fontFamily: "Lato",
                      fontSize: "14px",
                      fontWeight: "normal",
                      letterSpacing: "0.5px",
                      color: "white",
                      border: "none",
                      borderRadius: "65px",
                      borderColor: "none",
                    }
                  : {
                      width: "130px",
                      height: "35px",
                      backgroundColor: "#085FAB",
                      fontFamily: "Lato",
                      fontSize: "14px",
                      fontWeight: "normal",
                      letterSpacing: "0.5px",
                      color: "white",
                      border: "none",
                      borderRadius: "65px",
                      borderColor: "none",
                      cursor: "not-allowed",
                      opacity: "0.3",
                    }
              }
              onClick={() => {
                createBucket();
                // props.handleOK(m_name, m_desc)
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
