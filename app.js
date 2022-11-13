
// UI Variables
const form = document.querySelector("#project-form");
const projectList = document.querySelector('ul.collection');
const clearButton = document.querySelector('.clear-projects');
const filterInput = document.querySelector('#filter');
const projectInput = document.querySelector('#project');

loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getProjects);
  
  // Add project event
  form.addEventListener('submit', addproject);

  // Remove project event
  projectList.addEventListener('click', removeProject);

  // Clear projects event
  clearButton.addEventListener('click', clearProjects);

  // Filter projects event
  filterInput.addEventListener('keyup', filterProjects);
}

function getProjects() {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];    
  } else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
  
  projects.forEach(function(projectName) {
    const li = document.createElement('li');
    li.className = 'collection-item list-group-item';
    li.appendChild(document.createTextNode(projectName));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    projectList.appendChild(li);
  });

}

function filterProjects(e) {
  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(project) {
    const itemText = project.firstChild.textContent;
    if (itemText.toLowerCase().indexOf(filterText) != -1) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });

}

function clearProjects(e) {
  // projectList.innerHTML = '';

  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }

  clearProjectsFromLocalStorage();
}

function clearProjectsFromLocalStorage() {
  localStorage.clear();
}

function removeProject(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      removeProjectFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeProjectFromLocalStorage(projectItem) {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];    
  } else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }

  projects.forEach(function(projectName, index) {
    if (projectItem.textContent === projectName)  {
      projects.splice(index, 1);
    }
  });

  localStorage.setItem('projects', JSON.stringify(projects));

}

function addproject(e) {
    if(projectInput.value === '') {
      
    alert("are u sure ");
    e.preventDefault();    
}
  else{
  
  
    const li = document.createElement('li');
    li.className = 'collection-item list-group-item';
    li.appendChild(document.createTextNode(projectInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    projectList.appendChild(li);
  
    storeProjectInLocalStorage(projectInput.value);
    projectInput.value = '';
    e.preventDefault();  
}
    e.preventDefault();
  
    
  }

function storeProjectInLocalStorage(projectName) {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];    
  } else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }

  projects.push(projectName);
  localStorage.setItem('projects', JSON.stringify(projects));
}
