# ns-apollo-report

TASK
----

MobPen is a security company that analyzes mobile apps such as android and ios
for security vulnerabilities. The security analysis generates a JSON file that
defines list of tests that were ran. The meta-data about these tests such as
test description, severity, vulnerable flag, score, regulatory links, etc. are
defined in a specification JSON file. Both of these JSON files are merged together
to generate a unified JSON file that has all the test data from analysis
and metadata from specification file. This generated JSON file is then
used to create an HTML or PDF report, which displays vulnerable tests first
ordered by the score (from highest to lowest) and then non-vulnerable
tests (also ordered from highest to lowest score).

Your assignment consists of two parts: In first part, you are expected to create
a method or API that takes analysis result (com.xyz.app.json) and specification
JSON file (specs.json) and generates a merged JSON file that has combines meta
information from specs.json with test results from com.xyz.app.json. For example,
here is a snippet of com.xyz.app.json:
```javascript
{
  "id": "com.xyz.app",
  "name": "XYZ App",
  "platform": "android",
  "createdDate": "2017-12-01T12:00:00.0-07:00",
  "tests": {
    "world_readable": {
      "vulnerable": true,
      "data": [
        {
          "path": "/data/data/file1"
        },
        {
          "path": "/data/data/file2"
        },
        {
          "path": "/data/data/file3"
        },
        {
          "path": "/data/data/file4"
        }
      ]
    },
...
```
and here is a snippet of specs.json
```javascript 
{
  "world_readable": {
    "title": "World Readable Files Check",
    "description": "Checks if file is world readable",
    "category": "permissions",
    "severity": "medium",
    "score": 4.1,
    "regulatory": ["http://cwe.com/file_permission", "https://www.owasp.org/file_permission"],
    "fields": [
      {
        "name": "path",
        "title": "File Path"
      }
    ]
  },
...
``` 
The generated JSON file will merge these two files, e.g.
```javascript 
{
  "id": "com.xyz.app",
  "name": "XYZ App",
  "platform": "android",
  "createdDate": "2017-12-01T12:00:00.0-07:00",
  "tests": [
    {
      "title": "World Readable Files Check",
      "description": "Checks if file is world readable",
      "category": "permissions",
      "severity": "medium",
      "score": 4.1,
      "regulatory": [
        "http://cwe.com/file_permission",
        "https://www.owasp.org/file_permission"
      ],
      "fields": [
        {
          "name": "path",
          "title": "File Path"
        }
      ],
      "data": [
        {
          "path": "/data/data/file1"
        },
        {
          "path": "/data/data/file2"
        },
        {
          "path": "/data/data/file3"
        },
        {
          "path": "/data/data/file4"
        }
      ],
      "vulnerable": true,
      "key": "world_readable"
    },
...
``` 
This JSON file should sorted such that vulnerable tests (tests that have vulnerable
flag as true) and within vulnerable tests, they should be sorted by score in descedning order.
Similarly, non-vulnerable tests should be sorted by score in descending order.

In the second part, you are expected to create an HTML report using React components. Finally,
you are expected to provide a short summary of your design and instructions to test your application.

Bonus: Create unit tests for your code.

Info
----

This project was built using [create-apollo-app](https://github.com/sysgears/create-apollo-app). It uses express, graphQL, and apollo-server on the server. The fornt end is built with react, apollo-client, and material-ui. Built with node `v10.15.0`.

Intsall & run
-------------

Clone the project:
```bash
$ git clone git@github.com:joshuabaran/ns-apollo-report.git
```

Intall dependencies using `yarn`:
```bash
$ cd ns-apollo-report
```
```bash
$ yarn
```

Start the project:
```bash
$ yarn start
```
