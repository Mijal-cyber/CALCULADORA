let currentInput = "";

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

function updateDisplay() {
  expressionDisplay.innerText = currentInput;
}

function appendValue(value) {
  currentInput += value;
  updateDisplay();
}

function appendFunction(fn) {
  currentInput += fn;
  updateDisplay();
}

function appendFraction() {
  currentInput += "/";
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  expressionDisplay.innerText = "";
  resultDisplay.innerText = "0";
}

function deleteChar() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    let parsedInput = currentInput;
    
    // Convertir cos(x) de grados a radianes para la evaluación
    parsedInput = parsedInput.replace(/cos\(([^)]+)\)/g, (match, angle) => {
      const rad = (parseFloat(angle) * Math.PI) / 180;
      return Math.cos(rad);
    });

    const evaluatedResult = Function(`'use strict'; return (${parsedInput})`)();
    
    resultDisplay.innerText = Number.isInteger(evaluatedResult) 
      ? evaluatedResult 
      : parseFloat(evaluatedResult.toFixed(6));
  } catch (error) {
    resultDisplay.innerText = "Error";
  }
}
