let Yeelight = require('yeelight2');

function sleep(time) {
  time = time || 3000;
  return function (o) {
    return new Promise(fn => setTimeout(() => fn(o), time));
  };
}

//todo: recursively retry the call
function retryPromise(fn) {
  return Promise.resolve()
    .then(fn, retryPromise)
    .then(sleep())
    .then(light => {
      light.exit();
      console.log('Bye! have a nice day :)');
    });

}

function base(command) {
  Promise.resolve()
    .then(() => new Promise(accept => {
      Yeelight.discover(function (light) {
        this.close();
        accept(light);
      });
    }))
    .then(command)
    .then(sleep())
    .then(light => {
      light.exit();
      console.log('exit connection');
    });

}

let yeelight = {
  setUpTest: () => {

    Promise.resolve()
      .then(() => new Promise(accept => {
        Yeelight.discover(function (light) {
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

    // console.log(light);
  },


  turn_on: () => {
    base(light => {
      light.set_power('on')
        .then(response => console.log('turn on light succeed'));
      return light;
    });
  },

  turn_off: () => {
    base(light => {
      light.set_power('off')
        .then(response => console.log('turn off light succeed'));
      return light;
    });
  },

  toggle: () => {
    base(light => {
      light.toggle()
        .then(response => console.log('toggle succeed'));
      return light;
    });
  },

  max_red: () => {
    base(light => {
      light.set_ct_abx(2700, undefined, undefined)
        .then(response => console.log('set red to max value'));
      return light;
    });
  },

  max_green: () => {
    base(light => {
      light.set_ct_abx(6500, undefined, undefined)
        .then(response => console.log('set green to max value'));
      return light;
    });
  },

  percent_green: (percent) => {
    base(light => {
      // values should be between 2700 and 6500
      const ct_value = 2700 + (6500 - 2700) / 100 * percent;
      //const ct_value = 2700 + 38 * percent;
      light.set_ct_abx(ct_value, undefined, undefined)
        .then(response => console.log(`percent_green set to ${percent}`));
      return light;
    });
  },

  percent_red: (percent) => {
    this.percent_green(100 - percent);
  },

  set_brightness: (brightness) => {
    base(light => {
      light.set_bright(brightness, undefined, undefined)
        .then(response => console.log(`set_brightness to ${brightness}`));
      return light;
    });
  },
};

// setTimeout(test, 10000);
// yeelight.setUpTest();

// yeelight.turn_on();
// yeelight.turn_off();
// yeelight.max_green();
yeelight.max_red();

module.exports = yeelight;
