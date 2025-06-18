import KpiCard from '../KpiCard';
import { type PublicationsData } from '../../lib/server/api';

type Props = {
  data: PublicationsData;
}

export default function PublicationsStats({ data }: Props) {
  // Find the research group with the most publications
  const topResearchGroup = data.publicationsByGroupData 
    ? Object.entries(data.publicationsByGroupData).reduce(
        (prev, current) => (current[1] > prev[1] ? current : prev),
        ['', 0]
      )[0]
    : '';

  const topGroupCount = data.publicationsByGroupData && topResearchGroup 
    ? data.publicationsByGroupData[topResearchGroup] 
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Publications Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard 
          title="Total Publications" 
          value={data.publicationsData}
          description="Total number of publications" 
          color="blue"
        />
        
        <KpiCard 
          title="Open Access Publications" 
          value={data.openAccessCountData ?? 0}
          description={`${data.openAccessPercentageData ? data.openAccessPercentageData.toFixed(1) : 0}% of total publications`} 
          color="green"
        />
        
        <KpiCard 
          title="Green Open Access" 
          value={data.greenOACountData ?? 0}
          description="Publications in green open access" 
          color="teal"
        />
        
        <KpiCard 
          title="Gold Open Access" 
          value={data.goldOACountData ?? 0}
          description="Publications in gold open access" 
          color="amber"
        />
        
        {topResearchGroup && (
          <KpiCard 
            title="Top Research Group" 
            value={topResearchGroup}
            description={`${topGroupCount} publications`} 
            color="purple"
          />
        )}
      </div>
    </div>
  );
}
