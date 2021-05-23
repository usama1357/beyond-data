import React, { useState } from "react";
import { useParams } from "react-router-dom";
import bucketIcon from "../../../Components/Icons/DataLake/bucketIcon.svg";
import searchIcon from "../../../Components/Icons/AutoML/search.svg";
import "./styles.css";
import { Button } from "antd";
import DataLakeDatasetsTable from "../../../Components/Tables/DataLakeDatasetsTable/DataLakeDatasetstable";
import shareIcon from "../../../Components/Icons/AutoML/share.svg";
import deleteIcon from "../../../Components/Icons/AutoML/delete.svg";
import downloadIcon from "../../../Components/Icons/AutoML/download.svg";
import DataLakeDeleteDatasetModal from "../../../Components/Modals/DataLakeDeleteDatasetModal/DataLakeDeleteDatasetModal";
import DataLakeShareDatasetModal from "../../../Components/Modals/DataLakeShareDatasetModal/DataLakeShareDatasetModal";
import DataLakeDatasetInfoDrawer from "../../../Components/Drawers/DataLakeDatasetInfoDrawer/DataLakeDatasetInfoDrawer";
import Modal from "antd/lib/modal/Modal";
import AutoMLSelectedDatasetsPreviewRowsTable from "../../../Components/Tables/AutoMLSelectedDataPopupTables/AutoMLSelectedDatasetsPreviewRowsTable";
import AutoMLSelectedDatasetsMetaTable from "../../../Components/Tables/AutoMLSelectedDatasetsMetaTable/AutoMLSelectedDatasetsMetaTable";

