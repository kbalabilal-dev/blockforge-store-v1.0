tabButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Update active tab class
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
  
      const category = button.dataset.category;
  
      if (category === "All") {
        renderPackages(packages);
      } else {
        // Filter packages matching the clicked category
        const filtered = packages.filter(item => item.category === category);
        renderPackages(filtered);
      }
    });
  });