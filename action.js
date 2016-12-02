// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
    var d=moment().format("YYYY-MM-DD");var p=moment().subtract(3,"months").format("YYYY-MM-DD");
    var url="https://www.myfitnesspal.com/reports/printable_diary?from="+p+"&to="+d;
  chrome.tabs.update(tab.id, { url: url })
  });
//     code: 'var d=moment().format("YYYY-MM-DD");var p=moment().subtract(3,"months").format("YYYY-MM-DD")' +
//           'var url="https://www.myfitnesspal.com/reports/printable_diary?from="+p+"&to="+d;' +
//           'window.location.href=url;'
//   });