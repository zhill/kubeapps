import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Dispatch } from "redux";

import actions from "../../actions";
import AppUpgrade from "../../components/AppUpgrade";
import { IChartVersion, IStoreState } from "../../shared/types";

interface IRouteProps {
  match: {
    params: {
      namespace: string;
      releaseName: string;
    };
  };
}

function mapStateToProps(
  { apps, catalog, charts, repos }: IStoreState,
  { match: { params } }: IRouteProps,
) {
  return {
    app: apps.selected,
    bindingsWithSecrets: catalog.bindingsWithSecrets,
    error: apps.error || charts.selected.error,
    namespace: params.namespace,
    releaseName: params.releaseName,
    repo: repos.repo,
    repoError: repos.errors.fetch,
    repos: repos.repos,
    selected: charts.selected,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IStoreState>) {
  return {
    checkChart: (repo: string, chartName: string) =>
      dispatch(actions.repos.checkChart(repo, chartName)),
    clearRepo: () => dispatch(actions.repos.clearRepo()),
    fetchChartVersions: (id: string) => dispatch(actions.charts.fetchChartVersions(id)),
    fetchRepositories: () => dispatch(actions.repos.fetchRepos()),
    getApp: (releaseName: string, ns: string) => dispatch(actions.apps.getApp(releaseName, ns)),
    getBindings: (ns: string) => dispatch(actions.catalog.getBindings(ns)),
    getChartValues: (id: string, version: string) =>
      dispatch(actions.charts.getChartValues(id, version)),
    getChartVersion: (id: string, version: string) =>
      dispatch(actions.charts.getChartVersion(id, version)),
    push: (location: string) => dispatch(push(location)),
    upgradeApp: (version: IChartVersion, releaseName: string, namespace: string, values?: string) =>
      dispatch(actions.apps.upgradeApp(version, releaseName, namespace, values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppUpgrade);
