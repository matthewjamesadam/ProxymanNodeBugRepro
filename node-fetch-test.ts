// import fetch from "node-fetch";
import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

// @ts-ignore
const proxyAgent = new HttpsProxyAgent("http://localhost:9090");

const numToFetch = 100;
let leftToFetch = numToFetch;

async function doFetch(index: number): Promise<void> {
  console.log(`Fetching ${index}`);
  const value = await fetch("https://google.com", { agent: proxyAgent });

  leftToFetch = leftToFetch - 1;
  console.log(`Done fetching index ${index} -- ${leftToFetch} left`);
}

async function doFetchN(num: number) {
  const promises = Array.from(Array(num).keys()).map((index) => doFetch(index));
  await Promise.all(promises);
  console.log("*** All requests completed");
}

doFetchN(numToFetch);
