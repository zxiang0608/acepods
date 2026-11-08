export function filterPortfolioProjects(projects, companyName = '', query = '') {
  const search = query.trim().toLocaleLowerCase();
  return projects.filter((project) =>
    (!companyName || project.companyName === companyName) &&
    project.companyName.toLocaleLowerCase().includes(search)
  );
}
