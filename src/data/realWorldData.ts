import {
  RealWorldStudent,
  RealWorldProduct,
  RealWorldBook,
  RealWorldTransaction,
  RealWorldAppointment,
  RealWorldInventoryItem,
} from '../types';

export const INITIAL_STUDENTS: RealWorldStudent[] = [
  { id: 's1', rollNo: 104, name: 'Aarav Patel', department: 'Computer Tech', semesterMarks: 88, attendancePercent: 94 },
  { id: 's2', rollNo: 101, name: 'Sneha Deshmukh', department: 'Computer Tech', semesterMarks: 95, attendancePercent: 98 },
  { id: 's3', rollNo: 108, name: 'Rohan Kulkarni', department: 'Information Tech', semesterMarks: 72, attendancePercent: 82 },
  { id: 's4', rollNo: 102, name: 'Ananya Sharma', department: 'Computer Tech', semesterMarks: 91, attendancePercent: 91 },
  { id: 's5', rollNo: 106, name: 'Vikram Shinde', department: 'Computer Tech', semesterMarks: 64, attendancePercent: 78 },
  { id: 's6', rollNo: 103, name: 'Pooja Jadhav', department: 'Information Tech', semesterMarks: 84, attendancePercent: 89 },
  { id: 's7', rollNo: 107, name: 'Aditya Patil', department: 'Computer Tech', semesterMarks: 79, attendancePercent: 86 },
  { id: 's8', rollNo: 105, name: 'Tanvi Joshi', department: 'Information Tech', semesterMarks: 89, attendancePercent: 95 },
];

export const INITIAL_PRODUCTS: RealWorldProduct[] = [
  { id: 'p1', sku: 'LAP-902', name: 'MacBook Air M2 16GB', category: 'Laptops', price: 99990, rating: 4.8, popularitySales: 1240 },
  { id: 'p2', sku: 'ACC-104', name: 'Logitech MX Master 3S', category: 'Accessories', price: 8495, rating: 4.9, popularitySales: 3500 },
  { id: 'p3', sku: 'LAP-401', name: 'Lenovo IdeaPad Gaming 3', category: 'Laptops', price: 54990, rating: 4.3, popularitySales: 2100 },
  { id: 'p4', sku: 'AUD-302', name: 'Sony WH-1000XM5 ANC', category: 'Audio', price: 26990, rating: 4.7, popularitySales: 1890 },
  { id: 'p5', sku: 'MON-801', name: 'LG UltraGear 27" 165Hz', category: 'Monitors', price: 21990, rating: 4.6, popularitySales: 940 },
  { id: 'p6', sku: 'ACC-209', name: 'Keychron K2 V2 Mechanical', category: 'Accessories', price: 7499, rating: 4.5, popularitySales: 1650 },
  { id: 'p7', sku: 'AUD-101', name: 'boAt Rockerz 450 Pro', category: 'Audio', price: 1499, rating: 4.1, popularitySales: 8400 },
];

export const INITIAL_BOOKS: RealWorldBook[] = [
  { id: 'b1', accessionNo: 'ACC-8402', title: 'Data Structures Using C', author: 'Reema Thareja', year: 2018, edition: 2, subject: 'DSA' },
  { id: 'b2', accessionNo: 'ACC-1205', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest', year: 2022, edition: 4, subject: 'Algorithms' },
  { id: 'b3', accessionNo: 'ACC-6109', title: 'Operating System Concepts', author: 'Silberschatz & Galvin', year: 2019, edition: 10, subject: 'OS' },
  { id: 'b4', accessionNo: 'ACC-3044', title: 'Database System Concepts', author: 'Korth, Sudarshan', year: 2020, edition: 7, subject: 'DBMS' },
  { id: 'b5', accessionNo: 'ACC-9112', title: 'Computer Networks', author: 'Andrew S. Tanenbaum', year: 2021, edition: 6, subject: 'Networks' },
  { id: 'b6', accessionNo: 'ACC-4521', title: 'Let Us C', author: 'Yashavant Kanetkar', year: 2017, edition: 16, subject: 'Programming' },
];

export const INITIAL_TRANSACTIONS: RealWorldTransaction[] = [
  { id: 't1', refNo: 'TXN-90214', date: '2026-11-09', description: 'Amazon Web Services India', amount: 3450.00, type: 'Debit' },
  { id: 't2', refNo: 'TXN-90180', date: '2026-11-01', description: 'Direct Deposit Monthly Salary', amount: 65000.00, type: 'Credit' },
  { id: 't3', refNo: 'TXN-90225', date: '2026-11-10', description: 'Tata Power Electricity Bill', amount: 2180.50, type: 'Debit' },
  { id: 't4', refNo: 'TXN-90192', date: '2026-11-04', description: 'UPI Transfer to Rohan K', amount: 500.00, type: 'Debit' },
  { id: 't5', refNo: 'TXN-90231', date: '2026-11-11', description: 'Client Consulting Freelance', amount: 18500.00, type: 'Credit' },
  { id: 't6', refNo: 'TXN-90204', date: '2026-11-06', description: 'Swiggy Food Delivery', amount: 489.00, type: 'Debit' },
];

export const INITIAL_APPOINTMENTS: RealWorldAppointment[] = [
  { id: 'a1', tokenNo: 14, patientName: 'Suresh Patil', appointmentTime: '10:30 AM', urgency: 'Normal', doctor: 'Dr. Mehta (Cardiology)' },
  { id: 'a2', tokenNo: 3, patientName: 'Geeta Pawar', appointmentTime: '09:15 AM', urgency: 'Priority', doctor: 'Dr. Joshi (Orthopedics)' },
  { id: 'a3', tokenNo: 21, patientName: 'Farhan Shaikh', appointmentTime: '11:45 AM', urgency: 'Emergency', doctor: 'Dr. Mehta (Cardiology)' },
  { id: 'a4', tokenNo: 8, patientName: 'Kavita Nair', appointmentTime: '09:50 AM', urgency: 'Normal', doctor: 'Dr. Rao (General)' },
  { id: 'a5', tokenNo: 1, patientName: 'Ramesh Kulkarni', appointmentTime: '09:00 AM', urgency: 'Emergency', doctor: 'Dr. Rao (General)' },
];

export const INITIAL_INVENTORY: RealWorldInventoryItem[] = [
  { id: 'inv1', productId: 'SKU-001', name: 'Microcontroller Dev Board ESP32', quantityInStock: 140, unitPrice: 450, reorderLevel: 50 },
  { id: 'inv2', productId: 'SKU-008', name: 'Raspberry Pi 4 Model B 4GB', quantityInStock: 25, unitPrice: 5800, reorderLevel: 30 },
  { id: 'inv3', productId: 'SKU-003', name: 'OLED Display Module 0.96"', quantityInStock: 320, unitPrice: 220, reorderLevel: 100 },
  { id: 'inv4', productId: 'SKU-012', name: 'Ultrasonic Sensor HC-SR04', quantityInStock: 500, unitPrice: 85, reorderLevel: 150 },
  { id: 'inv5', productId: 'SKU-005', name: 'Servo Motor SG90 Micro', quantityInStock: 80, unitPrice: 120, reorderLevel: 60 },
];
