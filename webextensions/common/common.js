/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
'use strict';

import Configs from '/extlib/Configs.js';
import * as Constants from './constants.js';

const OVERRIDE_DEFAULT_CONFIGS = {}; /* Replace this for more customization on an enterprise use. */

export const configs = new Configs({
  redmineURL: '',
  redmineAPIKey: '',
  account: '',

  projectsVisibilityMode: Constants.PROJECTS_VISIBILITY_SHOW_BY_DEFAULT,
  visibleProjects: [],
  hiddenProjects: [],
  statusesVisibilityMode: Constants.STATUSES_VISIBILITY_SHOW_BY_DEFAULT,
  visibleStatuses: [],
  visibleFolderPattern: '',
  showFieldRow_project: true,
  showFieldRow_tracker: true,
  showFieldRow_subject: true,
  showFieldRow_description: true,
  showFieldRow_parentIssue: true,
  showFieldRow_status: true,
  showFieldRow_assigned: true,
  showFieldRow_watcher: true,
  showFieldRow_version: true,
  showFieldRow_period: true,
  showFieldRow_file: true,
  showFieldRow_relations: true,
  showFieldRow_other: true,
  showFieldRow_issue: true,
  showFieldRow_notes: true,
  customFields: '',

  defaultTracker: null,
  defaultDueDate: 7,
  defaultTitleCleanupPattern: '((fwd:)|(re:))\s?',
  //defaultUploadAttachments: true,
  defaultDescriptionHeaders: ['Subject', 'From', 'Resent-From', 'Date', 'To', 'Cc', 'Newsgroups'],
  defaultNotesHeaders: ['Subject', 'From', 'Resent-From', 'Date', 'To', 'Cc', 'Newsgroups'],

  defaultProject: '',
  mappedFolders: null,

  descriptionTemplate: '<pre>\n%headers%\n\n%body%\n</pre>',
  notesTemplate: '<pre>\n%headers%\n\n%body%\n</pre>',


  linkToIssueDialogWidth: 500,
  linkToIssueDialogHeight: 440,
  linkToIssueDialogLeft: null,
  linkToIssueDialogTop: null,

  createIssueDialogWidth: 640,
  createIssueDialogHeight: 440,
  createIssueDialogLeft: null,
  createIssueDialogTop: null,

  updateIssueDialogWidth: 640,
  updateIssueDialogHeight: 440,
  updateIssueDialogLeft: null,
  updateIssueDialogTop: null,


  configsVersion: 0,
  debug: false,
  dryRun: false,

  ...OVERRIDE_DEFAULT_CONFIGS
}, {
  localKeys: [
    'configsVersion',
    'debug',
    'dryRun'
  ]
});

export function log(message, ...args) {
  if (!configs || !configs.debug)
    return;

  const nest   = (new Error()).stack.split('\n').length;
  let indent = '';
  for (let i = 0; i < nest; i++) {
    indent += ' ';
  }
  console.log(`redthunderminebird: ${indent}${message}`, ...args);
}

export function appendContents(parent, source) {
  const range = document.createRange();
  range.selectNodeContents(parent);
  range.collapse(false);
  const fragment = range.createContextualFragment(source.trim());
  range.insertNode(fragment);
  range.detach();
}

export function sanitizeForHTMLText(text) {
  return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
