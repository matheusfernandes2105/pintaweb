document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d")

    const inputColor = document.querySelector(".input__color")
    const tools = document.querySelectorAll(".button__tool")
    const sizeButtons = document.querySelectorAll(".button__size")
    const buttonClear = document.querySelector(".button__clear")

    let brushSize = 20
    let isPainting = false
    let activeTool = "brush"

    canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
        isPainting = true
        activeTool === "brush" ? draw(clientX, clientY) : erase(clientX, clientY);
    });

    canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
        if (isPainting) {
            activeTool === "brush" ? draw(clientX, clientY) : erase(clientX, clientY);
        }
    });

    canvas.addEventListener("mouseup", () => {
        isPainting = false
    });

    tools.forEach(tool => tool.addEventListener("click", selectTool));
    sizeButtons.forEach(button => button.addEventListener("click", selectSize));
    buttonClear.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

    inputColor.addEventListener("change", ({ target }) => {
        ctx.fillStyle = target.value
    });

    const draw = (x, y) => {
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    const erase = (x, y) => {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    function selectTool({ target }) {
        const selectedTool = target.closest("button")
        const action = selectedTool.getAttribute("data-action")

        if (action) {
            tools.forEach((tool) => tool.classList.remove("active"))
            selectedTool.classList.add("active")
            activeTool = action
        }
    }

    function selectSize({ target }) {
        const selectedTool = target.closest("button")
        const size = selectedTool.getAttribute("data-size")

        sizeButtons.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        brushSize = size
    }

    const toolBox = document.querySelector('.container > div > div > section:last-child');

    const generateButton = document.createElement('button');
    generateButton.classList.add('button__tool', 'button__generate');
    generateButton.innerHTML = 'Gerar Tema';
    generateButton.style.padding = '10px 20px';
    generateButton.onclick = gerarTema;

    toolBox.appendChild(generateButton);

    function gerarTema() {
        const temas = [
            "Montanha", "Floresta", "Cidade", "Espaço", "Castelo",
            "Praia", "Jardim", "Submarino", "Naufrágio", "Planeta",
            "Festa", "Robô", "Caverna", "Vulcão", "Estação",
            "Base", "Fazenda", "Zoológico", "Ruínas", "Exploração",
            "Terra", "Estádio", "Fábrica", "Parque", "Casa",
            "Deserto", "Mar", "Lua", "Sol", "Ruas"
        ];

        const indice = Math.floor(Math.random() * temas.length);
        const temaSelecionado = temas[indice];
        alert("Tema para desenho: " + temaSelecionado);
    }


});
