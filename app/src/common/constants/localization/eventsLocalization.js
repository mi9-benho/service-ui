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

import { defineMessages } from 'react-intl';
import {
  DASHBOARD,
  LAUNCH,
  WIDGET,
  FILTER,
  IMPORT,
  PROJECT,
  DEFECT_TYPE,
  USER,
  EMAIL_CONFIG,
  ITEM_ISSUE,
  INTEGRATION,
  PATTERN_RULE,
  INDEX,
} from 'common/constants/eventsObjectTypes';
import {
  CREATE_DASHBOARD,
  UPDATE_DASHBOARD,
  DELETE_DASHBOARD,
  CREATE_WIDGET,
  UPDATE_WIDGET,
  DELETE_WIDGET,
  CREATE_FILTER,
  UPDATE_FILTER,
  DELETE_FILTER,
  START_LAUNCH,
  FINISH_LAUNCH,
  DELETE_LAUNCH,
  START_IMPORT,
  FINISH_IMPORT,
  UPDATE_PROJECT,
  CREATE_DEFECT,
  UPDATE_DEFECT,
  DELETE_DEFECT,
  POST_ISSUE,
  LINK_ISSUE,
  UNLINK_ISSUE,
  UPDATE_ANALYZER,
  CREATE_INTEGRATION,
  UPDATE_INTEGRATION,
  DELETE_INTEGRATION,
  GENERATE_INDEX,
  DELETE_INDEX,
  UPDATE_ITEM,
  ANALYZE_ITEM,
  LINK_ISSUE_AA,
  CREATE_PATTERN,
  UPDATE_PATTERN,
  DELETE_PATTERN,
  MATCHED_PATTERN,
  ASSIGN_USER,
  UNASSIGN_USER,
  CHANGE_ROLE,
  CREATE_PROJECT,
} from 'common/constants/actionTypes';

