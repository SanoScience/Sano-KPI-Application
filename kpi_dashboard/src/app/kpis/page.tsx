import JournalConferenceStats from "@/components/server/JournalConferenceStats";
import PublicationsStats from "@/components/server/PublicationsStats";
import ResearchGroupsStats from "@/components/server/ResearchGroupsStats";
import { getKpiData } from "@/lib/server/api";

export const revalidate = 60
 
export default async function Page() {
    const kpiData = await getKpiData();
    console.log("Rendering KPI page with ", JSON.stringify(kpiData), " at: ", Date.now());
    
    if (!kpiData) {
        return (
            <>
                <div className="flex flex-col w-full h-20 bg-[#2E2665] rounded-lg justify-center p-8">
                    <h1 className="text-white text-2xl font-bold">KPIs overview</h1>
                </div>
                <div className="mt-4 p-4 text-gray-600">
                    Unable to load KPI data. Please try again later.
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col w-full h-20 bg-[#2E2665] rounded-lg justify-center p-8">
                <h1 className="text-white text-2xl font-bold">KPIs overview</h1>
            </div>
            <PublicationsStats data={kpiData.publicationsData} />
            <JournalConferenceStats data={kpiData.journalConferenceData} />
            <ResearchGroupsStats data={kpiData.publicationsByResearchGroupsData} />
        </>
    )
}
