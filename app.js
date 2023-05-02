fetch('jobs-data.json')
  .then(response => response.json())
  .then(data => {
    const featuredJobs = document.getElementById('featured-jobs');

 
    const searchKeywordsInput = document.getElementById('search-keywords');
    const searchLocationInput = document.getElementById('search-location');


    const debounceDelay = 300;
    let debounceTimer;

    const filterJobs = () => {

      clearTimeout(debounceTimer);

      
      debounceTimer = setTimeout(() => {

        const searchKeywords = searchKeywordsInput.value.toLowerCase();
        const searchLocation = searchLocationInput.value.toLowerCase();

        const filteredJobs = data.filter(job => {
          const jobKeywords = job.position.toLowerCase() + ' ' + job.company.toLowerCase() + ' ' + job.location.toLowerCase();
          return jobKeywords.includes(searchKeywords) && job.location.toLowerCase().includes(searchLocation);
        });

        featuredJobs.innerHTML = '';

        filteredJobs.forEach(job => {
          const jobListing = document.createElement('div');
          jobListing.className = 'job-listing';

          jobListing.innerHTML = `
            <img src="${job.logo}" alt="${job.company} Logo">
            <h3>${job.position}</h3>
            <p>${job.company} - ${job.location}</p>
            <p>${job.description}</p>
            <a href="${job.apply}">Apply Now</a>
          `;

          featuredJobs.appendChild(jobListing);
        });
      }, debounceDelay);
    };

    searchKeywordsInput.addEventListener('input', filterJobs);
    searchLocationInput.addEventListener('input', filterJobs);

    filterJobs();
  })
  .catch(error => console.error(error));

