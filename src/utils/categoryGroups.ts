// Category grouping system for filtering news articles

export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  categories: string[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'faith-church',
    name: 'Faith & Church',
    description: 'Church news, theology, and spiritual content',
    color: 'primary',
    icon: 'cross',
    categories: [
      'church', 'catholic', 'orthodox', 'methodist', 'episcopal', 
      'lutheran', 'ucc', 'adventist', 'pentecostal', 'faith', 
      'theology', 'prayer', 'bible-study'
    ]
  },
  {
    id: 'ministry-service',
    name: 'Ministry & Service',
    description: 'Outreach, missions, and Christian service',
    color: 'gold',
    icon: 'users',
    categories: [
      'ministry', 'missions', 'youth', 'orphan-care', 'social-justice', 
      'apologetics', 'spiritual-warfare', 'teaching'
    ]
  },
  {
    id: 'global-politics',
    name: 'Global & Politics',
    description: 'World news, politics, and international events',
    color: 'red',
    icon: 'globe',
    categories: [
      'world', 'israel', 'regional', 'us', 'politics', 'entertainment'
    ]
  },
  {
    id: 'lifestyle-culture',
    name: 'Lifestyle & Culture',
    description: 'Family, health, culture, and daily living',
    color: 'green',
    icon: 'heart',
    categories: [
      'family', 'lifestyle', 'health', 'culture', 'music', 'writing'
    ]
  },
  {
    id: 'business-general',
    name: 'Business & General',
    description: 'Finance, research, and general news',
    color: 'blue',
    icon: 'briefcase',
    categories: [
      'finance', 'research', 'news', 'default'
    ]
  }
];

// Helper function to get category group for a specific category
export const getCategoryGroup = (category: string): CategoryGroup => {
  const normalizedCategory = category.toLowerCase();
  
  for (const group of categoryGroups) {
    if (group.categories.includes(normalizedCategory)) {
      return group;
    }
  }
  
  // Default to business-general if category not found
  return categoryGroups.find(group => group.id === 'business-general')!;
};

// Helper function to get all categories in a group
export const getCategoriesInGroup = (groupId: string): string[] => {
  const group = categoryGroups.find(g => g.id === groupId);
  return group ? group.categories : [];
};

// Helper function to check if a category belongs to a group
export const isCategoryInGroup = (category: string, groupId: string): boolean => {
  const group = categoryGroups.find(g => g.id === groupId);
  if (!group) return false;
  
  return group.categories.includes(category.toLowerCase());
}; 