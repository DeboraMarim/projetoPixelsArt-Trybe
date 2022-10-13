window.onload = function() {

    // Declaraçoes
    
    const colorPalette = document.getElementById('color-palette');
    const gradePixel = document.getElementsByClassName('pixel');
    const clear = document.getElementById('clear-board');
    const grid = [];
    
    
    // Verificando existencia de paleta no localStorage
 
      function checkLocalStorage() {
        const colorPaletteLocalStorage = JSON.parse(localStorage.getItem('colorPalette'));
        if (colorPaletteLocalStorage !== null) {
          for (let i = 1; i < 4; i += 1) {
            const colorPaletteScreen = document.getElementById(`color-${i}`);
            colorPaletteScreen.style = `background-color : ${colorPaletteLocalStorage[i - 1]}`;
          }
        } else {
          createColorsRondon();
        }
      }
    //salvando e recuperando size-board

    let sizeboard;
    function checkboardSize() {
        const nBoardSize = JSON.parse(localStorage.getItem('boardSize'));
        if (nBoardSize == null) {
            sizeboard = 20;
            localStorage.setItem('boardSize', JSON.stringify(sizeboard));
            
        } else {
          sizeboard = nBoardSize;
        }
     return sizeboard;
    }


    
    //Salvando no localStorage
    
    function saveGridInLocalStorage() {
        const captureGrid = JSON.parse(localStorage.getItem('pixelBoard'));
        if (captureGrid === null) {
          for (let index = 0; index < gradePixel.length; index += 1) {
            grid.push(gradePixel[index].style.backgroundColor);
          }
          localStorage.setItem('pixelBoard', JSON.stringify(grid));
        } else {
          for (let index = 0; index < gradePixel.length; index += 1) {
            gradePixel[index].style.backgroundColor = captureGrid[index];
          }
        }
      }
    function saveInLocalStorage() {
        grid.length = 0;
        for (let index = 0; index < gradePixel.length; index += 1) {
          grid.push(gradePixel[index].style.backgroundColor);
        }
        localStorage.setItem('pixelBoard', JSON.stringify(grid));
    }


    //pintando inicialmente
      function paintPixel() {
        for (let i = 0; i < gradePixel.length; i += 1) {
          gradePixel[i].addEventListener('click', (event) => {
              event.target.style.backgroundColor = document
              .querySelector('.selected').style.backgroundColor;
          saveInLocalStorage();
          });
        }
      }
      
    // Funcão para gerar cores aleatorias
    function createColors() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let index = 0; index < 3; index += 1) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color;
      }
      
    // Implementação do botão randomico
    
    function createColorsRondon() {
      const colors = [0];
      for (let i = 0; i < 3; i += 1) {
        const aux = document.getElementById(`color-${i + 1}`);
        const color = createColors();
        aux.style.background = color;
        colors[i] = color;
        localStorage.setItem('colorPalette', JSON.stringify(colors));
      }
    }
    document.getElementById('button-random-color').addEventListener('click', (event) => {
        event.preventDefault();
  
  
        createColorsRondon();


      });


    // Criando grade de pixels
    function createGrid(n) {
        n = checkboardSize();
        let grade = document.querySelector('#pixel-board');
        for (let index = 0; index < n * n; index += 1) {
            newBlock = document.createElement('div')
            newBlock.className = 'pixel';
            newBlock.style.background = 'white';
            grade.appendChild(newBlock);
            saveGridInLocalStorage();
        }
        grade.style.width = ` ${n * 10}px`;
      }
    
    //Selecionando uma cor da paleta
      
    function selectedColor() {
        colorPalette.addEventListener('click', function(event){
          const selectedColor = document.querySelector('.selected');
          selectedColor.classList.remove('selected');
          event.target.classList.add('selected');
        });
      }
      
    // Função para limpar a grade
     
    function clearGrid() {
        clear.addEventListener('click', function(){
          for (let index = 0; index < gradePixel.length; index += 1) {
            gradePixel[index].style.backgroundColor = 'white';
            saveInLocalStorage()
          }
        });
      }
    function clearNGrid() {
          for (let index = 0; index < gradePixel.length; index += 1) {
            gradePixel[index].style.backgroundColor = 'white';
            saveInLocalStorage()
          }
      };


    //************************************************************** */
    //                trabalhando com input e size of board
    
    //capturando o valor do input
    
    
    const input = document.querySelector("#board-size");
    const getInputValue = () => {
        const { value } = document.getElementById('board-size');
         if (!value) {
          return false;
         }
        return value;
    };
    
    const resetBoard = () => {
        document.getElementById('pixel-board').innerHTML = '';
      };
    
    //implementando o botão VQV - botão que ao ser clicado,
    //gera uma nova grade de pixels
    
    const vqv = document.getElementById('generate-board');
    
    function buttonVQV() {
        vqv.addEventListener('click', function(){
        
  

            const value = getInputValue();
            if (!value) {
              return alert('Board inválido!');
            }

            if(input.value < 5){
              input.value = 5;  
            }
           if(input.value > 50){
                input.value = 50;
            }

            clearNGrid();
            resetBoard(); 
            localStorage.setItem('boardSize', input.value);
            createGrid(input.value);
            paintPixel(); 
            saveGridInLocalStorage();
            
          })
    };

    //************************************************************** */
    
    // Chamada das funçoes
    checkLocalStorage()
    createGrid(sizeboard);
    paintPixel();
    selectedColor();
    clearGrid();
    saveGridInLocalStorage();
    buttonVQV();
   }
