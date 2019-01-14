import fs from 'fs';

const TEST_PATH = 'data/com.xyz.app.json';
const SPEC_PATH = 'data/specs.json';
const REPORT_PATH = 'data/report.json';

function getFileData(file: string): Promise<any> {
  return new Promise((resolve: Function, reject: Function) => {
    fs.readFile(file, 'utf8', (error: any, fileData: string) => {
      if (error) reject(error);
      resolve(JSON.parse(fileData));
    });
  });
}

function writeReportFile(report: string): Promise<any> {
  return new Promise((resolve: Function, reject: Function) => {
    fs.writeFile(REPORT_PATH, report, 'utf8', (error: any) => {
      if (error) reject(error);
      resolve(true);
    });
  });
}

export function getReport(): Promise<any> {
  return Promise.all([getFileData(TEST_PATH), getFileData(SPEC_PATH)])
    .then(files => {
      let [testData, specData] = files;
      let tests = [];

      for (const key in testData.tests) {
        tests.push(Object.assign(testData.tests[key], specData[key], {key: key}));
      }

      tests.sort((a, b): number => {
        return (a.vulnerable === b.vulnerable ? 0 : a.vulnerable ? -1 : 1) || b.score - a.score;
      });

      testData.tests = tests;

      //console.log(JSON.stringify(testData, null, 2));
      return writeReportFile(JSON.stringify(testData, null, 2))
        .then(success => {
          return testData;
        })
        .catch(error => {
          console.error('Error writing report file');
        })
      
    })
    .catch(error => {
      console.error('Error loading json file', error);
    });
}
