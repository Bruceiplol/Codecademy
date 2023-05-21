const getSleepHours = day => {
  switch (day) {
    case 'monday':
      return 8;
    case 'tuesday':
      return 7;
    case 'wednesday':
      return 6;
    case 'thursday':
      return 5;
    case 'friday':
      return 6;
    case 'sataurday':
      return 7;
    case 'sunday':
      return 8;
    default:
      'Error!';
  }
};

//console.log(getSleepHours('sunday'))

const getActualSleepHours = () => {
  return getSleepHours('monday') + getSleepHours('tuesday') + getSleepHours('wednesday') + getSleepHours('thursday') + getSleepHours('friday') + getSleepHours('sataurday') + getSleepHours('sunday');
}


const getIdealSleepHours  = idealHours => idealHours * 7;


//console.log(getActualSleepHours());
//console.log(getIdealSleepHours());

const calculateSleepDebt = () => {
  const actualSleepHours = getActualSleepHours();
  const idealSleepHours = getIdealSleepHours(8);
  if (actualSleepHours === idealSleepHours) {
    console.log('You got perfect amount of sleep!')
  } else if (actualSleepHours > idealSleepHours) {
    console.log(`You got ${actualSleepHours - idealSleepHours} hour(s) more sleep than you needed this week. tGet some res.`)
  } else {
    console.log(`You got ${idealSleepHours - actualSleepHours} hour(s) less sleep than you needed this week. Get some rest.`)
  }
};

calculateSleepDebt();
