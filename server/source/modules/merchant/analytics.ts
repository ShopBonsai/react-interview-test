interface IAddPageVisitData {
  loadTime: number;
}

interface IPageAnalytics {
  viewCount: number;
  loadTime: number;
}

interface IDatabaseAnalytics {
  accessCount: number;
  loadTime: number;
}

interface IAnalytics {
  full: boolean;
}

const pageAnalytics: IPageAnalytics[] = [];
const databaseAnalytics: IDatabaseAnalytics[] = [];

/***************************************************************
 * Logs a new page visit with loading time information
 * @param _root  - Root value. Undefined by default
 * @param data   - Mutation data containing access information 
 * @returns      - The pageVisit object
 ***************************************************************/
export const addPageVisit = (_root: undefined, data: IAddPageVisitData) => {
  const { loadTime } = data;
  const viewCount = pageAnalytics.length;
  pageAnalytics.push({ viewCount: viewCount + 1, loadTime });
  return pageAnalytics[viewCount];
};

/**********************************************************************
 * Logs a new database access with loading time information
 * @param _root - Root value. Undefined by default 
 * @param data  - Mutation data containing database access information
 * @returns     - the databaseAccess object
 **********************************************************************/
export const addDatabaseAccess = (_root: undefined, data: IDatabaseAnalytics) => {
  const { loadTime } = data;
  const accessCount = databaseAnalytics.length;
  databaseAnalytics.push({ accessCount: accessCount + 1, loadTime });
  return databaseAnalytics[accessCount];
};

/*****************************************************************************
 * Returns analytics information containing page visits, database accesses &
 * loading times
 * @param _root - Root value. Undefined by default 
 * @param data  - Mutation data containing whether it is a full read or not
 * @returns     - A string containing the analytics information
 ****************************************************************************/
export const getAnalyticsData = (_root: undefined, data: IAnalytics) => {
  const { full } = data;
  let output = "No results to display";
  let totalTime: number = 0;
  output = `Page Access Results: `;

  pageAnalytics.forEach((analytic) => {
    if (full) {
      output += `
        Access ${analytic.viewCount}: Load time: ${analytic.loadTime} ms`;
    }

    if (!full) {
      totalTime += analytic.loadTime;
    }
  });

  if (!full) {
    output += `
      The page was accessed ${
        pageAnalytics.length
      } times with an average load time of ${
      totalTime / pageAnalytics.length
    } ms`;
    totalTime = 0;
  }

  output += `
    Database Access Results: `;

  databaseAnalytics.forEach((analytic) => {
    if (full) {
      output += `
        Access ${analytic.accessCount}: Load time: ${analytic.loadTime} ms`;
    }

    if (!full) {
      totalTime += analytic.loadTime;
    }
  });

  if (!full) {
    output += `
      The database was accessed ${
        pageAnalytics.length
      } times with an average load time of ${
      totalTime / pageAnalytics.length
    } ms`;
    totalTime = 0;
  }
  return output;
};
