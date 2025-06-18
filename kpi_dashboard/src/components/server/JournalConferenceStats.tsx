import KpiCard from '../KpiCard';
import { type JournalConferenceData } from '../../lib/server/api';

type Props = {
  data: JournalConferenceData;
}

export default function JournalConferenceStats({ data }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Journals & Conferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard 
          title="Total Journals" 
          value={data.journalsCountData ?? 0}
          description="Number of unique journals" 
          color="indigo"
        />
        
        <KpiCard 
          title="Avg. Impact Factor" 
          value={data.impactFactorData ? data.impactFactorData.toFixed(2) : '0'}
          description="Average journal impact factor" 
          color="purple"
        />
        
        <KpiCard 
          title="Total Conferences" 
          value={data.conferencesCountData ?? 0}
          description="Number of unique conferences" 
          color="orange"
        />
        
        <KpiCard 
          title="Avg. Subsidy Points" 
          value={data.subsidyPointsData ? data.subsidyPointsData.toFixed(2) : '0'}
          description="Average subsidy points per publication" 
          color="teal"
        />
      </div>
    </div>
  );
} 