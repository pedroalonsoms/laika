const fetchNeighborhoods = async () => {
  const zipCodeInput = document.getElementsByName("zipCode")[0];
  const dropdown = document.querySelector("select[name='neighborhood']");

  try {
    // Fetch data
    const response = await fetch(`/neighborhoods/${zipCodeInput.value}`);
    const data = await response.json();

    // Remove already fetched options if any
    const existingOptions = dropdown.querySelectorAll("option");
    for (option of existingOptions) {
      const value = option.getAttribute("value");
      if (value) option.remove();
    }

    for (neighborhood of data) {
      // Create new option for each neighborhood
      const option = document.createElement("option");
      option.setAttribute("value", neighborhood);
      option.innerHTML = neighborhood;

      // Append option to the dropdown menu
      dropdown.append(option);
    }
  } catch (e) {
    zipCodeInput.setCustomValidity("CP Inválido");
    zipCodeInput.reportValidity();
  }
};
