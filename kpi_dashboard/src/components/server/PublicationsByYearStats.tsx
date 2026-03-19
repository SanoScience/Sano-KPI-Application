import { type PublicationsByYearData } from '../../lib/server/api';

type Props = {
  data: PublicationsByYearData;
}

export default function PublicationsByYearStats({ data }: Props) {
  const sortedYears = Object.entries(data || {})
    .sort(([yearA], [yearB]) => Number(yearA) - Number(yearB));

  const maxCount = sortedYears.length > 0
    ? Math.max(...sortedYears.map(([, count]) => count))
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Total Sano Publications by Year</h2>

      {sortedYears.length > 0 ? (
        <div className="p-2">
          <div className="h-80 flex items-end gap-4 px-4 pb-4">
            {sortedYears.map(([year, count]) => {
              const heightPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;

              return (
                <div
                  key={year}
                  className="flex flex-1 flex-col items-center justify-end h-full min-w-0"
                >
                  <span className="mb-2 text-sm text-gray-600">{count}</span>

                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full max-w-14 rounded-t-md bg-purple-600 transition-all"
                      style={{ height: `${Math.max(heightPercent, 4)}%` }}
                      title={`${year}: ${count} publications`}
                    />
                  </div>

                  <span className="mt-3 text-sm font-medium text-gray-700">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No yearly publication data available</p>
      )}
    </div>
  );
}
