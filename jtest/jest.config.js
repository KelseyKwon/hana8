module.exports = {
  preset: "ts-jest",
  // ts로 끝나는 파일들은 모두 여기서 테스트 해주겠다.
  testMatch: ["**/*.test.ts"],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Jest Test Report",
        includeFailureMsg: true,
        includeConsoleLog: true,
        sort: "titleAsc",
      },
    ],
  ],
};