export default function DatasetsMain() {
  const { databucket } = useParams();

  const [searchval, setsearchval] = useState("");
  const [selected, setselected] = useState(null);

  const [shareModal, setshareModal] = useState(false);
  const [downloadModal, setdownloadModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [infoDrawer, setinfoDrawer] = useState(false);
  const [showpopup, setshowpopup] = useState(false);

  const [datasets, setdatasets] = useState();
  const [selectedDataset, setselectedDataset] = useState(null);

  const [rows, setrows] = useState([
    [
      "Customer ID",
      "Product ID",
      "Dept Name",
      "Quantity",
      "Lorem Ipsum",
      "Price",
    ],
    ["1234", "AB567", "QIB231", "Lorem Ipsum", "Oil Barrel", "131"],
    ["1234", "AB567", "QIB231", "Lorem Ipsum", "Oil Barrel", "131"],
    ["1234", "AB567", "QIB231", "Lorem Ipsum", "Oil Barrel", "131"],
  ]);
  const [meta, setmeta] = useState([
    ["Product ID", "Dept Name", "Quantity", "Lorem Ipsum", "Price"],
    ["Integer", "String", "Integer", "String", "Integer"],
    ["-", "-", "In Hundreds", "Percentage", "In Millions"],
    ["-", "-", "-", "(a+b)/2", "-"],
  ]);

  const shareDataset = () => {
    console.log("share bucket API");
  };
  const deleteDataset = () => {
    console.log("delete bucket API");
  };

  return (
    <div
      className="DatasetsMain"
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        height: "100%",
      }}
    >
      <div>
        <div style={{ display: "flex" }}>
          <img src={bucketIcon} alt="icon" width={20} />
          <span
            style={{
              flexGrow: "1",
              fontWeight: "bold",
              fontStyle: "normal",
              fontSize: "18px",
              marginLeft: "10px",
            }}
          >
            {databucket}
          </span>
          <div className="Searchbar">
            <input
              type="text"
              name="search"
              autoComplete="off"
              style={{ backgroundImage: `url(${searchIcon})` }}
              // placeholder="Search.."
              value={searchval}
              onChange={(e) => setsearchval(e.target.value)}
            />
          </div>
          <Button
            className="UploadButton"
            style={selected === null ? null : { display: "none" }}
          >
            Upload Dataset
          </Button>
          <div
            style={
              selected !== null
                ? {
                    marginBottom: "0px",
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                  }
                : { display: "none" }
            }
          >
            <div
              style={
                selected === null
                  ? {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "22px",
                      cursor: "not-allowed",
                      opacity: "0.3",
                    }
                  : {
                      display: "flex",
                      height: "16px",
                      marginBottom: "9px",
                      marginRight: "22px",
                      cursor: "pointer",
                    }
              }
            >
              <img
                src={downloadIcon}
                alt="icon"
                style={{ width: "16px", height: "16px", marginRight: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  height: "16px",
                  color: "#6D6D6D",
                  fontWeight: "bold",
                }}
              >
                Download
              </span>
            </div>
            <div
              style={{
                display: "flex",
                height: "16px",
                marginBottom: "9px",
                marginRight: "22px",
                cursor: "pointer",
              }}
              onClick={() => {
                setshareModal(true);
              }}
            >
              <img
                src={shareIcon}
                alt="icon"
                style={{ width: "18px", height: "18px", marginRight: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  height: "16px",
                  color: "#6D6D6D",
                }}
              >
                Share
              </span>
            </div>

            <div
              style={{
                display: "flex",
                height: "16px",
                marginBottom: "9px",
                marginRight: "18px",
                cursor: "pointer",
              }}
              onClick={() => setdeleteModal(true)}
            >
              <img
                src={deleteIcon}
                alt="icon"
                style={{ width: "18px", height: "18px", marginRight: "5px" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  height: "10px",
                  color: "#6D6D6D",
                  fontWeight: "bold",
                }}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "100%",
          backgroundColor: "#E1EEFF",
          border: "none",
          height: "1px",
          marginBottom: "0px",
        }}
      />
      <div style={{ flexGrow: "1", overflow: "scroll" }}>
        <DataLakeDatasetsTable
          selected={(id) => setselected(id)}
          selectedDataset={(val) => setselectedDataset(val)}
          showdrawer={() => setinfoDrawer(true)}
          showpopup={() => setshowpopup(true)}
        />
      </div>
      <DataLakeDeleteDatasetModal
        isModalVisible={deleteModal}
        handleCancel={() => setdeleteModal(false)}
        handleOK={() => deleteDataset()}
      />
      <DataLakeShareDatasetModal
        isModalVisible={shareModal}
        handleCancel={() => setshareModal(false)}
        handleOK={() => shareDataset()}
      />
      <DataLakeDatasetInfoDrawer
        onClose={() => setinfoDrawer(false)}
        drawervisible={infoDrawer}
        type={"My Data"}
        data={selectedDataset}
      />
      {selectedDataset !== null ? (
        <Modal
          title={"Configurations"}
          visible={showpopup}
          footer={false}
          centered
          onCancel={() => setshowpopup(false)}
          wrapClassName="PreviewPopup"
          width={"80%"}
          style={{ fontStyle: "normal" }}
        >
          <p className="sublink">{selectedDataset.name}</p>
          <p className="subtitle" style={{ marginBottom: "7px" }}>
            Dataset Description
          </p>
          <p className="desc">{selectedDataset.description} </p>
          <div
            style={{
              width: "inherit",
              overflowX: "scroll",
              paddingBottom: "10px",
            }}
          >
            <AutoMLSelectedDatasetsPreviewRowsTable rows={rows} />
          </div>
          <p className="subtitle" style={{ marginTop: "10px" }}>
            Meta Data
          </p>
          <div
            style={{
              width: "inherit",
              overflowX: "scroll",
              paddingBottom: "10px",
            }}
          >
            <AutoMLSelectedDatasetsMetaTable rows={meta} />
          </div>
          <Button
            style={{
              width: "120px",
              height: "40px",
              background: "#085fab",
              borderRadius: "64px",
              color: "white",
              fontWeight: "bold",
              fontStyle: "normal",
              fontSize: "14px",
              letterSpacing: "1.3px",
            }}
          >
            Configure
          </Button>
        </Modal>
      ) : null}
    </div>
  );
}
