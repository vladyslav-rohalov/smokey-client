export const addAlphabetIndex = brands => {
  let alphabetIndex = '';
  return brands
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(brand => {
      if (alphabetIndex !== brand.name[0]) {
        alphabetIndex = brand.name[0];
        return { ...brand, letter: brand.name[0].toUpperCase() };
      }
      return brand;
    });
};

export const filterByInput = (brands, filter) => {
  return brands.filter(brand => {
    if (filter !== '') {
      return brand.name.toLowerCase().startsWith(filter.toLowerCase());
    }
    return brand;
  });
};