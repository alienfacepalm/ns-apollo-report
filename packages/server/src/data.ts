import fs from 'fs';

const TEST_PATH = 'data/com.xyz.app.json';
const SPEC_PATH = 'data/specs.json';

function getFileData(file: string): Promise<any> {
  return new Promise((resolve: Function, reject: Function) => {
    fs.readFile(file, 'utf8', (error: any, fileData: string) => {
      if (error) reject(error);
      resolve(JSON.parse(fileData));
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

      // TODO: write testData to disk
      console.log(JSON.stringify(testData, null, 2));
      return testData;
    });
}
