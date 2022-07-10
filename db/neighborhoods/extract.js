const fs = require("fs/promises");
const xlsx = require("node-xlsx").default;

const extract = async () => {
  // Read the file
  const sheets = xlsx.parse("./db/neighborhoods/Sinaloa.xls");
  const rows = sheets[1].data;

  const results = {};
  // Data starts
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    // Skip first row (headers) and empty arrays
    if (i !== 0 && row.length > 0) {
      const zip_code = row[0];
      const neighborhood = row[1];

      // If key doesnt exists, we initialize it
      if (!(zip_code in results)) {
        results[zip_code] = {
          neighborhoods: [],
        };
      }

      // We push that neighborhood to each zip code's array
      results[zip_code].neighborhoods.push(neighborhood);
    }
  }

  // Override specific cases
  results["80000"] = { neighborhoods: ["Centro Culiacán"] };

  // Write results to a file
  await fs.writeFile(
    "./db/neighborhoods/neighborhoods.json",
    JSON.stringify(results)
  );
};

extract();
