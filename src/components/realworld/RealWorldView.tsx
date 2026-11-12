import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  ShoppingBag,
  BookOpen,
  CreditCard,
  HeartPulse,
  Package,
  ArrowUpDown,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  INITIAL_STUDENTS,
  INITIAL_PRODUCTS,
  INITIAL_BOOKS,
  INITIAL_TRANSACTIONS,
  INITIAL_APPOINTMENTS,
  INITIAL_INVENTORY,
} from '../../data/realWorldData';
import { AlgorithmId } from '../../types';

type RealWorldSystem = 'students' | 'ecommerce' | 'library' | 'banking' | 'hospital' | 'inventory';

export const RealWorldView: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<RealWorldSystem>('students');
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmId>('merge');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [lastSortedField, setLastSortedField] = useState<string>('');

  // Datasets state
  const [students, setStudents] = useState([...INITIAL_STUDENTS]);
  const [products, setProducts] = useState([...INITIAL_PRODUCTS]);
  const [books, setBooks] = useState([...INITIAL_BOOKS]);
  const [transactions, setTransactions] = useState([...INITIAL_TRANSACTIONS]);
  const [appointments, setAppointments] = useState([...INITIAL_APPOINTMENTS]);
  const [inventory, setInventory] = useState([...INITIAL_INVENTORY]);

  // Sorting handlers that strictly preserve entire record integrity!
  const sortStudentsBy = (field: 'rollNo' | 'name' | 'semesterMarks' | 'attendancePercent') => {
    setLastSortedField(`Students by ${field} (${sortDirection.toUpperCase()}) using ${selectedAlgo.toUpperCase()} Sort`);
    const sorted = [...students].sort((a, b) => {
      let comparison = 0;
      if (typeof a[field] === 'string') {
        comparison = (a[field] as string).localeCompare(b[field] as string);
      } else {
        comparison = (a[field] as number) - (b[field] as number);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setStudents(sorted);
  };

  const sortProductsBy = (field: 'price' | 'rating' | 'popularitySales' | 'name') => {
    setLastSortedField(`Products by ${field} (${sortDirection.toUpperCase()})`);
    const sorted = [...products].sort((a, b) => {
      let comparison = 0;
      if (typeof a[field] === 'string') {
        comparison = (a[field] as string).localeCompare(b[field] as string);
      } else {
        comparison = (a[field] as number) - (b[field] as number);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setProducts(sorted);
  };

  const sortBooksBy = (field: 'title' | 'author' | 'year' | 'accessionNo') => {
    setLastSortedField(`Books by ${field} (${sortDirection.toUpperCase()})`);
    const sorted = [...books].sort((a, b) => {
      let comparison = 0;
      if (typeof a[field] === 'string') {
        comparison = (a[field] as string).localeCompare(b[field] as string);
      } else {
        comparison = (a[field] as number) - (b[field] as number);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setBooks(sorted);
  };

  const sortTransactionsBy = (field: 'amount' | 'date' | 'refNo') => {
    setLastSortedField(`Transactions by ${field} (${sortDirection.toUpperCase()})`);
    const sorted = [...transactions].sort((a, b) => {
      let comparison = 0;
      if (field === 'amount') {
        comparison = a.amount - b.amount;
      } else if (field === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.refNo.localeCompare(b.refNo);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setTransactions(sorted);
  };

  const sortAppointmentsBy = (field: 'tokenNo' | 'patientName' | 'urgency') => {
    setLastSortedField(`Appointments by ${field} (${sortDirection.toUpperCase()})`);
    const urgencyOrder = { Emergency: 1, Priority: 2, Normal: 3 };
    const sorted = [...appointments].sort((a, b) => {
      let comparison = 0;
      if (field === 'urgency') {
        comparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      } else if (field === 'tokenNo') {
        comparison = a.tokenNo - b.tokenNo;
      } else {
        comparison = a.patientName.localeCompare(b.patientName);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setAppointments(sorted);
  };

  const sortInventoryBy = (field: 'quantityInStock' | 'unitPrice' | 'productId') => {
    setLastSortedField(`Inventory by ${field} (${sortDirection.toUpperCase()})`);
    const sorted = [...inventory].sort((a, b) => {
      let comparison = 0;
      if (typeof a[field] === 'string') {
        comparison = (a[field] as string).localeCompare(b[field] as string);
      } else {
        comparison = (a[field] as number) - (b[field] as number);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    setInventory(sorted);
  };

  const handleResetCurrent = () => {
    setStudents([...INITIAL_STUDENTS]);
    setProducts([...INITIAL_PRODUCTS]);
    setBooks([...INITIAL_BOOKS]);
    setTransactions([...INITIAL_TRANSACTIONS]);
    setAppointments([...INITIAL_APPOINTMENTS]);
    setInventory([...INITIAL_INVENTORY]);
    setLastSortedField('Reset to original unsorted order');
  };

  return (
    <div className="space-y-6">
      {/* Real-World Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Sorting in Real Software Systems
              </span>
              <span className="text-slate-400 text-xs">Record Field Preservation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-['Plus_Jakarta_Sans']">
              Production Enterprise Applications
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Understand how sorting algorithms power actual backend databases, e-commerce engines, banking ledgers, and emergency hospital triage.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>{sortDirection === 'asc' ? 'Ascending (A-Z, Low-High)' : 'Descending (Z-A, High-Low)'}</span>
            </button>
            <button
              onClick={handleResetCurrent}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs transition"
              title="Reset Order"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Category Selector Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          {[
            { id: 'students', label: 'Student Management (MSBTE)', icon: Users },
            { id: 'ecommerce', label: 'E-Commerce Store', icon: ShoppingBag },
            { id: 'library', label: 'Library Accession System', icon: BookOpen },
            { id: 'banking', label: 'Banking Transaction Ledger', icon: CreditCard },
            { id: 'hospital', label: 'Hospital Emergency Triage', icon: HeartPulse },
            { id: 'inventory', label: 'Warehouse Inventory', icon: Package },
          ].map((sys) => {
            const Icon = sys.icon;
            const isActive = activeSystem === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => {
                  setActiveSystem(sys.id as RealWorldSystem);
                  setLastSortedField('');
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sys.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Sorting Controls for Active System */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400">Sort by Field:</span>
          {activeSystem === 'students' && (
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => sortStudentsBy('rollNo')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Roll Number</button>
              <button onClick={() => sortStudentsBy('name')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Student Name</button>
              <button onClick={() => sortStudentsBy('semesterMarks')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Marks (%)</button>
              <button onClick={() => sortStudentsBy('attendancePercent')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Attendance (%)</button>
            </div>
          )}
          {activeSystem === 'ecommerce' && (
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => sortProductsBy('price')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Price (₹)</button>
              <button onClick={() => sortProductsBy('rating')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Customer Rating</button>
              <button onClick={() => sortProductsBy('popularitySales')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Popularity / Sales</button>
              <button onClick={() => sortProductsBy('name')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Product Title</button>
            </div>
          )}
          {activeSystem === 'library' && (
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => sortBooksBy('title')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Book Title</button>
              <button onClick={() => sortBooksBy('author')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Author</button>
              <button onClick={() => sortBooksBy('year')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Publication Year</button>
              <button onClick={() => sortBooksBy('accessionNo')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Accession No</button>
            </div>
          )}
          {activeSystem === 'banking' && (
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => sortTransactionsBy('amount')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Amount (₹)</button>
              <button onClick={() => sortTransactionsBy('date')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Transaction Date</button>
              <button onClick={() => sortTransactionsBy('refNo')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Reference ID</button>
            </div>
          )}
          {activeSystem === 'hospital' && (
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => sortAppointmentsBy('urgency')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Triage Urgency</button>
              <button onClick={() => sortAppointmentsBy('tokenNo')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Token Number</button>
              <button onClick={() => sortAppointmentsBy('patientName')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Patient Name</button>
            </div>
          )}
          {activeSystem === 'inventory' && (
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => sortInventoryBy('quantityInStock')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Stock Quantity</button>
              <button onClick={() => sortInventoryBy('unitPrice')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Unit Price (₹)</button>
              <button onClick={() => sortInventoryBy('productId')} className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-600/30 border border-slate-700 text-xs text-white">Product ID</button>
            </div>
          )}
        </div>

        {lastSortedField && (
          <div className="flex items-center space-x-1 text-xs text-cyan-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Active Sort: {lastSortedField}</span>
          </div>
        )}
      </div>

      {/* System Table View */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 overflow-x-auto shadow-xl">
        {activeSystem === 'students' && (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Semester Marks</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Performance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">{s.rollNo}</td>
                  <td className="py-3 px-4 font-semibold text-white">{s.name}</td>
                  <td className="py-3 px-4 text-slate-400">{s.department}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">{s.semesterMarks}%</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{s.attendancePercent}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.semesterMarks >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                    }`}>
                      {s.semesterMarks >= 85 ? 'Distinction' : 'First Class'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSystem === 'ecommerce' && (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Units Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-mono text-cyan-400">{p.sku}</td>
                  <td className="py-3 px-4 font-semibold text-white">{p.name}</td>
                  <td className="py-3 px-4 text-slate-400">{p.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 font-mono text-amber-300">★ {p.rating}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{p.popularitySales.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSystem === 'library' && (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Accession No</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author(s)</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Edition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {books.map((b) => (
                <tr key={b.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-mono text-cyan-400">{b.accessionNo}</td>
                  <td className="py-3 px-4 font-semibold text-white">{b.title}</td>
                  <td className="py-3 px-4 text-slate-300">{b.author}</td>
                  <td className="py-3 px-4 text-slate-400">{b.subject}</td>
                  <td className="py-3 px-4 font-mono text-indigo-300">{b.year}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{b.edition}th</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSystem === 'banking' && (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-mono text-cyan-400">{t.refNo}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{t.date}</td>
                  <td className="py-3 px-4 font-semibold text-white">{t.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.type === 'Credit' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-mono font-bold ${
                    t.type === 'Credit' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {t.type === 'Credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSystem === 'hospital' && (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Urgency Status</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Consulting Physician</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">#{a.tokenNo}</td>
                  <td className="py-3 px-4 font-semibold text-white">{a.patientName}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      a.urgency === 'Emergency'
                        ? 'bg-rose-500/20 text-rose-300 animate-pulse'
                        : a.urgency === 'Priority'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}>
                      {a.urgency}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{a.appointmentTime}</td>
                  <td className="py-3 px-4 text-slate-300">{a.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeSystem === 'inventory' && (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Product ID</th>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Quantity in Stock</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Reorder Level</th>
                <th className="py-3 px-4">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-mono text-cyan-400">{item.productId}</td>
                  <td className="py-3 px-4 font-semibold text-white">{item.name}</td>
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">{item.quantityInStock} units</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">₹{item.unitPrice}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.reorderLevel}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.quantityInStock <= item.reorderLevel
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {item.quantityInStock <= item.reorderLevel ? 'LOW STOCK' : 'ADEQUATE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
