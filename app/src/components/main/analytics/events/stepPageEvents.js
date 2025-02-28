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
import { getBasicClickEventParameters } from './common/ga4Utils';
import {
  getEditDefectActionEvent,
  getDeleteActionEvent,
  getLinkIssueActionEvent,
  getPostIssueActionEvent,
  getUnlinkIssueActionEvent,
  getChangeFilterEvent,
  getClickSelectAllItemsEvent,
  getClickSelectOneItemEvent,
  getCommonActionEvents,
  getClickOnAttributesEvent,
  getClickIssueTicketEvent,
  getClickExpandStackTraceArrowEvent,
  getIncludeBtnIncludeInAAModalEvent,
  getClickItemNameEvent,
  getClickRefreshButtonEvent,
  getClickDefectTooltipEvents,
  getClickActionsButtonEvent,
  getClickPencilIconEvent,
  getRefineParametersEventCreator,
  getClickOnTestItemsTabsEvents,
  getClickBreadcrumbsEvents,
  getChangeItemStatusEventCreator,
  getIgnoreInAutoAnalysisActionEventCreator,
  getIncludeInAutoAnalysisActionEventCreator,
} from './common/testItemPages/actionEventsCreators';
import {
  getEditToInvestigateChangeSearchModeEvent,
  getEditToInvestigateSelectAllSimilarItemsEvent,
  getEditToInvestigateSelectSpecificSimilarItemEvent,
  getUnlinkIssueModalEvents,
  getPostIssueModalEvents,
  getLinkIssueModalEvents,
  getClickOnDeleteBtnDeleteItemModalEventCreator,
  getEditItemsModalEvents,
  getMakeDecisionModalEvents,
  getEditItemDetailsModalEvents,
  getIgnoreBtnIgnoreItemsInAAModalEvent,
} from './common/testItemPages/modalEventsCreators';

export const STEP_PAGE = 'step';

const basicClickEventParametersStepPage = getBasicClickEventParameters(STEP_PAGE);

export const getChangeItemStatusEvent = (oldStatus, newStatus) => ({
  category: STEP_PAGE,
  action: `Choose in drop-down from ${oldStatus} to ${newStatus}`,
  label: `Change status from ${oldStatus} to ${newStatus}`,
});

