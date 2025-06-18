// not used anymore
const translateResearchGroup = (group: string) => {
    const translations: Record<string, string> = {
      'health_informatics': 'Health Informatics',
      'extreme_scale': 'Extreme Scale Computing',
      'computer_vision': 'Computer Vision',
      'personal_health_ds': 'Personal Health Data Science',
      'other': 'Other Research Groups',
      'scientific_programmers': 'Scientific Programmers',
      'senior_post_doc': 'Senior Post-Doctoral Researchers',
      'genomics': 'Structural and Functional Genomics Group',
      'clinical_data_science': 'Clinical Data Science',
      'modelling_simulation': 'Modelling and Simulation'
    };
    return translations[group] || group;
  }

export default translateResearchGroup;