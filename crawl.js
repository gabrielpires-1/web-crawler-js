import jsdom from 'jsdom';
const { JSDOM } = jsdom;

function normalizeURL(baseURL) {
  // Remove protocol (http:// or https://), trailing slashes and convert to lowercase
  const url = new URL(baseURL.replace(/\/+$/, '').toLowerCase());

  // Construct the normalized URL without trailing slashes
  const normalizedPathname = url.pathname.replace(/\/+$/, '');

  return `${url.hostname}${normalizedPathname}`
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const linkElement of linkElements) {
    if (linkElement.hasAttribute('href')) {
      let href = linkElement.getAttribute('href')
      // relative

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch (e) {
        console.error(`${err.message}: ${href}`);
      }
    }
  }
  return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  console.log(`Crawling ${currentURL}`);
  const baseUrlObj = new URL(baseURL);
  const currentUrlObj = new URL(currentURL);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL)


  // if the url was already crawled or not
  if (pages[normalizedCurrentURL]) {
    pages[normalizedCurrentURL]++;
    return pages;
  } else {
    pages[normalizedCurrentURL] = 1;
  }

  // crawling the new url
  try {
    const response = await fetch(currentURL);
    const status = response.status;
    if (status !== 200) {
      console.error(`Error: ${status}`);
      return pages;
    } else if (!response.headers.get('content-type').includes('text/html')) {
      console.error('Error: not an HTML page');
      return pages;
    }
    const htmlBody = await response.text();

    const nextUrls = getURLsFromHTML(htmlBody, baseURL);

    for (const url of nextUrls) {
      if (!pages[url]) {
        pages = await crawlPage(baseURL, url, pages);
      }
    }
  } catch (e) {
    console.error(`Error in fetch: ${e.message}, on page: ${currentURL}`);
  }
  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