export const STEP_PAGE_EVENTS = {
  // GA4 events
  CLICK_ITEM_NAME: getClickItemNameEvent(STEP_PAGE),
  CLICK_REFRESH_BTN: getClickRefreshButtonEvent(STEP_PAGE),
  CLICK_SELECT_ALL_ITEMS: getClickSelectAllItemsEvent(STEP_PAGE),
  CLICK_SELECT_ONE_ITEM: getClickSelectOneItemEvent(STEP_PAGE),
  ...getClickDefectTooltipEvents(STEP_PAGE),
  CLICK_ACTIONS_BTN: getClickActionsButtonEvent(STEP_PAGE),
  CLICK_EDIT_ICON: getClickPencilIconEvent(STEP_PAGE),
  REFINE_FILTERS_PANEL_EVENTS: {
    commonEvents: { getRefineParametersEvent: getRefineParametersEventCreator(STEP_PAGE) },
    getChangeFilterEvent: getChangeFilterEvent(STEP_PAGE),
  },
  ...getClickBreadcrumbsEvents(STEP_PAGE),
  CLICK_ATTRIBUTES: getClickOnAttributesEvent(STEP_PAGE),
  TEST_ITEM_TABS_EVENTS: getClickOnTestItemsTabsEvents(STEP_PAGE),
  getClickOnDeleteBtnDeleteItemModalEvent: getClickOnDeleteBtnDeleteItemModalEventCreator(
    STEP_PAGE,
  ),
  CLICK_ON_RETRIES_BTN: {
    ...basicClickEventParametersStepPage,
    place: 'item_info',
    element_name: 'retries',
  },
  CLICK_ON_PARTICULAR_RETRY_BTN: {
    ...basicClickEventParametersStepPage,
    place: 'item_info',
    element_name: 'retry_to_read',
  },
  CLICK_LINK_OPEN_RETRY_IN_LOG_VIEW: {
    ...basicClickEventParametersStepPage,
    place: 'retries_info',
    link_name: 'open_in_log_view',
  },
  getChangeItemStatusEvent: getChangeItemStatusEventCreator(STEP_PAGE),
  getSwitchMethodTypeEvent: (isActive) => ({
    ...basicClickEventParametersStepPage,
    element_name: 'method_type',
    switcher: isActive ? 'on' : 'off',
  }),
  DELETE_ACTION: getDeleteActionEvent(STEP_PAGE),
  EDIT_DEFECT_ACTION: getEditDefectActionEvent(STEP_PAGE),
  POST_ISSUE_ACTION: getPostIssueActionEvent(STEP_PAGE),
  LINK_ISSUE_ACTION: getLinkIssueActionEvent(STEP_PAGE),
  UNLINK_ISSUES_ACTION: getUnlinkIssueActionEvent(STEP_PAGE),
  IGNORE_IN_AA_ACTION: getIgnoreInAutoAnalysisActionEventCreator(STEP_PAGE),
  INCLUDE_IN_AA_ACTION: getIncludeInAutoAnalysisActionEventCreator(STEP_PAGE),
  // MODAL EVENTS
  EDIT_ITEM_DETAILS_MODAL_EVENTS: getEditItemDetailsModalEvents(STEP_PAGE),
  IGNORE_BTN_IGNORE_ITEMS_IN_AA_MODAL: getIgnoreBtnIgnoreItemsInAAModalEvent(STEP_PAGE),
  // GA3 events
  ...getCommonActionEvents(STEP_PAGE),
  // REFINE_FILTERS_PANEL
  METHOD_TYPE_FILTER: {
    category: STEP_PAGE,
    action: 'Click on icon "filter" Method type',
    label: 'Arises active "Method type" input',
  },
  METHOD_TYPE_SORTING: {
    category: STEP_PAGE,
    action: 'Click on icon "sorting" Method type',
    label: 'Sort items by Method type',
  },
  NAME_FILTER: {
    category: STEP_PAGE,
    action: 'Click on icon "filter" Name',
    label: 'Suite name input becomes active',
  },
  NAME_SORTING: {
    category: STEP_PAGE,
    action: 'Click on icon "sorting" Name',
    label: 'Sort items by Name',
  },
  STATUS_FILTER: {
    category: STEP_PAGE,
    action: 'Click on icon "filter" Status',
    label: 'Arises active "Status" input',
  },
  STATUS_SORTING: {
    category: STEP_PAGE,
    action: 'Click on icon "sorting" Status',
    label: 'Sort items by Status',
  },
  START_TIME_FILTER: {
    category: STEP_PAGE,
    action: 'Click on icon "filter" Start time',
    label: 'Arises active "Start time" input',
  },
  START_TIME_SORTING: {
    category: STEP_PAGE,
    action: 'Click on icon "sorting" Start time',
    label: 'Sort items by Start time',
  },
  DEFECT_TYPE_FILTER: {
    category: STEP_PAGE,
    action: 'Click on icon "filter" Defect type',
    label: 'Arises active "Defect type" input',
  },
  EDIT_DEFECT_TYPE_ICON: {
    category: STEP_PAGE,
    action: 'Click on icon "edit" of Defect type tag',
    label: 'Arise Modal "Edit Defect Type"',
  },
  UNLINK_SINGLE_ISSUE: {
    category: STEP_PAGE,
    action: 'Click on Cross icon in issue block',
    label: 'Arise Modal "Unlink issue"',
  },
  // EDIT_DEFECT_MODAL
  SELECT_ALL_SIMILAR_ITEMS_EDIT_DEFECT_MODAL: getEditToInvestigateSelectAllSimilarItemsEvent(
    STEP_PAGE,
  ),
  SELECT_SPECIFIC_SIMILAR_ITEM_EDIT_DEFECT_MODAL: getEditToInvestigateSelectSpecificSimilarItemEvent(
    STEP_PAGE,
  ),
  CHANGE_SEARCH_MODE_EDIT_DEFECT_MODAL: getEditToInvestigateChangeSearchModeEvent(STEP_PAGE),
  // UNLINK_ISSUE_MODAL
  UNLINK_ISSUE_MODAL_EVENTS: getUnlinkIssueModalEvents(STEP_PAGE),
  // POST_ISSUE_MODAL
  POST_ISSUE_MODAL_EVENTS: getPostIssueModalEvents(STEP_PAGE),
  // LINK_ISSUE_MODAL
  LINK_ISSUE_MODAL_EVENTS: getLinkIssueModalEvents(STEP_PAGE),
  // EDIT_ITEMS_MODAL
  EDIT_ITEMS_MODAL_EVENTS: getEditItemsModalEvents(STEP_PAGE),
  LOG_VIEW_SWITCHER: {
    category: STEP_PAGE,
    action: 'Click on test log view switcher',
    label: 'Open "Parent log view"',
  },
  COPY_CODE_REFERENCE_EDIT_ITEM_MODAL: {
    category: STEP_PAGE,
    action: 'Click on "Copy Code reference"',
    label: 'Copy Code reference',
  },
  CLOSE_ICON_IGNORE_ITEMS_IN_AA_MODAL: {
    category: STEP_PAGE,
    action: 'Click on Close icon in Modal "Ignore items in AA"',
    label: 'Close Modal "Ignore items in AA"',
  },
  CANCEL_BTN_IGNORE_ITEMS_IN_AA_MODAL: {
    category: STEP_PAGE,
    action: 'Click on Cancel in Modal "Ignore items in AA"',
    label: 'Close Modal "Ignore items in AA"',
  },
  INCLUDE_BTN_INCLUDE_IN_AA_MODAL: getIncludeBtnIncludeInAAModalEvent(STEP_PAGE),
  CLOSE_ICON_INCLUDE_ITEMS_IN_AA_MODAL: {
    category: STEP_PAGE,
    action: 'Click on Close icon in Modal "Include items in AA"',
    label: 'Close Modal "Include items in AA"',
  },
  CANCEL_BTN_INCLUDE_IN_AA_MODAL: {
    category: STEP_PAGE,
    action: 'Click on Cancel in Modal "Include items in AA"',
    label: 'Close Modal "Include items in AA"',
  },
  MAKE_DECISION_MODAL_EVENTS: getMakeDecisionModalEvents(STEP_PAGE),
  onClickIssueTicketEvent: getClickIssueTicketEvent(STEP_PAGE),
  CLICK_EXPAND_STACK_TRACE_ARROW: getClickExpandStackTraceArrowEvent(STEP_PAGE),
};
