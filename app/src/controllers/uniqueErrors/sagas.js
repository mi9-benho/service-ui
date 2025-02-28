/*
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';
import { URLS } from 'common/urls';
import { activeProjectSelector } from 'controllers/user';
import {
  fetchParentItems,
  fetchParentLaunch,
  launchSelector,
  namespaceSelector,
  queryParametersSelector,
} from 'controllers/testItem';
import { createFetchPredicate, fetchDataAction } from 'controllers/fetch';
import {
  launchIdSelector,
  pagePropertiesSelector,
  pathnameChangedSelector,
} from 'controllers/pages';
import { PAGE_KEY, SIZE_KEY } from 'controllers/pagination';
import { SORTING_KEY } from 'controllers/sorting';
import { unselectAllItemsAction } from 'controllers/groupOperations';
import {
  FETCH_GLOBAL_INTEGRATIONS_SUCCESS,
  NAMESPACE as PLUGINS_NAMESPACE,
} from 'controllers/plugins/constants';
import {
  fetchGlobalIntegrationsAction,
  globalIntegrationsSelector,
  pluginsSelector,
} from 'controllers/plugins';

import { COMMAND_GET_CLUSTERS } from 'controllers/plugins/uiExtensions/constants';
import { locationSelector } from 'controllers/pages/selectors';
import {
  CLEAR_CLUSTER_ITEMS,
  clusterItemsSagas,
  selectedClusterItemsSelector,
} from './clusterItems';
import { FETCH_CLUSTERS, NAMESPACE, RELOAD_CLUSTERS } from './constants';
import { setPageLoadingAction } from './actionCreators';

function* getIntegration() {
  // TODO: In the future plugins with js parts should not depend on integrations, only on plugins.
  // TODO: This should be removed when common getFile plugin command will be presented in all plugins with js files.
  let integrations = yield select(globalIntegrationsSelector);
  const { kind } = yield select(locationSelector);
  const pageIsReloaded = kind === 'load';

  if (!integrations.length && !pageIsReloaded) {
    yield put(fetchGlobalIntegrationsAction());
    const response = yield take(FETCH_GLOBAL_INTEGRATIONS_SUCCESS);
    integrations = response.payload;
  }
  const supportedIntegration = integrations.find(
    (item) =>
      item &&
      item.integrationType &&
      item.integrationType.details &&
      item.integrationType.details.metadata &&
      item.integrationType.details.metadata.supportedFeatures &&
      item.integrationType.details.metadata.supportedFeatures.includes('uniqueErrorsClusters'),
  );
  if (!supportedIntegration) return null;

  let plugins = yield select(pluginsSelector);
  if (!plugins.length) {
    yield put(fetchDataAction(PLUGINS_NAMESPACE)(URLS.plugin()));
    const response = yield take(createFetchPredicate(PLUGINS_NAMESPACE));
    plugins = response.payload;
  }
  const plugin = plugins.find((item) => item.name === supportedIntegration.name);

  return plugin.enabled && supportedIntegration;
}

function* fetchClusters(payload = {}) {
  const { refresh = false } = payload;
  const launchId = yield select(launchIdSelector);
  const parentLaunch = yield select(launchSelector);
  const project = yield select(activeProjectSelector);
  const isPathNameChanged = yield select(pathnameChangedSelector);
  const selectedItems = yield select(selectedClusterItemsSelector);

  if (selectedItems.length) {
    yield put(unselectAllItemsAction(NAMESPACE)());
  }
  if (isPathNameChanged && !refresh) {
    yield put(setPageLoadingAction(true));
  }
  if (!parentLaunch) {
    yield call(fetchParentItems);
  } else {
    yield call(fetchParentLaunch, { payload: { project, launchId } });
  }

  const namespace = yield select(namespaceSelector);
  const query = yield select(queryParametersSelector, namespace);

  let url;
  const requestParams = {};
  const integration = yield call(getIntegration);
  if (integration) {
    url = URLS.projectIntegrationByIdCommand(project, integration.id, COMMAND_GET_CLUSTERS);
    requestParams.method = 'PUT';
    const uniqueErrorsParams = yield select(pagePropertiesSelector, NAMESPACE);
    requestParams.data = {
      launchId,
      ...uniqueErrorsParams,
      pageNumber: query[PAGE_KEY],
      pageSize: query[SIZE_KEY],
    };
  } else {
    url = URLS.clusterByLaunchId(project, launchId, {
      [PAGE_KEY]: query[PAGE_KEY],
      [SIZE_KEY]: query[SIZE_KEY],
      [SORTING_KEY]: query[SORTING_KEY],
    });
  }
  yield put(fetchDataAction(NAMESPACE)(url, requestParams));

  if (isPathNameChanged && !refresh) {
    const waitEffects = [take(createFetchPredicate(NAMESPACE))];
    yield all(waitEffects);
    yield put(setPageLoadingAction(false));
  }
}

function* reloadClusters() {
  yield put({ type: CLEAR_CLUSTER_ITEMS });
  yield call(fetchClusters, { refresh: true });
}

function* watchFetchClusters() {
  yield takeEvery(FETCH_CLUSTERS, fetchClusters);
}

function* watchReloadClusters() {
  yield takeEvery(RELOAD_CLUSTERS, reloadClusters);
}

export function* uniqueErrorsSagas() {
  yield all([watchFetchClusters(), clusterItemsSagas(), watchReloadClusters()]);
}
