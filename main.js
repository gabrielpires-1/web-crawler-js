import { argv } from 'process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

console.log(argv.length)

async function main() {
  if (argv.length < 3) {
    console.error('Error: missing arguments. Correct example: npm run start BASE_URL');
    return;
  } else if (argv.length > 3) {
    console.error('Error: too many arguments. Correct example: npm run start BASE_URL');
    return;
  } else {
    const baseURL = argv[2]
    try {
      const pages = await crawlPage(baseURL, baseURL, {});
      
      printReport(pages);
    } catch (e) {
      console.error(`Error in crawling page: ${e.message}`);
    }
  }
}

main()
