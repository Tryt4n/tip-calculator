const billInput = document.querySelector("[data-bill-input]");
const peopleInput = document.querySelector("[data-people-input]");
const inputs = [billInput, peopleInput];
const peopleContainer = document.querySelector(`[data-input-container="people"]`);
const containers = document.querySelectorAll("[data-input-container]");
const tipButtons = document.querySelectorAll("[data-tip-btn]");
const tipCustom = document.querySelector("[data-tip-custom]");
const tipAmount = document.querySelector("[data-tip-amount]");
const totalPerson = document.querySelector("[data-total-person]");
const btnReset = document.querySelector("[data-btn-reset]");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    containers.forEach((container) => {
      if (input.name == container.dataset.inputContainer) {
        container.classList.add("active");
      }
    });
  });
});

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    containers.forEach((container) => {
      if (input.name == container.dataset.inputContainer) {
        container.classList.remove("active");
      }
    });

    if (peopleInput.value === "") {
      peopleContainer.classList.add("incorrect");
    }
  });
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn != tipCustom) {
      tipButtons.forEach((btn) => btn.classList.remove("btn--active"));
      btn.classList.add("btn--active");
      tipCustom.classList.remove("active");
    }

    if (btn == tipCustom) {
      tipButtons.forEach((btn) => btn.classList.remove("btn--active"));
      btn.classList.add("active");
    }

    calculateTip();
  });
});

peopleInput.addEventListener("input", function () {
  if (peopleContainer.classList.contains("incorrect")) {
    peopleContainer.classList.remove("incorrect");
  }

  this.value = this.value.replace(/[^\d]/g, "");
  if (peopleInput.value.length > 2) {
    this.value = this.value.substring(0, 2);
  }

  if (peopleInput.value !== "") {
    peopleContainer.classList.remove("incorrect");
  }

  calculateTip();
});

billInput.addEventListener("input", function () {
  if (this.value.includes(".") || this.value.includes(",")) {
    if (this.value.length > 7) {
      this.value = this.value.substring(0, 7);
    }

    if (
      this.value.indexOf(".") !== this.value.lastIndexOf(".") ||
      this.value.indexOf(",") !== this.value.lastIndexOf(",")
    ) {
      this.value = this.value.substring(0, this.value.length - 1);
    }

    let decimalPos =
      this.value.indexOf(".") !== -1 ? this.value.indexOf(".") : this.value.indexOf(",");
    if (this.value.length - decimalPos > 3) {
      this.value = this.value.substring(0, decimalPos + 3);
    }
  } else {
    if (this.value.length > 5) {
      this.value = this.value.substring(0, 5);
    }
  }

  calculateTip();
});

tipCustom.addEventListener("input", function () {
  this.value = this.value.replace(/[^\d]/g, "");
  if (this.value !== "") {
    this.value += "%";
  } else {
    this.value = "";
  }
  this.selectionStart = this.value.length - 1;
  this.selectionEnd = this.value.length - 1;

  const tipValue = parseInt(this.value, 10);
  tipCustom.dataset.tipBtn = isNaN(tipValue) ? 0 : tipValue;

  calculateTip();
});

// Calculations
function calculateTip() {
  const activeTipBtn = document.querySelector('[data-tip-btn][class="btn btn--dark btn--active"]');
  const activeCustomBtn = document.querySelector("[data-tip-btn][data-tip-custom]");

  if (billInput.value && peopleInput.value) {
    totalPerson.textContent =
      "$" + ((billInput.value * `1.${activeTipBtn.dataset.tipBtn}`) / peopleInput.value).toFixed(2);

    tipAmount.textContent =
      "$" + ((billInput.value * `0.${activeTipBtn.dataset.tipBtn}`) / peopleInput.value).toFixed(2);
  }
}

btnReset.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  tipCustom.value = "";
  tipAmount.textContent = "$0.00";
  totalPerson.textContent = "$0.00";
});
