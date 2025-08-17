document.addEventListener("DOMContentLoaded", () => {

    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.dataset.value;
            const action = button.dataset.action;

            if (value) {
                display.value += value;
            }

            if (action === "clear") {
                display.value = "";
            }

            if (action === "delete") {
                display.value = display.value.slice(0, -1);
            }

            if (action === "calculate") {
                try {
                    display.value = Function("return " + display.value)();
                } catch {
                    display.value = "Error";
                }
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        const key = event.key;
        let button;

        if(!isNaN(key) || "+-/*.".includes(key)) {
            display.value += key;
            button = document.querySelector(`.btn[data-value="${key}"]`);
        }

        if(key === "Enter" || key === "=") {
            event.preventDefault();
            try {
                display.value = Function("return " + display.value)();
            } catch {
                display.value = "Error";
            }
            button = document.querySelector(`.btn[data-action="calculate"]`);
        }

        if(key === "Backspace") {
            display.value = display.value.slice(0,-1);
            button = document.querySelector(`.btn[data-action="delete"]`);
        }

        if(key === "Escape") {
            display.value = "";
            button = document.querySelector(`.btn[data-action="clear"]`);
        }

        if (button) {
            button.classList.add("active");
            setTimeout(() => button.classList.remove("active"),150);
        }
    })
});