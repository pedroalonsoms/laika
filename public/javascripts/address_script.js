const zipCodeInput = document.getElementById("Código Postal");

if (zipCodeInput) zipCodeInput.oninput = (e) => e.target.setCustomValidity("");

const removeOptionsFrom = (dropdown) => {
  // Remove already fetched options if any
  const existingOptions = dropdown.querySelectorAll("option");
  for (const option of existingOptions) {
    const value = option.getAttribute("value");
    if (value) option.remove();
  }
};

const addOptionsTo = (dropdown, optionNames) => {
  for (const optionName of optionNames) {
    // Create new option for each neighborhood
    const option = document.createElement("option");
    option.setAttribute("value", optionName);
    option.innerHTML = optionName;

    // Append option to the dropdown menu
    dropdown.append(option);
  }
};

const fetchNeighborhoods = async () => {
  let data = null;
  try {
    // Fetch data
    const response = await fetch(`/neighborhoods/${zipCodeInput.value}`);
    if (!response.ok) throw new Error();
    data = await response.json();
  } catch (e) {
    console.log(e);
    zipCodeInput.setCustomValidity("CP Inválido");
    zipCodeInput.reportValidity();
  }

  // Update dropdown
  const dropdown = document.getElementById("Colonia");
  removeOptionsFrom(dropdown);
  if (data) addOptionsTo(dropdown, data);
};
