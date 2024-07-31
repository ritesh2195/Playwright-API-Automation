import * as XLSX from 'xlsx';
import * as fs from 'fs';

export class ExcelReader {
  private filepath: string;
  private fileExtension: string;
  private workbook: XLSX.WorkBook | null = null;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.fileExtension = filepath.substring(filepath.lastIndexOf('.'));
    
    try {
      const dataBuffer = fs.readFileSync(this.filepath);
      const data = new Uint8Array(dataBuffer);
      this.workbook = XLSX.read(data, { type: 'array' });
    } catch (error) {
      console.error('Error loading workbook:', error);
      this.workbook = null;
    }
  }

  getRowCount(sheetName: string): number {
    if (!this.workbook) {
      console.error('Workbook not initialized.');
      return 0;
    }

    const sheet = this.workbook.Sheets[sheetName];
    if (!sheet) {
      console.error(`Sheet not found: ${sheetName}`);
      return 0;
    }

    const range = sheet['!ref'];
    if (!range) {
      console.error(`Range not found in sheet: ${sheetName}`);
      return 0;
    }

    const decodedRange = XLSX.utils.decode_range(range);
    return decodedRange.e.r + 1;
  }

  getCellData(sheetName: string, colName: string, rowNum: number): string {
    if (!this.workbook) {
      console.error('Workbook not initialized.');
      return '';
    }

    const sheet = this.workbook.Sheets[sheetName];
    if (!sheet) {
      console.error(`Sheet not found: ${sheetName}`);
      return '';
    }

    const jsonData: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Find the column index by name
    const columnIndex = jsonData[0].indexOf(colName);
    if (columnIndex === -1) {
      console.error(`Column not found: ${colName}`);
      return '';
    }

    const rowData = jsonData[rowNum - 1];
    if (rowData === undefined) {
      console.error(`Row not found: ${rowNum}`);
      return '';
    }

    return rowData[columnIndex] || '';
  }
}
