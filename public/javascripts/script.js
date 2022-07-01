const fetchNeighborhoods = async () => {
  const zipCodeInput = document.getElementById("zipCode");
  const dropdown = document.getElementById("neighborhood");

  try {
    // Fetch data
    const response = await fetch(`/zipcode/${zipCodeInput.value}`);
    const data = await response.json();
    if (!response.ok) throw new Error();

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
