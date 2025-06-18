import ShortKpiCard from '../ShortKpiCard';
import { type PublicationsData, type JournalConferenceData } from '../../lib/server/api';

type Props = {
  publicationsData: PublicationsData;
  journalConferenceData: JournalConferenceData;
}

export default function ShortKpiStats({ publicationsData, journalConferenceData }: Props) {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {/* Publications Section */}
        <ShortKpiCard 
          title="Total Publications" 
          value={publicationsData.publicationsData}
          description="Total number of publications" 
          detailedDescription="Total number of publications across all types"
          color="blue"
        />
        
        <ShortKpiCard 
          title="Open Access" 
          value={publicationsData.openAccessCountData ?? 0}
          description={`${publicationsData.openAccessPercentageData ? publicationsData.openAccessPercentageData.toFixed(1) : 0}%`} 
          detailedDescription={`${publicationsData.openAccessCountData ?? 0} open access publications (${publicationsData.openAccessPercentageData ? publicationsData.openAccessPercentageData.toFixed(1) : 0}% of total)`}
          color="green"
        />
        
        <ShortKpiCard 
          title="Green/Gold OA" 
          value={`${publicationsData.greenOACountData ?? 0}/${publicationsData.goldOACountData ?? 0}`}
          description="Green/Gold open access" 
          detailedDescription={`${publicationsData.greenOACountData ?? 0} Green OA and ${publicationsData.goldOACountData ?? 0} Gold OA publications`}
          color="teal"
        />
        
        {/* Journal & Conference Section */}
        <ShortKpiCard 
          title="Avg. Impact Factor" 
          value={journalConferenceData.impactFactorData ? journalConferenceData.impactFactorData.toFixed(2) : '0'}
          description="Average journal IF" 
          detailedDescription="Average journal impact factor across all publications"
          color="purple"
        />
        
        <ShortKpiCard 
          title="Avg. Subsidy Points" 
          value={journalConferenceData.subsidyPointsData ? journalConferenceData.subsidyPointsData.toFixed(2) : '0'}
          description="Average points" 
          detailedDescription="Average subsidy points per publication"
          color="amber"
        />
        
        <ShortKpiCard 
          title="Journals & Conferences" 
          value={`${journalConferenceData.journalsCountData ?? 0}/${journalConferenceData.conferencesCountData ?? 0}`}
          description="Total J/C" 
          detailedDescription={`${journalConferenceData.journalsCountData ?? 0} journals and ${journalConferenceData.conferencesCountData ?? 0} conferences`}
          color="indigo"
        />
      </div>
    </div>
  );
} 