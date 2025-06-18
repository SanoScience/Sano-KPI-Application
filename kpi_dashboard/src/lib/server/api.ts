// Server-side API utility functions to fetch statistics
import { BASE_URL } from './baseUrl';

export type PublicationsData = {
  publicationsData: number;
  publicationsByGroupData: Record<string, number>;
  openAccessCountData: number;
  openAccessPercentageData: number;
  greenOACountData: number;
  goldOACountData: number;
}

export type JournalConferenceData = {
  journalsCountData: number;
  conferencesCountData: number;
  impactFactorData: number;
  subsidyPointsData: number;
}

export type PublicationsByResearchGroupsData = Record<string, number>;

export type KpiData = {
  publicationsData: PublicationsData;
  journalConferenceData: JournalConferenceData;
  publicationsByResearchGroupsData: PublicationsByResearchGroupsData;
}

export async function getKpiData(): Promise<KpiData | null> {
  try {
    const [
      publicationsCount,
      publicationsByGroups,
      openAccessCount,
      openAccessPercentage,
      greenOACount,
      goldOACount,
      journalsCount,
      conferencesCount,
      impactFactor,
      subsidyPoints
    ] = await Promise.all([
      getPublicationsCount(),
      getPublicationsByResearchGroups(),
      getOpenAccessPublicationsCount(),
      getOpenAccessPublicationsPercentage(),
      getGreenOpenAccessPublicationsCount(),
      getGoldOpenAccessPublicationsCount(),
      getJournalsCount(),
      getConferencesCount(),
      getAverageImpactFactor(),
      getAverageSubsidyPoints()
    ]);

    return {
      publicationsData: {
        publicationsData: publicationsCount,
        publicationsByGroupData: publicationsByGroups,
        openAccessCountData: openAccessCount,
        openAccessPercentageData: openAccessPercentage,
        greenOACountData: greenOACount,
        goldOACountData: goldOACount
      },
      journalConferenceData: {
        journalsCountData: journalsCount,
        conferencesCountData: conferencesCount,
        impactFactorData: impactFactor,
        subsidyPointsData: subsidyPoints
      },
      publicationsByResearchGroupsData: publicationsByGroups
    };
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    return null;
  }
}

// Publication statistics
export async function getPublicationsCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/publications_count`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getPublicationsByResearchGroups(): Promise<PublicationsByResearchGroupsData> {
  const res = await fetch(`${BASE_URL}/statistics/publications_by_research_groups_count`);
  return res.json();
}

export async function getPublicationsByCategory(): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/statistics/publications_by_category_count`);
  return res.json();
}

export async function getPublicationsByStatus(): Promise<Record<string, number>> {
  const res = await fetch(`${BASE_URL}/statistics/publications_by_status_count`);
  return res.json();
}

// Open Access statistics
export async function getOpenAccessPublicationsCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/open_access_publications_count`);
  return res.json();
}

export async function getOpenAccessPublicationsPercentage(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/open_access_publications_percentage`);
  return res.json();
}

export async function getGreenOpenAccessPublicationsCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/green_open_access_publications_count`);
  return res.json();
}

export async function getGoldOpenAccessPublicationsCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/gold_open_access_publications_count`);
  return res.json();
}

// Journal statistics
export async function getJournalsCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/journals_count`);
  return res.json();
}

// Conference statistics
export async function getConferencesCount(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/conferences_count`);
  return res.json();
}

// Additional statistics
export async function getAverageImpactFactor(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/average_impact_factor`);
  return res.json();
}

export async function getAverageSubsidyPoints(): Promise<number> {
  const res = await fetch(`${BASE_URL}/statistics/average_subsidy_points`);
  return res.json();
} 