export const actionMessages = defineMessages({
  [CREATE_DASHBOARD]: {
    id: 'EventActions.createDashboard',
    defaultMessage: 'Create dashboard',
  },
  [UPDATE_DASHBOARD]: {
    id: 'EventActions.updateDashboard',
    defaultMessage: 'Update dashboard',
  },
  [DELETE_DASHBOARD]: {
    id: 'EventActions.deleteDashboard',
    defaultMessage: 'Delete dashboard',
  },
  [CREATE_WIDGET]: {
    id: 'EventActions.createWidget',
    defaultMessage: 'Create widget',
  },
  [UPDATE_WIDGET]: {
    id: 'EventActions.updateWidget',
    defaultMessage: 'Update widget',
  },
  [DELETE_WIDGET]: {
    id: 'EventActions.deleteWidget',
    defaultMessage: 'Delete widget',
  },
  [CREATE_FILTER]: {
    id: 'EventActions.createFilter',
    defaultMessage: 'Create filter',
  },
  [UPDATE_FILTER]: {
    id: 'EventActions.updateFilter',
    defaultMessage: 'Update filter',
  },
  [DELETE_FILTER]: {
    id: 'EventActions.deleteFilter',
    defaultMessage: 'Delete filter',
  },
  [START_LAUNCH]: {
    id: 'EventActions.startLaunch',
    defaultMessage: 'Start launch',
  },
  [FINISH_LAUNCH]: {
    id: 'EventActions.finishLaunch',
    defaultMessage: 'Finish launch',
  },
  [DELETE_LAUNCH]: {
    id: 'EventActions.deleteLaunch',
    defaultMessage: 'Delete launch',
  },
  [START_IMPORT]: {
    id: 'EventActions.startImport',
    defaultMessage: 'Start import',
  },
  [FINISH_IMPORT]: {
    id: 'EventActions.finishImport',
    defaultMessage: 'Finish import',
  },
  [ASSIGN_USER]: {
    id: 'EventActions.assignUser',
    defaultMessage: 'Assign',
  },
  [UNASSIGN_USER]: {
    id: 'EventActions.unassignUser',
    defaultMessage: 'Unassign',
  },
  [CHANGE_ROLE]: { id: 'EventActions.changeRole', defaultMessage: 'Change role' },
  [UPDATE_PROJECT]: {
    id: 'EventActions.updateProject',
    defaultMessage: 'Update project',
  },
  [UPDATE_DEFECT]: {
    id: 'EventActions.updateDefect',
    defaultMessage: 'Update defect',
  },
  [DELETE_DEFECT]: {
    id: 'EventActions.deleteDefect',
    defaultMessage: 'Delete defect',
  },
  [POST_ISSUE]: {
    id: 'EventActions.postIssue',
    defaultMessage: 'Post issue',
  },
  [LINK_ISSUE]: {
    id: 'EventActions.linkIssue',
    defaultMessage: 'Link issue',
  },
  [UNLINK_ISSUE]: {
    id: 'EventActions.unlinkIssue',
    defaultMessage: 'Unlink issue',
  },
  [CREATE_INTEGRATION]: {
    id: 'EventActions.createIntegration',
    defaultMessage: 'Create integration',
  },
  [UPDATE_INTEGRATION]: {
    id: 'EventActions.updateIntegration',
    defaultMessage: 'Update integration',
  },
  [DELETE_INTEGRATION]: {
    id: 'EventActions.deleteIntegration',
    defaultMessage: 'Delete integration',
  },
  [UPDATE_ANALYZER]: {
    id: 'EventActions.updateAnalyzer',
    defaultMessage: 'Update analyzer',
  },
  [GENERATE_INDEX]: {
    id: 'EventActions.generateIndex',
    defaultMessage: 'Generate index',
  },
  [DELETE_INDEX]: {
    id: 'EventActions.deleteIndex',
    defaultMessage: 'Delete index',
  },
  [CREATE_DEFECT]: {
    id: 'EventActions.createDefect',
    defaultMessage: 'Create custom defect type',
  },
  [UPDATE_ITEM]: {
    id: 'EventActions.updateItem',
    defaultMessage: 'Update item',
  },
  [ANALYZE_ITEM]: {
    id: 'EventActions.analyzeItem',
    defaultMessage: 'AA changed defect type',
  },
  [LINK_ISSUE_AA]: {
    id: 'EventActions.linkIssueAA',
    defaultMessage: 'AA linked issue',
  },
  [CREATE_PATTERN]: {
    id: 'EventActions.createPattern',
    defaultMessage: 'Create pattern rule',
  },
  [UPDATE_PATTERN]: {
    id: 'EventActions.updatePattern',
    defaultMessage: 'Update pattern rule',
  },
  [DELETE_PATTERN]: {
    id: 'EventActions.deletePattern',
    defaultMessage: 'Delete pattern rule',
  },
  [MATCHED_PATTERN]: {
    id: 'EventActions.matchedPattern',
    defaultMessage: 'PA find pattern',
  },
  [CREATE_PROJECT]: {
    id: 'EventActions.createProject',
    defaultMessage: 'Create Project',
  },
});

export const objectTypesMessages = defineMessages({
  [DASHBOARD]: {
    id: 'EventObjectTypes.dashboard',
    defaultMessage: 'Dashboard',
  },
  [LAUNCH]: {
    id: 'EventObjectTypes.launch',
    defaultMessage: 'Launch',
  },
  [WIDGET]: {
    id: 'EventObjectTypes.widget',
    defaultMessage: 'Widget',
  },
  [FILTER]: {
    id: 'EventObjectTypes.filter',
    defaultMessage: 'Filter',
  },
  [IMPORT]: {
    id: 'EventObjectTypes.import',
    defaultMessage: 'Import',
  },
  [INDEX]: {
    id: 'EventObjectTypes.index',
    defaultMessage: 'Index',
  },
  [PROJECT]: {
    id: 'EventObjectTypes.project',
    defaultMessage: 'Project',
  },
  [DEFECT_TYPE]: {
    id: 'EventObjectTypes.defectType',
    defaultMessage: 'Custom defect type',
  },
  [USER]: {
    id: 'EventObjectTypes.user',
    defaultMessage: 'User',
  },
  [EMAIL_CONFIG]: {
    id: 'EventObjectTypes.emailConfig',
    defaultMessage: 'Notification rule',
  },
  [ITEM_ISSUE]: {
    id: 'EventObjectTypes.itemIssue',
    defaultMessage: 'Test item',
  },
  [INTEGRATION]: {
    id: 'EventObjectTypes.integration',
    defaultMessage: 'Integration',
  },
  [PATTERN_RULE]: {
    id: 'EventObjectTypes.patternRule',
    defaultMessage: 'Pattern rule',
  },
});
