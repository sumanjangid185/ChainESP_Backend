// Very small parser to extract "Received" chain and guess sender ESP from headers

function normalizeHeaders(headers) {
  const result = {};

  if (!headers) return result;

  if (Array.isArray(headers)) {
    // nodemailer style: [ 'Received', '...', 'From', '...' ]
    for (let i = 0; i < headers.length - 1; i += 2) {
      const name = headers[i].toLowerCase();
      const value = headers[i + 1];
      if (!result[name]) result[name] = [];
      result[name].push(value);
    }
    return result;
  }

  if (typeof headers === "string") {
    // split into lines and capture Received lines
    const lines = headers.split(/\r?\n/);
    for (const l of lines) {
      const idx = l.indexOf(":");
      if (idx === -1) continue;
      const name = l.slice(0, idx).trim().toLowerCase();
      const value = l.slice(idx + 1).trim();
      if (!result[name]) result[name] = [];
      result[name].push(value);
    }
    return result;
  }

  // assume object/map
  for (const [k, v] of Object.entries(headers)) {
    const key = k.toLowerCase();
    if (Array.isArray(v)) result[key] = v;
    else result[key] = [v];
  }

  return result;
}

// Extract Received chain and guess ESP
function parseEmailHeaders(headers) {
  const norm = normalizeHeaders(headers);

  // Extract Received chain
  const receivedChain = norm["received"] || [];

  // Guess ESP
  let esp = "Unknown";
  const headerText =
    JSON.stringify(norm).toLowerCase() + receivedChain.join(" ").toLowerCase();

  if (headerText.includes("google.com") || headerText.includes("gmail")) {
    esp = "Gmail / Google Workspace";
  } else if (
    headerText.includes("outlook.com") ||
    headerText.includes("hotmail") ||
    headerText.includes("office365")
  ) {
    esp = "Outlook / Microsoft 365";
  } else if (headerText.includes("yahoo.com") || headerText.includes("ymail")) {
    esp = "Yahoo Mail";
  } else if (headerText.includes("zoho")) {
    esp = "Zoho Mail";
  } else if (headerText.includes("protection.outlook.com")) {
    esp = "Microsoft Exchange Online Protection";
  } else if (headerText.includes("icloud.com") || headerText.includes("me.com")) {
    esp = "Apple iCloud Mail";
  } else if (headerText.includes("amazonaws.com") || headerText.includes("ses")) {
    esp = "Amazon SES";
  }

  return {
    receivedChain,
    esp,
  };
}

module.exports = { normalizeHeaders, parseEmailHeaders };
