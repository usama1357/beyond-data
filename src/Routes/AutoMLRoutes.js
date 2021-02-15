import Layout, { Content } from "antd/lib/layout/layout";
import React from "react";
import { Route } from "react-router-dom";
import AutoMLBreadcrumbs from "../Components/BreadCrumbs/AutoMLBreadcrumbs/AutoMLBreadcrumbs";
import AutoMLHeader from "../Components/Header/AutoMLHeader/AutoMLHeader";
import AutoMLSideBar from "../Components/SideBar/AutoMLSideBar/AutoMLSideBar";
import CreateNewModel from "../Pages/AutoML/CreateNewModel/CreateNewModel";
import CreateNewProject from "../Pages/AutoML/CreateNewProject/CreateNewProject";
import ExistingModels from "../Pages/AutoML/ExistingModels/ExistingModels";
import NewProject from "../Pages/AutoML/NewProject/NewProject";
import SelectDatasets from "../Pages/AutoML/SelectDatasets/SelectDatasets";
import SelectedDatasets from "../Pages/AutoML/SelectedDatasets/SelectedDatasets";
import styles from "./AutoMLRoutes.module.scss";

export default function AutoMLRoutes() {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <AutoMLHeader />
        <Layout>
          <AutoMLSideBar />
          <Layout style={{ backgroundColor: "#F5FAFF" }}>
            <AutoMLBreadcrumbs />
            <Content className={styles.content}>
              <Route exact path="/automl/projects" component={NewProject} />
              <Route
                exact
                path="/automl/projects/newproject"
                component={CreateNewProject}
              />
              <Route
                exact
                path="/automl/projects/:project_id/models"
                component={ExistingModels}
              />
              <Route
                exact
                path="/automl/projects/:project_id/models/newmodel"
                component={CreateNewModel}
              />
              <Route
                exact
                path="/automl/projects/:project_id/models/:model_id/select_datasets"
                component={SelectDatasets}
              />
              <Route
                exact
                path="/automl/projects/:project_id/models/:model_id/selected_datasets"
                component={SelectedDatasets}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
