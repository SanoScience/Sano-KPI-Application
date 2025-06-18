import ShortKpiStats from "@/components/server/ShortKpiStats";
import { getKpiData } from "@/lib/server/api";

export const revalidate = 60
 
export default async function Page() {
    const kpiData = await getKpiData();
    console.log("Rendering KPI page with ", JSON.stringify(kpiData), " at: ", Date.now());
    
    if (!kpiData) {
        return (
            <div className="p-4 text-gray-600">
                Unable to load KPI data. Please try again later.
            </div>
        );
    }

    return (
        <>
            <ShortKpiStats 
                publicationsData={kpiData.publicationsData}
                journalConferenceData={kpiData.journalConferenceData}
            />
        </>
    )
}
