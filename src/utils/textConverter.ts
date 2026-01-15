export type TextFormat = 'txt' | 'csv' | 'json' | 'xml' | 'html';

export async function convertText(
  file: File,
  targetFormat: TextFormat
): Promise<Blob> {
  const text = await file.text();
  let convertedContent: string;

  const sourceFormat = file.name.split('.').pop()?.toLowerCase() || 'txt';

  switch (targetFormat) {
    case 'txt':
      convertedContent = await convertToText(text, sourceFormat);
      break;
    case 'json':
      convertedContent = await convertToJson(text, sourceFormat);
      break;
    case 'csv':
      convertedContent = await convertToCsv(text, sourceFormat);
      break;
    case 'html':
      convertedContent = await convertToHtml(text, sourceFormat);
      break;
    case 'xml':
      convertedContent = await convertToXml(text, sourceFormat);
      break;
    default:
      convertedContent = text;
  }

  return new Blob([convertedContent], {
    type: getMimeType(targetFormat)
  });
}

function getMimeType(format: TextFormat): string {
  const mimeTypes: Record<TextFormat, string> = {
    txt: 'text/plain',
    csv: 'text/csv',
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html'
  };
  return mimeTypes[format];
}

async function convertToText(content: string, sourceFormat: string): Promise<string> {
  switch (sourceFormat) {
    case 'json':
      try {
        const json = JSON.parse(content);
        return JSON.stringify(json, null, 2);
      } catch {
        return content;
      }
    case 'html':
      const div = document.createElement('div');
      div.innerHTML = content;
      return div.textContent || div.innerText || '';
    case 'xml':
      return content;
    case 'csv':
      return content;
    default:
      return content;
  }
}

async function convertToJson(content: string, sourceFormat: string): Promise<string> {
  switch (sourceFormat) {
    case 'csv':
      const lines = content.trim().split('\n');
      if (lines.length === 0) return '[]';

      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || '';
        });
        return obj;
      });
      return JSON.stringify(data, null, 2);

    case 'txt':
      const lines2 = content.trim().split('\n');
      return JSON.stringify({ lines: lines2 }, null, 2);

    default:
      try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return JSON.stringify({ content }, null, 2);
      }
  }
}

async function convertToCsv(content: string, sourceFormat: string): Promise<string> {
  switch (sourceFormat) {
    case 'json':
      try {
        const json = JSON.parse(content);
        if (Array.isArray(json) && json.length > 0) {
          const headers = Object.keys(json[0]);
          const csvLines = [
            headers.join(','),
            ...json.map(row =>
              headers.map(header =>
                JSON.stringify(row[header] || '')
              ).join(',')
            )
          ];
          return csvLines.join('\n');
        }
        return content;
      } catch {
        return content;
      }

    case 'txt':
      const lines = content.trim().split('\n');
      return lines.map(line => `"${line}"`).join('\n');

    default:
      return content;
  }
}

async function convertToHtml(content: string, sourceFormat: string): Promise<string> {
  switch (sourceFormat) {
    case 'txt':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Converted Document</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
    pre { white-space: pre-wrap; word-wrap: break-word; }
  </style>
</head>
<body>
  <pre>${escapeHtml(content)}</pre>
</body>
</html>`;

    case 'json':
      try {
        const json = JSON.parse(content);
        return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>JSON Data</title>
  <style>
    body { font-family: monospace; padding: 20px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 5px; }
  </style>
</head>
<body>
  <pre>${escapeHtml(JSON.stringify(json, null, 2))}</pre>
</body>
</html>`;
      } catch {
        return content;
      }

    case 'csv':
      const lines = content.trim().split('\n');
      const rows = lines.map(line =>
        line.split(',').map(cell => `<td>${escapeHtml(cell.trim())}</td>`).join('')
      );
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSV Table</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
    tr:nth-child(even) { background-color: #f2f2f2; }
    tr:first-child { background-color: #4CAF50; color: white; font-weight: bold; }
  </style>
</head>
<body>
  <table>
    ${rows.map(row => `<tr>${row}</tr>`).join('\n    ')}
  </table>
</body>
</html>`;

    default:
      return content;
  }
}

async function convertToXml(content: string, sourceFormat: string): Promise<string> {
  switch (sourceFormat) {
    case 'json':
      try {
        const json = JSON.parse(content);
        return jsonToXml(json, 'root');
      } catch {
        return `<?xml version="1.0" encoding="UTF-8"?>\n<document>${escapeHtml(content)}</document>`;
      }

    case 'txt':
      const lines = content.trim().split('\n');
      return `<?xml version="1.0" encoding="UTF-8"?>\n<document>\n${lines.map(line => `  <line>${escapeHtml(line)}</line>`).join('\n')}\n</document>`;

    default:
      return content;
  }
}

function jsonToXml(obj: any, rootName: string): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`;

  function buildXml(data: any, indent: string = ''): string {
    let result = '';

    if (Array.isArray(data)) {
      data.forEach(item => {
        result += `\n${indent}<item>${buildXml(item, indent + '  ')}\n${indent}</item>`;
      });
    } else if (typeof data === 'object' && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
        result += `\n${indent}<${safeKey}>${buildXml(value, indent + '  ')}</${safeKey}>`;
      });
    } else {
      result += escapeHtml(String(data));
    }

    return result;
  }

  xml += buildXml(obj, '  ');
  xml += `\n</${rootName}>`;
  return xml;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function isTextConversionSupported(fromFormat: string, toFormat: string): boolean {
  const supportedFormats = ['txt', 'csv', 'json', 'xml', 'html'];
  return (
    supportedFormats.includes(fromFormat.toLowerCase()) &&
    supportedFormats.includes(toFormat.toLowerCase())
  );
}
