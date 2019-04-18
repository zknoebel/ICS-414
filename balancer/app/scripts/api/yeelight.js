const Yeelight = require('yeelight2');

Yeelight.discover(function(light){

  console.log(light.name);

  function flip(){
    light.toggle();
  }

  function turn_on(){
    light.set_power(true, undefined, undefined);
  }

  function turn_off() {
    light.set_power(false, undefined, undefined);
  }

  function max_red(){
    light.set_bright(100, undefined, undefined);
    light.set_ct_abx(2700, undefined, undefined);
  }

  function max_green(){
    light.set_bright(100, undefined, undefined);
    light.set_ct_abx(6500, undefined, undefined);
  }

  function percent_red(percent) {
    percent_green(100 - percent);
  }

  function percent_green(percent) {
    // values should be between 2700 and 6500
    const ct_value = 2700 + (6500 - 2700) / 100 * percent;
    //const ct_value = 2700 + 38 * percent;
    light.set_ct_abx(ct_value, undefined, undefined);
  }


  turn_on();
  percent_red(100);
  // percent_red(50);
  // percent_red(0);

  //setInterval(blink, 2000);

});
