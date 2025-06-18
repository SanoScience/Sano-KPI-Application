import { type PublicationsByResearchGroupsData } from '../../lib/server/api';

type Props = {
  data: PublicationsByResearchGroupsData;
}

const activeResearchGroups = [
  "Medical Imaging and Robotics",
  "Extreme-Scale Data and Computing",
  "Computational Neuroscience",
  "Personal Health Data Science",
  "Scientific Programmers",
  "Structural and Functional Genomics Group",
]

const processGroupData = (groupData: Record<string, number>) => {
  const processed: Record<string, number> = {};
  let otherCount = 0;

  Object.entries(groupData).forEach(([group, count]) => {
    if (activeResearchGroups.includes(group)) {
      processed[group] = count;
    } else {
      otherCount += count;
    }
  });

  if (otherCount > 0) {
    processed['other'] = otherCount;
  }

  return processed;
};

export default function ResearchGroupsStats({ data }: Props) {
  const groupData = data ? processGroupData(data) : {};

  // Sort groups by publication count (descending)
  const sortedGroups = Object.entries(groupData)
    .sort((a, b) => b[1] - a[1]);

  // Function to determine bar color based on index
  const getBarColor = (index: number) => {
    const colors = [
      'bg-blue-600', 'bg-purple-600', 'bg-teal-600', 
      'bg-green-600', 'bg-amber-600', 'bg-indigo-600'
    ];
    return colors[index % colors.length];
  };
  
  const maxCount = sortedGroups.length > 0 
    ? sortedGroups[0][1] 
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Publications by Research Group</h2>
      
      <div className="space-y-4">
        {sortedGroups.map(([group, count], index) => (
          <div key={group} className="space-y-1">
            <div className="flex gap-4 justify-between">
              <span className="font-medium">{group}</span>
              <span className="text-gray-600">{count} publications</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${getBarColor(index)}`}
                style={{ width: `${(count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        
        {sortedGroups.length === 0 && (
          <p className="text-gray-500">No research group data available</p>
        )}
      </div>
    </div>
  );
} 