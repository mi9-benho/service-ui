/*
 * Copyright 2019 EPAM Systems
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

import {
  FETCH_LOG_PAGE_DATA,
  FETCH_LOG_PAGE_STACK_TRACE,
  CLEAR_LOG_PAGE_STACK_TRACE,
  SET_LOG_PAGE_LOADING,
  FETCH_HISTORY_ITEMS_SUCCESS,
  UPDATE_HISTORY_ITEM_ISSUES,
  SET_INCLUDE_ALL_LAUNCHES,
  FETCH_HISTORY_LINE_ITEMS,
  SET_SHOULD_SHOW_LOAD_MORE,
  UPDATE_HISTORY_ITEM_LAUNCH_ATTRIBUTES,
  SET_ACTIVE_TAB_ID,
  FETCH_HISTORY_ITEMS_WITH_LOADING,
  FETCH_ERROR_LOGS,
  FETCH_ERROR_LOG,
} from './constants';

export const fetchLogPageData = () => ({
  type: FETCH_LOG_PAGE_DATA,
});

export const refreshLogPageData = () => ({
  type: FETCH_LOG_PAGE_DATA,
  meta: {
    refresh: true,
  },
});

export const fetchHistoryItemsSuccessAction = (items) => ({
  type: FETCH_HISTORY_ITEMS_SUCCESS,
  payload: items,
});

export const fetchHistoryItemsAction = (loadMore = false, callback) => ({
  type: FETCH_HISTORY_LINE_ITEMS,
  payload: { loadMore, callback },
});

export const fetchLogPageStackTrace = (logItem) => ({
  type: FETCH_LOG_PAGE_STACK_TRACE,
  payload: logItem,
});

export const clearLogPageStackTrace = () => ({
  type: CLEAR_LOG_PAGE_STACK_TRACE,
});

export const fetchErrorLogs = (logItem) => ({
  type: FETCH_ERROR_LOGS,
  payload: logItem,
});

export const fetchErrorLog = (errorLogInfo, callback) => ({
  type: FETCH_ERROR_LOG,
  payload: { errorLogInfo, callback },
});

export const setPageLoadingAction = (isLoading) => ({
  type: SET_LOG_PAGE_LOADING,
  payload: isLoading,
});

export const setIncludeAllLaunchesAction = (includeAllLaunches) => ({
  type: SET_INCLUDE_ALL_LAUNCHES,
  payload: includeAllLaunches,
});

export const setShouldShowLoadMoreAction = (shouldShowLoadMore) => ({
  type: SET_SHOULD_SHOW_LOAD_MORE,
  payload: shouldShowLoadMore,
});

export const updateHistoryItemIssuesAction = (issues) => ({
  type: UPDATE_HISTORY_ITEM_ISSUES,
  payload: issues,
});

export const updateHistoryItemLaunchAttributesAction = (launch) => ({
  type: UPDATE_HISTORY_ITEM_LAUNCH_ATTRIBUTES,
  payload: launch,
});

export const setActiveTabIdAction = (activeTabId) => ({
  type: SET_ACTIVE_TAB_ID,
  payload: activeTabId,
});

export const fetchHistoryItemsWithLoadingAction = () => ({
  type: FETCH_HISTORY_ITEMS_WITH_LOADING,
});
