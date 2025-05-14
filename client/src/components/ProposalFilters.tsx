type ProposalFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function ProposalFilters({ activeFilter, onFilterChange }: ProposalFilterProps) {
  const filters = [
    { id: "all", label: "All Proposals" },
    { id: "active", label: "Active" },
    { id: "passed", label: "Passed" },
    { id: "failed", label: "Failed" },
    { id: "finalized", label: "Finalized" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`${
              activeFilter === filter.id
                ? "bg-primary-500 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            } px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
