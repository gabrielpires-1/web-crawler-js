function sortPages(urlObj) {
  const entries = Object.entries(urlObj);
  const sortedEntries = entries.sort((a, b) => {
      if (a[1] === b[1]) {
          return a[0].localeCompare(b[0]);
      }
      return b[1] - a[1];
  });
  const sortedObj = Object.fromEntries(sortedEntries);

  return sortedObj;
}

function printReport(pages) {
  const sortedPages = sortPages(pages);

  console.log('==========')
  console.log('REPORT')
  console.log('==========')

  for (const page of Object.entries(sortedPages)) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
}

export { sortPages, printReport }
