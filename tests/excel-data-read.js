const { chromium } = require('playwright');
const xlsx = require('xlsx');
const path = require('path');

async function runAutomation() {
  // Launch a browser instance
  const browser = await chromium.launch({ headless: false });

  // Create a new page
  const page = await browser.newPage();

  const excelFilePath = path.join('..', 'utils', 'info.xlsx');
  console.log(excelFilePath);

  // Load Excel file
  const workbook = xlsx.readFile(excelFilePath);

  // Navigate to the website
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Iterate over each sheet
  for (const sheetName of workbook.SheetNames) {
    // Convert sheet to JSON
    const sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Use JSON data for automation
    await processSheetData(page, sheetJson);

    // Add delay or additional logic if needed
    await page.waitForTimeout(1000);
  }

  // Close the browser
  await browser.close();
}

async function processSheetData(page, jsonData) {
  // Process JSON data
  for (const rowData of jsonData) {
    // Extract key-value pairs from rowData
    const { key, value } = rowData;

    // Define a mapping between keys and input selectors
    const selectorMap = {
      'name': 'input[id="name"]',
      'email': 'input[id="email"]',
      'wiki': 'input[id="Wikipedia1_wikipedia-search-input"]',
      'phone': 'input[id="phone"]'
    };

    // Fill form field using selector map
    const selector = selectorMap[key];
    if (selector) {
      console.log(`Filling ${key}:`, value);
      await page.fill(selector, value.toString()); // Convert phone to string if needed
    }

    // Wait for navigation or other actions to complete
    await page.waitForLoadState('networkidle');
  }
}

// Run the automation function
runAutomation().catch(console.error);
