Date.prototype.dayOfYear = function() {
  let d = new Date( this.getTime() );
  let dayCounter = 1;
  while ( d.getMonth() > 0)  || d.getDate() > 1 {
    d.setDate( d.getDate() -1 );
    dayCounter++;
  }
  return dayCounter;
};
