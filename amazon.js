// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const converter = require('json-2-csv');

// URL of the page we want to scrape
const url = "https://www.sellerratings.com/amazon/india";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".plainlist ul li");
    // Stores data for all countries
    const countries = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const country = { name: "", iso3: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      country.name = $(el).children("a").text();
      country.iso3 = $(el).children("span").text();
      // Populate countries array with country data
      countries.push(country);
    });
    // Logs countries array to the console
    console.dir(countries);
    // Write countries array in countries.json file
    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });


  /*  const dataToWrite = "...";

    fs.writeFile("formList.csv", dataToWrite, "utf8", (err) => {
      if (err) {
        console.log("error");
      } else {
        console.log("saved!");
      }
    });

    */
    converter.json2csv(countries, (err, csv) => {
        if (err) {
            throw err;
        }

        // print CSV string
        console.log(csv);
        fs.writeFileSync("countries.csv",csv);
    });



  } catch (err) {
    console.error(err);
  }
}

async function scrapamazon(){
  try{
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
  //  console.log($.html());
    const report = $("body table tbody tr td a");
   console.log(report.html());

    const vendors = [];




  report.each(
    (index,a) => {
const vendor = { name: "" };
vendor.name =$(a).text();

console.log(vendor.name);
vendors.push(vendor);
    }


  );



  console.dir(vendors);

  converter.json2csv(vendors, (err, csv) => {
      if (err) {
          throw err;
      }

      // print CSV string
      console.log(csv);
      fs.writeFileSync("vendors.csv",csv);
  });


  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
//scrapeData();

scrapamazon();
