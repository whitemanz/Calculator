class Calc { // Создание класса Calc
  // Конструктор класса
  constructor() { // Задаём исходное состояние значения калькулятора: 0
    this.default = 0;
  }
// Вспомогательные методы - START
get values(){ // Вывод значения текущей операции
  return this.default;
}
zero() { // Обнуление результата калькулятора
 this.default = 0;
 return this;
}
pow_a(a){ // Возведение в степень числа a
  var a_cf = Math.pow(10,a.toString().split('.')[1].length);
  return a_cf;
}
pow_b(b){ // Возведение в степень числа b
  var b_cf = Math.pow(10,b.toString().split('.')[1].length);
  return b_cf;
}
drob_part(x){ // Определение дробного числа
  return ( (Math.round(x) - x ) != 0 ) ? true : false;
}
isNum(a){ // проверка аргумента на Число
  return ( isFinite(a) && !isNaN(a) ) ? true : false;
}
screen_resol(){ // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов).
  (this.default.toString().length > 8 ) ? this.default = parseFloat((this.default).toPrecision(8)) : true;
}
// Вспомогательные методы - END

// Основные методы вычисления арифметических операций - START
plus(a) { // * Метод сложения двух чисел *
  if( this.isNum(a) ) { // проверка на Число
  if ( (this.drob_part(a) ) && (this.drob_part(this.default))) { // проверка на дробность числа
      this.default = this.plus_fraction(this.default,a) // сложение двух дробных чисел
      return this;
    } else { // сложение двух целых чисел
      this.default = this.default + (+a);
        this.screen_resol(); // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов).
        return this;  
      }
    } else {
      console.log( a,'- is not number',' | add only numbers' );
      return this;
    }    
  }
minus(a) { // * Метод вычитания двух чисел *
  if( this.isNum(a) ) { // проверка на Число
    if ((this.drob_part(a) == true) || (this.drob_part(this.default) == true)) { // проверка на дробность числа
    this.default = this.minus_fraction(this.default,a) // вычитание двух дробных чисел
    return this;
  } else {
    this.default = this.default - a; // Вычитание двух целых чисел
      this.screen_resol(); // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов).
      return this;
    }
  } else {
    console.log( a,'- is not number',' | add only numbers' );
    return this;
  }   
}
del(a) { // * Метод деления двух чисел *
  if( this.isNum(a) ) { // проверка на Число
    if (a !=0 ){ // проверка деления на Ноль (0)
    this.default = this.default / a; // деление двух целых чисел
     this.screen_resol(); // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов).
     return this;
   } else {
      console.log( this.default,'- нельзя делить на ',a,' | division by zero' ); // вывод сообщения об ошибке деления на Ноль(0)
      return this;
    }
  } else {
    console.log(a,'- is not number',' | add only numbers' );
    return this;
  }  
}
multi(a) { // * Метод умножения двух чисел *
  if( this.isNum(a) ) { // проверка на Число
    if ((this.drob_part(a) == true) && (this.drob_part(this.default) == true)) { // проверка на дробность числа
    this.default = this.multi_fraction(this.default,a) // умножение двух дробных чисел
    return this;
  } else {
    this.default = this.default * a; // умножение двух целых чисел
      this.screen_resol(); // Проверяем разрядность результата дла Экрана калькулятора ( 8-разрядов).
      return this;  
    }
  } else {
    console.log(a,'- is not number',' | add only numbers' );
    return this;
  }  
}
multi_fraction(a,b){ // * Метод умножения дробных чисел *
  this.default = Math.round(a * this.pow_a(a)) * Math.round(b * this.pow_b(b)) / (this.pow_a(a) * this.pow_b(b));
   this.screen_resol(); // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов).
   return this.default;
 }
plus_fraction(a,b){ // * Метод сложения дробных чисел *
  var max_cf = (this.pow_a(a) >= this.pow_b(b)) ? max_cf = this.pow_a(a) : max_cf = this.pow_b(a);  
  this.default = (Math.round(a * max_cf) + Math.round(b * max_cf)) / (max_cf);
     this.screen_resol(); // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов). 
     return this.default;
   }
minus_fraction(a,b){ // * Метод вычитания дробных чисел *
  var a_cf, b_cf, max_cf;
  if(!this.drob_part(a)) { a+='.0';};
  if(!this.drob_part(b)) { b+='.0';};
  max_cf = (this.pow_a(a) >= this.pow_b(b)) ? max_cf = this.pow_a(a) : max_cf = this.pow_b(b);
  this.default = (Math.round(a * max_cf) - Math.round(b * max_cf)) / (max_cf);
           this.screen_resol(); // Проверяем разрядность результата для Экрана калькулятора ( 8-разрядов).
           return this.default;
         }
// Основные методы вычисления арифметических операций - END
} // end Class Calc

let calc = new Calc(); // new Object calc by Class: Calc
/*
// операции с целыми числами
calc.plus('10a').plus(17).plus(3).plus('1a').values; // 20

calc.multi('2a').multi(3).multi(4).multi('5').values; // 1200

calc.del(0).del('1a').del(4).del(3).del(0).values; // 100

calc.minus('5a').minus(11).minus(false).minus(true).minus(1).values; // 87

// мультиоперация
calc.plus(10.005).multi(5.5).del(2).minus('4a').values; // 266.76375 (значение на 8 разрядов для чисел + точка)

calc.zero().values; //0

// сложение отрицательных чисел
calc.plus(-'10').plus(-17+(-8)).plus(-(-3)).plus('-1').values; // -33

calc.zero().values; //0

// операции с дробными числами
calc.plus(0.01).plus(5.1).values; // 5.11

calc.multi(2).multi(0.5).values; // 5.11

calc.minus(3).minus(0.01).values; // 2.1

calc.plus(7.9).plus(5.9).values; // 15.9

calc.del(2).del(0.01).del(0.1).del(2.8).values; // 2839.2857 (значение на 8 разрядов для чисел + точка)

calc.zero().values; // 0

// операции с большими дробными числами
calc.plus(0.0001).plus(555.0009).values; // 555.001

calc.multi(22.7).multi(0.277).values; // 3489.7909

calc.minus(3377.009).minus(99.01).values; // 13.7719

calc.plus(123456789.9).plus(0.987654321).values; // 123456800

calc.del(2.0002).del(3.003).del(4.01).del(5.1).values; // 1005013.1

calc.zero().values; // 0
*/

