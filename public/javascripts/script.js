const fetchNeighborhoods = async (includes_all_field) => {
  const form = document.querySelector("form");
  const isValid = form.reportValidity();
  if (!isValid) return;

  // Remove ok button
  document.getElementById("ok").remove();

  // Disable zipCode input
  const zipCodeInput = document.getElementsByName("zipCode")[0];
  zipCodeInput.setAttribute("disabled", "");

  // Fetch data
  try {
    const response = await fetch(`/neighborhoods/${zipCodeInput.value}`);
    const data = await response.json();

    let tmp = document.createElement("div");
    tmp.innerHTML = `
    Colonia
    <select name="neighborhood">
        ${includes_all_field && `<option value="">Todas</option>`}
        ${data.map(
          (neighborhood) =>
            `<option value="${neighborhood}">${neighborhood}</option>`
        )}
    </select>`;

    document.getElementById("address").append(tmp);
  } catch (e) {
    console.log(e.message);
  }
};
