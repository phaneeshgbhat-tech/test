
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('button');

  let currentInput = '';
  let resetNext = false;

  function updateDisplay(value) {
    display.value = value || '0';
    // Auto-scroll to the right so latest input is visible
    display.scrollLeft = display.scrollWidth;
  }

  function handleInput(value) {
    if (value === 'C') {
      currentInput = '';
      updateDisplay('0');
    } 
    else if (value === '=') {
      try {
        const expression = currentInput
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/−/g, '-')
          .replace(/\^/g, '**');

        currentInput = eval(expression).toString();
        updateDisplay(currentInput);
        resetNext = true;
      } catch {
        updateDisplay('Error');
        currentInput = '';
      }
    } 
    else {
      if (resetNext) {
        currentInput = '';
        resetNext = false;
      }
      currentInput += value;
      updateDisplay(currentInput);
    }
  }

  // Button clicks
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      handleInput(button.textContent);
    });
  });

  // Keyboard support
  document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
      handleInput(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
      handleInput(key);
    } else if (key === 'Enter') {
      handleInput('=');
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (key.toUpperCase() === 'C') {
      handleInput('C');
    }
  });
