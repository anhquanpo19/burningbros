import * as path from "path";
import * as fs from "fs";
// import util from "../../../core/util";

const testImport = () => {
  const modules: any = [];
  //eslint-disable-next-line
  debugger;
  const normalizedPath = path.join(
    path.resolve(),
    "/src/repositories/services"
  );
  fs.readdirSync(normalizedPath).forEach(function (filename) {
    if (path.extname(filename) === ".ts") {
      //eslint-disable-next-line
      debugger;
      const myModule = require(`../../interfaces/routes/${filename}`);
      modules.push(myModule.default);
    }
  });
  return modules;
};

export default testImport;
