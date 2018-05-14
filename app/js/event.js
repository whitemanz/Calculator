var btn = document.getElementsByClassName('btn'), // кнопки значений
    act = document.getElementsByClassName('act'), // кнопка операции (+ - * / =)
    screen = document.getElementById('screen'), // Экран калькулятора
    reset = document.getElementById('reset'), // кнопка обнеления (С)
    curent = '', // текущее значение экрана
    value = [], // массив чисел с экрана
    operations = [], // массив значений операций над числами
    result = [], // рузультат пошаговых операций
    res, count = 0; // результат операции равно

  // Блок обработчика числовых значений калькулятора ( кнопки: 1,2,3,4,5,6,7,8,9,0,С,.) - START
  for (var i = 0; i < btn.length; i++) {
    //console.log( btn[i].innerText ); // выводим текстовое содержимое элементов с классом .btn

    btn[i].onclick = function() { // вешаем обработчик на каждый элемент с классом .btn
// проверка на 0 и точку
if( (this.innerText == '.') && ( screen.innerText == '0') ) { // проверка на 0 + (.)
          curent = 0; // текущее значение экрана
        }
// проверка на 00
if( double_zero(screen.innerText,this.innerText) )  { // проверка на 00
  curent = '';
}
// проверка на вторую точку
if( (this.innerText == '.') && ( dot(screen.innerText) >= 1) ) { // проверка на 2-е вхождение (.)
  if(screen.innerText.length < 8) {            
            screen.innerText = curent; // запись в экран текущего значения без последнего символа
          }  
        } else {
          if(screen.innerText.length < 8) {
                    curent += this.innerText; // текущее значение с последний символом
                    screen.innerText = curent; // запись в экран текущего значения + последннее число
                    //console.log(screen.innerText);
                  }
                }
      } // btn.onclick
  }  // Блок обработчика числовых значений калькулятора ( кнопки: 1,2,3,4,5,6,7,8,9,0,С,.) - END

  // Блок обработчик актов (операций над числами: / * - + =) - START
  for (var i = 0; i < act.length; i++) {
    act[i].onclick = function() { // вешаем обработчик на каждый элемент с классом .act

      value.push(screen.innerText);
      operations.push(this.innerText);

      console.log(value);
      console.log(operations);

// вызов методов Calc (+, -, *, /) для цепочки вызовов. ( x + y + z ...) - START
switch ( operations[operations.length -1] ) {
  case '+':
  screen.innerText +='+'; // инициализация Calc.default для (+)
  result.push( calc.plus(value[value.length - 1]).values );
  break;
  case '−':
  console.log(calc.default);
  if(value.length == 1) { calc.default = screen.innerText * 2}; // инициализация Calc.default для (-)
  result.push( calc.minus(value[value.length - 1]).values );
  console.log(calc.default);
  break;
  case '÷':
  if(value.length == 1) { calc.default = Math.pow( screen.innerText,2 )}; // инициализация Calc.default для (÷)
  result.push( calc.del(value[value.length - 1]).values );
  break;
  case '×':
  if(value.length == 1) { calc.default = 1 }; // инициализация Calc.default для (×)
  result.push( calc.multi(value[value.length - 1]).values );
  break;
  case '=':
  console.log(calc.default, value,'',result);

              // вызов методов Calc (+, -, *, /) для операции (=) - START
              switch ( operations[operations.length -2] ) {
                case '+':                  
                result.push( calc.plus(value[value.length - 1]).values );                  
                break;
                case '−':
                result.push( calc.minus(value[value.length - 1]).values );
                break;
                case '÷':
                result.push( calc.del(value[value.length - 1]).values );
                break;
                case '×':
                result.push( calc.multi(value[value.length - 1]).values );
                break;
              }
              // (=) - END
              res = result[result.length-1]; // переопределяем результат
              count++;
              console.log('Итого: ', res, 'count:', count);

              break;
              default:
              console.log( 'Я таких значений не знаю', operations[operations.length - 1] );
} // ( x + y + z ...) - END
console.log(result);
if (count == 1){
  zero_screen();
  screen.innerText = res;
  count = 0;
  zero_state(); } else { zero_screen() };
  } // act.onclick - END
} // Блок обработчик актов (операций над числами: / * - + =) - END

  reset.onclick = function() { // обработчик на кнопку (С) обнуление экрана
    zero_screen(); // вызов функции обнуления экрана
    zero_state(); //  вызов функции обнуления состояния калькулятора
  }

  function zero_screen(){ // функция обнуления
   curent = ''; // пустое значение теукщего состояния экрана
    screen.innerText = '0'; // вывод экрана
  }
  function zero_state(){ // функция обнуления
    calc.zero(); // обнуление calc.default класса Calc (значения калькулятора по умолчанию - 0)
    result = []; // ..массива результатов
    value = []; // ..массива значений
    operations = []; // ..массива операций
  }
  function dot(str){ // определение вхождений символа (.) в строке
    var pos = -1, col=0;
    while ((pos = str.indexOf('.', pos + 1)) != -1) {
     ++col;
   }
   return col;
 }
function double_zero(str,e){ // определение комбинаций символа (0) в строке
  if((str[0] == '0') && (e == '0') && (str.length == 1) || ((str[0] == '0') && (e != '.') && (str.length == 1)) ){
    return true;
  }
  else return false;
}