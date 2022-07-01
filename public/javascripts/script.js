const ids = ["neighborhoods", "municipality", "state", "country"];

const removeOptionsFrom = (dropdown) => {
  // Remove already fetched options if any
  const existingOptions = dropdown.querySelectorAll("option");
  for (option of existingOptions) {
    const value = option.getAttribute("value");
    if (value) option.remove();
  }
};

const addOptionsTo = (dropdown, optionNames) => {
  for (optionName of optionNames) {
    // Create new option for each neighborhood
    const option = document.createElement("option");
    option.setAttribute("value", optionName);
    option.innerHTML = optionName;

    // Append option to the dropdown menu
    dropdown.append(option);
  }
};

const updateAllDropdowns = (data) => {
  // Iterate through every dropdown
  for (id of ids) {
    const dropdown = document.getElementById(id);
    removeOptionsFrom(dropdown);
    if (!data) continue;
    addOptionsTo(dropdown, data[id] instanceof Array ? data[id] : [data[id]]);
  }
};

const fetchZipCodeInfo = async () => {
  const zipCodeInput = document.getElementById("zipCode");

  let data = null;
  try {
    // Fetch data
    const response = await fetch(`/zipcode/${zipCodeInput.value}`);
    data = await response.json();
    if (!response.ok) throw new Error();
  } catch (e) {
    console.log(e);
    zipCodeInput.setCustomValidity("CP Inválido");
    zipCodeInput.reportValidity();
  }
  updateAllDropdowns(data);
};
