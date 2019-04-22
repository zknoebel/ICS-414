class sYeelight {
  constructor() {
    this.yeelight = require('yeelight2');

    this.light = this.yeelight.discover(function (light) {

        console.log(light.name);
        light.set_power(false, undefined, undefined);
      });
  }

  turn_on() {
    this.light.set_power(true, undefined, undefined);
  }

  turn_off() {
    this.light.set_power(false, undefined, undefined);
  }

  flip(light) {
    light.toggle();
  }

  max_red(light) {
    light.set_ct_abx(2700, undefined, undefined);
  }

  max_green(light) {
    light.set_ct_abx(6500, undefined, undefined);
  }

  percent_green(light, percent) {
    // values should be between 2700 and 6500
    const ct_value = 2700 + (6500 - 2700) / 100 * percent;
    //const ct_value = 2700 + 38 * percent;
    light.set_ct_abx(ct_value, undefined, undefined);
  }

  percent_red(light, percent) {
    percent_green(100 - percent);
  }

  set_brightness(brightness) {
    light.set_bright(brightness, undefined, undefined);
  }
}

// yeelight = new Yeelight();
// test = function() {
//  console.log(yeelight);
// };
//
// setTimeout(test, 10000);

let Yeelight = require('yeelight2');


function sleep(time){
  time = time || 3000;
  return function(o){
    return new Promise(fn => setTimeout(() => fn(o), time));
  };
}

Promise.resolve()
  .then(() => new Promise(accept => {
    Yeelight.discover(function(light){
      this.close();
      accept(light);
    });
  }))
  .then(light => {
    light // get name
      .get_prop('name')
      .then(response => console.log('Your bulb name is: [%s]', response.name))
    return light;
  })
  .then(light => {
    light // turn on light
      .set_power('on')
      .then(response => console.log('turn on light succeed'))
    return light;
  })
  .then(light => {
    light // set color to white
      .set_rgb(0xffffff)
      .then(response => console.log('set color to white(0xffffff) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set brightness to 30%
      .set_bright(30)
      .then(response => console.log('set brightness to 30% succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light
      .toggle()
      .then(response => console.log('toggle succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light
      .toggle()
      .then(response => console.log('toggle succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set brightness to 100%
      .set_bright(100)
      .then(response => console.log('set brightness to 100% succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set color to red
      .set_rgb(0xff0000)
      .then(response => console.log('set color to red(0xff0000) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set color to green
      .set_rgb(0x00ff00)
      .then(response => console.log('set color to green(0x00ff00) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set color to blue
      .set_rgb(0x0000ff)
      .then(response => console.log('set color to blue(0x0000ff) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // turn off light
      .set_power('off')
      .then(response => console.log('turn off light succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light.exit();
    console.log('Bye! have a nice day :)');
  });

Promise.resolve()
  .then(() => new Promise(accept => {
    Yeelight.discover(function(light){
      this.close();
      accept(light);
    });
  }))
  .then(light => {
    light // get name
      .get_prop('name')
      .then(response => console.log('Your bulb name is: [%s]', response.name))
    return light;
  })
  .then(light => {
    light // turn on light
      .set_power('on')
      .then(response => console.log('turn on light succeed'))
    return light;
  })
  .then(light => {
    light // set color to white
      .set_rgb(0xffffff)
      .then(response => console.log('set color to white(0xffffff) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set brightness to 30%
      .set_bright(30)
      .then(response => console.log('set brightness to 30% succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light
      .toggle()
      .then(response => console.log('toggle succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light
      .toggle()
      .then(response => console.log('toggle succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set brightness to 100%
      .set_bright(100)
      .then(response => console.log('set brightness to 100% succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set color to red
      .set_rgb(0xff0000)
      .then(response => console.log('set color to red(0xff0000) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set color to green
      .set_rgb(0x00ff00)
      .then(response => console.log('set color to green(0x00ff00) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // set color to blue
      .set_rgb(0x0000ff)
      .then(response => console.log('set color to blue(0x0000ff) succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light // turn off light
      .set_power('off')
      .then(response => console.log('turn off light succeed'))
    return light;
  })
  .then(sleep())
  .then(light => {
    light.exit();
    console.log('Bye! have a nice day :)');
  });
