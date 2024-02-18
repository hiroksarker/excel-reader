var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chromium = require('playwright').chromium;
var xlsx = require('xlsx');
var path = require('path');
function runAutomation() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, excelFilePath, workbook, _i, _a, sheetName, sheetJson;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, chromium.launch({ headless: false, channel: "chrome" })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _b.sent();
                    excelFilePath = path.join('..', 'utils', 'info.xlsx');
                    console.log(excelFilePath);
                    workbook = xlsx.readFile(excelFilePath);
                    // Navigate to the website
                    return [4 /*yield*/, page.goto('https://testautomationpractice.blogspot.com/')];
                case 3:
                    // Navigate to the website
                    _b.sent();
                    _i = 0, _a = workbook.SheetNames;
                    _b.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    sheetName = _a[_i];
                    sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    // Use JSON data for automation
                    return [4 /*yield*/, processSheetData(page, sheetJson)];
                case 5:
                    // Use JSON data for automation
                    _b.sent();
                    // Add delay or additional logic if needed
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 6:
                    // Add delay or additional logic if needed
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 4];
                case 8: 
                // Close the browser
                return [4 /*yield*/, browser.close()];
                case 9:
                    // Close the browser
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function processSheetData(page, jsonData) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, jsonData_1, rowData, key, value, selectorMap, selector;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, jsonData_1 = jsonData;
                    _a.label = 1;
                case 1:
                    if (!(_i < jsonData_1.length)) return [3 /*break*/, 6];
                    rowData = jsonData_1[_i];
                    key = rowData.key, value = rowData.value;
                    selectorMap = {
                        'name': 'input[id="name"]',
                        'email': 'input[id="email"]',
                        'wiki': 'input[id="Wikipedia1_wikipedia-search-input"]',
                        'phone': 'input[id="phone"]'
                    };
                    selector = selectorMap[key];
                    if (!selector) return [3 /*break*/, 3];
                    console.log("Filling ".concat(key, ":"), value);
                    return [4 /*yield*/, page.fill(selector, value.toString())];
                case 2:
                    _a.sent(); // Convert phone to string if needed
                    _a.label = 3;
                case 3: 
                // Wait for navigation or other actions to complete
                return [4 /*yield*/, page.waitForLoadState('networkidle')];
                case 4:
                    // Wait for navigation or other actions to complete
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Run the automation function
runAutomation().catch(console.error);
