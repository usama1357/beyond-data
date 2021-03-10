import Layout, { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { Prompt, Route, useHistory, useParams } from "react-router-dom";
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
import leftArrow from "../Components/Images/AutoML/leftarrow.svg";
import rightArrow from "../Components/Images/AutoML/rightarrow.svg";
import DatasetProcessing from "../Pages/AutoML/DatasetProcessing/DatasetProcessing";
import LinkColumns from "../Pages/AutoML/LinkColumns/LinkColumns";
import CustomisedDataset from "../Pages/AutoML/CustomisedDataset/CustomisedDataset";
import { ProjectProvider } from "../Data/Contexts/AutoMLProject/AutoMLProjectContext";
import { PageProvider } from "../Data/Contexts/AutoMLPageState/AutoMLPageStateContext";
import { ModelProvider } from "../Data/Contexts/AutoMLModelContext/AutoMLModelContext";

export default function AutoMLRoutes() {
  let pages = JSON.parse(localStorage.getItem("Page"));
  let project = JSON.parse(localStorage.getItem("Project"));
  let model = JSON.parse(localStorage.getItem("Model"));
  let history = useHistory();

  const [prompt, setprompt] = useState(false);

  const goNext = () => {
    let route = history.location.pathname.split("/");
    if (route.includes("customised_dataset") && pages) {
    } else if (route.includes("link_columns") && pages) {
      // if (pages.all.metascreen === true) {
      //   history.push({
      //     pathname: `/automl/projects/${project.name}/models/asdasd/customised_dataset`,
      //     state: {
      //       detail: `I am ${project.name}`,
      //       page_name: "automl_models",
      //     },
      //   });
      // }
    } else if (route.includes("dataset_processing") && pages) {
      // if (pages.all.linking === true) {
      //   history.push({
      //     pathname: `/automl/projects/${project.name}/models/asdasd/link_columns`,
      //     state: {
      //       detail: `I am ${project.name}`,
      //       page_name: "automl_models",
      //     },
      //   });
      // }
    } else if (route.includes("selected_datasets") && pages) {
      if (pages.all.datasetprocessing === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/dataset_processing`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("select_datasets") && pages) {
      if (pages.all.selecteddatasets === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/selected_datasets`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("models") && pages) {
      if (pages.all.selectdatasets === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/select_datasets`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("projects") && pages) {
      if (pages.all.models === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    }
  };

  const goBack = () => {
    setprompt(false);
    let route = history.location.pathname.split("/");
    if (route.includes("customised_dataset") && pages) {
      if (pages.all.linking === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/link_columns`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("link_columns") && pages) {
      // setprompt(true);
      if (pages.all.datasetprocessing === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/dataset_processing`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("dataset_processing") && pages) {
      if (pages.all.selecteddatasets === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/selected_datasets`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("selected_datasets") && pages) {
      if (pages.all.selectdatasets === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models/${model.model.name}/select_datasets`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("select_datasets") && pages) {
      if (pages.all.models === true) {
        history.push({
          pathname: `/automl/projects/${project.name}/models`,
          state: {
            detail: `I am ${project.name}`,
            page_name: "automl_models",
          },
        });
      }
    } else if (route.includes("models") && pages) {
      if (pages.all.projects === true) {
        history.push({
          pathname: `/automl/projects/`,
          state: {
            detail: `null`,
            page_name: "automl_projects",
          },
        });
      }
    }
  };
  return (
    <div>
      <PageProvider>
        <ProjectProvider>
          <ModelProvider>
            <Layout style={{ height: "100vh" }}>
              <AutoMLHeader />
              <Layout>
                <AutoMLSideBar />
                <Layout style={{ backgroundColor: "#F5FAFF" }}>
                  <AutoMLBreadcrumbs />
                  <Content className={styles.content}>
                    <Route
                      exact
                      path="/automl/projects"
                      component={NewProject}
                    />
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
                    <Route
                      exact
                      path="/automl/projects/:project_id/models/:model_id/dataset_processing"
                      component={DatasetProcessing}
                    />
                    <Route
                      exact
                      path="/automl/projects/:project_id/models/:model_id/link_columns"
                      component={LinkColumns}
                    />
                    <Route
                      exact
                      path="/automl/projects/:project_id/models/:model_id/customised_dataset/"
                      component={CustomisedDataset}
                    />
                    <Route exact path="/" component={NewProject} />

                    <div className={styles.leftArrow} onClick={() => goBack()}>
                      <img
                        src={leftArrow}
                        style={{
                          width: "45px",
                          cursor: "pointer",
                        }}
                        alt="leftArrow"
                      />
                    </div>
                    <div className={styles.rightArrow} onClick={() => goNext()}>
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
          </ModelProvider>
        </ProjectProvider>
      </PageProvider>
      <Prompt
        when={prompt}
        message={() => "Are you sure you want to leave this page?"}
      />
    </div>
  );
}
