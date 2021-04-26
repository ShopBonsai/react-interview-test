"use strict";
exports.__esModule = true;
exports.getAnalyticsData = exports.addDatabaseAccess = exports.addPageVisit = void 0;
var pageAnalytics = [];
var databaseAnalytics = [];
/***************************************************************
 * Logs a new page visit with loading time information
 * @param _root  - Root value. Undefined by default
 * @param data   - Mutation data containing access information
 * @returns      - The pageVisit object
 ***************************************************************/
var addPageVisit = function (_root, data) {
    var loadTime = data.loadTime;
    var viewCount = pageAnalytics.length;
    pageAnalytics.push({ viewCount: viewCount + 1, loadTime: loadTime });
    return pageAnalytics[viewCount];
};
exports.addPageVisit = addPageVisit;
/**********************************************************************
 * Logs a new database access with loading time information
 * @param _root - Root value. Undefined by default
 * @param data  - Mutation data containing database access information
 * @returns     - the databaseAccess object
 **********************************************************************/
var addDatabaseAccess = function (_root, data) {
    var loadTime = data.loadTime;
    var accessCount = databaseAnalytics.length;
    databaseAnalytics.push({ accessCount: accessCount + 1, loadTime: loadTime });
    return databaseAnalytics[accessCount];
};
exports.addDatabaseAccess = addDatabaseAccess;
/*****************************************************************************
 * Returns analytics information containing page visits, database accesses &
 * loading times
 * @param _root - Root value. Undefined by default
 * @param data  - Mutation data containing whether it is a full read or not
 * @returns     - A string containing the analytics information
 ****************************************************************************/
var getAnalyticsData = function (_root, data) {
    var full = data.full;
    var output = "No results to display";
    var totalTime = 0;
    output = "Page Access Results: ";
    pageAnalytics.forEach(function (analytic) {
        if (full) {
            output += "\n        Access " + analytic.viewCount + ": Load time: " + analytic.loadTime + " ms";
        }
        if (!full) {
            totalTime += analytic.loadTime;
        }
    });
    if (!full) {
        output += "\n      The page was accessed " + pageAnalytics.length + " times with an average load time of " + totalTime / pageAnalytics.length + " ms";
        totalTime = 0;
    }
    output += "\n    Database Access Results: ";
    databaseAnalytics.forEach(function (analytic) {
        if (full) {
            output += "\n        Access " + analytic.accessCount + ": Load time: " + analytic.loadTime + " ms";
        }
        if (!full) {
            totalTime += analytic.loadTime;
        }
    });
    if (!full) {
        output += "\n      The database was accessed " + pageAnalytics.length + " times with an average load time of " + totalTime / pageAnalytics.length + " ms";
        totalTime = 0;
    }
    return output;
};
exports.getAnalyticsData = getAnalyticsData;
