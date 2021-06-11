import React, { useState } from "react";
import { Prompt, Route, Switch, useHistory } from "react-router-dom";
import { AuthProvider } from "../../Data/Contexts/AutoMLAuthContext/AutoMLAuthContext";
import { NotificationsProvider } from "../../Data/Contexts/AutoMLNotifications/AutoMLNotificationsContext";
import { PageProvider } from "../../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import styles from "./DataLakesRoutes.module.scss";
import leftArrow from "../../Components/Images/AutoML/leftarrow.svg";
import rightArrow from "../../Components/Images/AutoML/rightarrow.svg";
import Layout, { Content } from "antd/lib/layout/layout";
import AutoMLHeader from "../../Components/Header/AutoMLHeader/AutoMLHeader";
import AutoMLSideBar from "../../Components/SideBar/AutoMLSideBar/AutoMLSideBar";
import AutoMLBreadcrumbs from "../../Components/BreadCrumbs/AutoMLBreadcrumbs/AutoMLBreadcrumbs";
import Error404 from "../../Components/ErrorScreens/Error404";
import DataBucketsMain from "../../Pages/DataLake/DataBucketsMain/DataBucketsMain";
import DatasetsMain from "../../Pages/DataLake/DatasetsMain/DatasetsMain";
import DataLakeConcat from "../../Pages/DataLake/DataLakeConcat/DataLakeConcat";
import DatasetConfigure from "../../Pages/DataLake/DatasetConfigure/DatasetConfigure";
import { DataLakeBucketProvider } from "../../Data/Contexts/DataLake/DataLakeBucketContext/DataLakeBucketContext";
import { DataLakeDatasetProvider } from "../../Data/Contexts/DataLake/DataLakeDatasetContext/DataLakeDatasetContext";
import { DataLakeFileUploadProvider } from "../../Data/Contexts/DataLakeFileUploadContext/DataLakeFileUploadContext";

export default function DataLakesRoutes() {
  let pages = JSON.parse(localStorage.getItem("Page"));
  let history = useHistory();

  const [prompt, setprompt] = useState(false);

  return (
    <div>
      <AuthProvider>
        <NotificationsProvider>
          <DataLakeFileUploadProvider>
            <DataLakeBucketProvider>
              <DataLakeDatasetProvider>
                <PageProvider>
                  <Layout style={{ height: "100vh" }}>
                    <AutoMLHeader />
                    <Layout>
                      <AutoMLSideBar />
                      <Layout style={{ backgroundColor: "#F5FAFF" }}>
                        <AutoMLBreadcrumbs />
                        <Content className={styles.content}>
                          <Switch>
                            <Route
                              exact
                              path="/datalake/databuckets"
                              component={DataBucketsMain}
                            />
                            <Route
                              exact
                              path="/datalake/:databucket/datasets"
                              component={DatasetsMain}
                            />
                            <Route
                              exact
                              path="/datalake/:databucket/datasets/:dataset/concat/"
                              component={DataLakeConcat}
                            />
                            <Route
                              exact
                              path="/datalake/:databucket/datasets/:dataset/configure/"
                              component={DatasetConfigure}
                            />
                            <Route exact path="/" component={DataBucketsMain} />
                          </Switch>
                          <div
                            className={styles.leftArrow}
                            // onClick={() => goBack()}
                          >
                            <img
                              src={leftArrow}
                              style={{
                                width: "45px",
                                cursor: "pointer",
                              }}
                              alt="leftArrow"
                            />
                          </div>
                          <div
                            className={styles.rightArrow}
                            // onClick={() => goNext()}
                          >
                            <img
                              src={rightArrow}
                              style={{ width: "45px", cursor: "pointer" }}
                              alt="rightArrow"
                            />
                          </div>
                        </Content>
                      </Layout>
                    </Layout>
                  </Layout>
                </PageProvider>
              </DataLakeDatasetProvider>
            </DataLakeBucketProvider>
          </DataLakeFileUploadProvider>
        </NotificationsProvider>
      </AuthProvider>
      <Prompt
        when={prompt}
        message={() => "Are you sure you want to leave this page?"}
      />
    </div>
  );
}
