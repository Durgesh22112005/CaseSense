"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { COMPLAINT_CASES, ComplaintCase } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Search,
  Filter,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertTriangle,
  Building,
  Calendar,
} from "lucide-react";

export default function CaseTrackerPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bureauFilter, setBureauFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filteredCases = useMemo(() => {
    return COMPLAINT_CASES.filter((c) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        c.caseId.toLowerCase().includes(query) ||
        c.institutionName.toLowerCase().includes(query) ||
        c.permanentId.toLowerCase().includes(query) ||
        c.assignedOfficer.toLowerCase().includes(query);

      const matchesBureau =
        bureauFilter === "All" ||
        (bureauFilter === "RB" && c.bureau.includes("Regulation")) ||
        (bureauFilter === "PGRC" && c.bureau.includes("PGRC")) ||
        (bureauFilter === "RO" && c.bureau.includes("Regional"));

      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      const matchesRegion = regionFilter === "All" || c.region === regionFilter;

      return matchesSearch && matchesBureau && matchesStatus && matchesRegion;
    });
  }, [searchQuery, bureauFilter, statusFilter, regionFilter]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage) || 1;
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    setSearchQuery("");
    setBureauFilter("All");
    setStatusFilter("All");
    setRegionFilter("All");
    setCategoryFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-[#0B4F9C]">
            AICTE Grievance & Regulatory Registry
          </div>
          <h1 className="text-xl font-bold text-[#0F1E36] tracking-tight">
            Centralized Case Tracker
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Single-window database of all complaints, regulatory notices, and pending investigations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Case ID (e.g. AICTE/PGRC/2026/04821), Institution Name, or AICTE Permanent ID (1-XXXXXXXX)..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0B4F9C] focus:border-[#0B4F9C]"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Bureau / Cell
            </label>
            <select
              value={bureauFilter}
              onChange={(e) => {
                setBureauFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded p-1.5 bg-white text-gray-800"
            >
              <option value="All">All Bureaus / Cells</option>
              <option value="RB">Regulation Bureau (RB)</option>
              <option value="PGRC">Public Grievance Cell (PGRC)</option>
              <option value="RO">Regional Offices (RO)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Case Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded p-1.5 bg-white text-gray-800"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending (Amber)</option>
              <option value="Under Process">Under Process (Blue)</option>
              <option value="Disposed">Disposed (Green)</option>
              <option value="Transferred">Transferred (Purple)</option>
              <option value="Escalated">Escalated (Red)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              AICTE Region
            </label>
            <select
              value={regionFilter}
              onChange={(e) => {
                setRegionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded p-1.5 bg-white text-gray-800"
            >
              <option value="All">All 6 Regions</option>
              <option value="Western Region">Western Region</option>
              <option value="Northern Region">Northern Region</option>
              <option value="Southern Region">Southern Region</option>
              <option value="South-Western Region">South-Western Region</option>
              <option value="Eastern Region">Eastern Region</option>
              <option value="Central Region">Central Region</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Date Received Range
            </label>
            <select
              defaultValue="FY2026-27"
              className="w-full border border-gray-300 rounded p-1.5 bg-white text-gray-800"
            >
              <option value="FY2026-27">FY 2026-27 (Current)</option>
              <option value="Q3">Q3 (Oct - Dec 2026)</option>
              <option value="Q2">Q2 (Jul - Sep 2026)</option>
              <option value="PastYear">Past 12 Months</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full px-3 py-1.5 border border-gray-300 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 flex items-center justify-center gap-1.5 text-xs font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Case Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600">
          <div>
            Showing <strong className="text-gray-900">{filteredCases.length}</strong> registered cases matching criteria
          </div>
          <div className="text-[11px] text-gray-500">
            Dates shown in Indian Standard Format: DD-MM-YYYY
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#0F1E36] text-white font-medium">
              <tr>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Institution & PID</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Bureau / Cell</th>
                <th className="py-2.5 px-3">Assigned Officer</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Last Action</th>
                <th className="py-2.5 px-3">Next Action</th>
                <th className="py-2.5 px-3">Expected Disposal</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-500">
                    No complaint cases found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedCases.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50/40 transition">
                    {/* Case ID */}
                    <td className="py-3 px-3 font-mono font-bold text-[#0B4F9C] whitespace-nowrap align-top">
                      <Link href={`/cases/${c.id}`} className="hover:underline">
                        {c.caseId}
                      </Link>
                      {c.isOverlapping && (
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] bg-red-100 text-red-800 rounded font-sans font-bold border border-red-300">
                            <AlertTriangle className="w-2.5 h-2.5 text-red-600" />
                            OVERLAP
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Institution */}
                    <td className="py-3 px-3 align-top min-w-[180px]">
                      <Link
                        href={`/institutions/${c.permanentId}`}
                        className="font-semibold text-gray-900 hover:text-[#0B4F9C] hover:underline block"
                      >
                        {c.institutionName}
                      </Link>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                        PID: {c.permanentId} • {c.district}, {c.state}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-3 align-top text-gray-700 max-w-[200px]">
                      <div className="line-clamp-2" title={c.category}>
                        {c.category}
                      </div>
                    </td>

                    {/* Bureau */}
                    <td className="py-3 px-3 align-top text-gray-700 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{c.bureau}</span>
                    </td>

                    {/* Officer */}
                    <td className="py-3 px-3 align-top text-gray-700 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{c.assignedOfficer}</div>
                      <div className="text-[10px] text-gray-400">{c.assignedOfficerRole}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 align-top whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>

                    {/* Last Action */}
                    <td className="py-3 px-3 align-top text-gray-600 max-w-[220px]">
                      <div className="line-clamp-2">{c.lastAction}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {c.lastActionDate}
                      </div>
                    </td>

                    {/* Next Action */}
                    <td className="py-3 px-3 align-top text-gray-600 max-w-[200px]">
                      <div className="line-clamp-2">{c.nextAction}</div>
                    </td>

                    {/* Expected Disposal */}
                    <td className="py-3 px-3 align-top font-mono whitespace-nowrap">
                      <span className="text-gray-800">{c.expectedDisposalDate}</span>
                      {c.isSlaBreached ? (
                        <div className="text-[10px] text-red-600 font-bold mt-0.5">
                          SLA Breached (+27d)
                        </div>
                      ) : (
                        <div className="text-[10px] text-emerald-700 mt-0.5">
                          {c.slaDaysRemaining} days remaining
                        </div>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-3 align-top text-center whitespace-nowrap">
                      <Link
                        href={`/cases/${c.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-[#0B4F9C] hover:text-white text-[#0B4F9C] rounded border border-[#0B4F9C] text-xs font-semibold transition"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-700">
          <div>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (
            {filteredCases.length} records total)
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="px-3 py-1 font-mono font-semibold bg-white border border-gray-300 rounded">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
