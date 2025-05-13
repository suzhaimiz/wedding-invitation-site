package com.weddinginvitation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse; // For setting response headers
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(origins = "http://localhost:5173")
public class RsvpController {

 @Autowired
 private RsvpRepository repo;

 @PostMapping
 public Rsvp saveRsvp(@RequestBody Rsvp rsvp) {
  return repo.save(rsvp);
 }

 @GetMapping("/all")
 public List<Rsvp> getAllRsvps() {
  return repo.findAll();
 }

@GetMapping("/exists")
public boolean rsvpExists(@RequestParam String name) {
    return repo.findByName(name).isPresent();
}

 // New endpoint for Excel export
 @GetMapping("/export/excel")
 public void exportRsvpsToExcel(HttpServletResponse response) throws IOException {
  List<Rsvp> rsvps = repo.findAll();

  Workbook workbook = new XSSFWorkbook();
  Sheet sheet = workbook.createSheet("GuestList");

  // Create header font style
  Font headerFont = workbook.createFont();
  headerFont.setBold(true);
  headerFont.setFontHeightInPoints((short) 12);
  CellStyle headerCellStyle = workbook.createCellStyle();
  headerCellStyle.setFont(headerFont);

  // Create Header Row
  Row headerRow = sheet.createRow(0);
  String[] columns = {"ID", "Name", "Attending"};
  for (int i = 0; i < columns.length; i++) {
   Cell cell = headerRow.createCell(i);
   cell.setCellValue(columns[i]);
   cell.setCellStyle(headerCellStyle);
  }

  // Create Data Rows
  int rowNum = 1;
  for (Rsvp rsvp : rsvps) {
   Row row = sheet.createRow(rowNum++);
   row.createCell(0).setCellValue(rsvp.getId());
   row.createCell(1).setCellValue(rsvp.getName() != null ? rsvp.getName() : "N/A");
   row.createCell(2).setCellValue(rsvp.getAttending());
  }

  // Auto-size columns
  for (int i = 0; i < columns.length; i++) {
   sheet.autoSizeColumn(i);
  }

  // Set response headers to trigger file download
  response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  response.setHeader("Content-Disposition", "attachment; filename=guest_list.xlsx");

  // Write workbook to response output stream
  workbook.write(response.getOutputStream());
  workbook.close(); // Close the workbook
 }
}