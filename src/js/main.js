const mainContent = document.querySelector('#content_wrapper');
const leftControl = document.querySelector('.left_control');

leftControl.addEventListener('click', toggleSideBar);

function toggleSideBar(e) {
  mainContent.classList.toggle('hidden');
}

function Ninja() {
  let skillLevel = null;

  this.getSkillLevel = () => {
    console.log("Get skill level value");
    return skillLevel
  };

  this.setSkillLevel = value => {
    console.log("Modifying skillLevel property from:", skillLevel, "to:", value);
    skillLevel = value;
    return skillLevel;
  }
} 

function Ninja1() {
  let _skillLevel = 0;

  Object.defineProperty(this, 'skillLevel', {
    get: () => {
      console.log('Getting skillLevel');
      return _skillLevel;
    },
    set: (value) => {
      if (!Number(value)) {
        console.log('Value is not a integer Number');
        throw new TypeError("skillLevel should be a number")
      } else if (_skillLevel !== value) {
        console.log('The skillLevel is changed');
        console.log('skill level value is changed from:', _skillLevel, 'to:', value);
      } 
      _skillLevel = value;
    }
  })
}

const ninja = new Ninja1();
console.log(ninja._skillLevel);
console.log(ninja.skillLevel);
ninja.skillLevel = 2.7;
console.log(ninja.skillLevel);

const shogum = {
  name: 'Yoshiaki',
  clan: 'Ashiaga',
  get fullTitle() {
    return this.name + ' ' + this.clan;
  },
  set fullTitle(value) {
    const segments = value.split(' ');
    this.name = segments[0];
    this.clan = segments[1];
  }
}

console.log(shogum.fullTitle)
shogum.fullTitle = 'Btodian jimmy';
console.log(shogum.fullTitle)

const emeror = { name: 'Lomei'};
const representative = new Proxy(emeror, {
  get: (target, key) => {
    console.log('Reading ' + key + " through a proxy");
    return key in target ? target[key] : 'Don\'t bother the emeror';
  },
  set: (target, key, value) => {
    console.log("Writing " + key + " through a proxy");
    target[key] = value;
  }
})

console.log(representative.name)
console.log(representative.age);